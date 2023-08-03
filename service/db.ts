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
  public defaultLimit: number

  constructor() {
    this.aceBase = AceBase.WithIndexedDB('memox', {
      logLevel: 'warn',
    })
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
    this.defaultLimit = 20
  }

  getRef<T>(...paths: string[]) {
    return this.aceBase.ref<T>(paths.filter((p) => p.trim().length > 0).join('/'))
  }

  async save<T>(table: string, value: any) {
    if (value.id && value.updated_at) {
      value.updated_at = nowUnix()
    }
    return await this.getRef<T>(table, value.id).set(value)
  }

  async remove<T>(table: string, id: string) {
    return await this.getRef<T>(table, id).remove()
  }

  async list<T>(table: string, params?: DBQuery) {
    const q = this.aceBase.query(table)
    const limit = params?.limit || this.defaultLimit
    const offset = params?.page ? (params?.page - 1) * limit : 0
    params?.filters?.forEach((f) => q.filter(...f))
    params?.sorts?.forEach((s) => (Array.isArray(s) ? q.sort(...s) : q.sort(s)))
    const res = await q.take(limit).skip(offset).get<T[]>()
    return res.getValues()
  }
}

export const db = new DB()
