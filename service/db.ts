import { Content } from '@tiptap/core'
import { AceBase } from 'acebase'
import type { DataSnapshot, QueryOperator } from 'acebase-core'
import { destr } from 'destr'
import { uid } from '~/utils/helper'
import { nowUnix } from '~/utils/time'

export class Memo {
  public id: string = uid()
  public created_at: number = nowUnix()
  public updated_at: number = nowUnix()
  public deleted_at: number = 0
  public pinned_at: number = 0
  public content: Content = null
  public tags: string[] = []
}

export type DBQuery = {
  page?: number
  limit?: number
  sorts?: (string | [key: string, ascending: boolean])[]
  filters?: [key: string | number, op: QueryOperator, compare?: any][]
}

export class DB {
  public aceBase: AceBase
  public table = {
    memos: 'memos',
  }

  constructor() {
    this.aceBase = AceBase.WithIndexedDB('memox')
    this.aceBase.types.bind(this.table.memos, Memo, {
      serializer: (_ref: any, data: Memo) => {
        data.content = JSON.stringify(data.content)
        return data
      },
      creator: (snap: DataSnapshot) => {
        const data = snap.val() as Memo
        data.content = destr(data.content)
        return data
      },
    })
  }

  getRef(...paths: string[]) {
    return this.aceBase.ref<Memo>(paths.join('/'))
  }

  async save(table: string, value: Memo) {
    if (value.id && value.updated_at) {
      value.updated_at = nowUnix()
    }
    return await this.getRef(table, value.id).set(value)
  }

  async remove(table: string, id: string) {
    return await this.getRef(table, id).remove()
  }

  async list(table: string, params?: DBQuery) {
    const q = this.aceBase.query(table)
    const limit = params?.limit || 20
    const offset = params?.page ? (params?.page - 1) * limit : 0
    params?.filters?.forEach((f) => q.filter(...f))
    params?.sorts?.forEach((s) => (Array.isArray(s) ? q.sort(...s) : q.sort(s)))
    return q.take(limit).skip(offset).get<Memo[]>()
  }
}

export const db = new DB()
