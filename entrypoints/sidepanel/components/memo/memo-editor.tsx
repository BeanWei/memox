import { Content, Extensions } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import Typography from '@tiptap/extension-typography'
import { SolidEditor, SolidEditorContent, useEditor } from '@vrite/tiptap-solid'
import { Component, Show, createEffect, createSignal, on } from 'solid-js'
import { Button } from '~/components/shared/button'
import { Spin } from '~/components/shared/spin'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { Memo, db } from '~/service/db'
import IconImage from '~icons/carbon/image'
import IconLink from '~icons/carbon/link'

type ExtensionOptions = {
  content?: Content
  extensions?: Extensions
  placeholder?: string
  lists?: boolean
  blocks?: boolean
  inline?: boolean
}

export type MemoEditorProps = {
  content?: Content
  editable?: boolean
  afterSave?: (editor: SolidEditor) => void
}

const getExtensions = (options: ExtensionOptions): Extensions => {
  const extensions: Extensions = [
    Document,
    Placeholder.configure({
      placeholder: ({ node, editor }) => {
        if (node.type.name === 'paragraph' && editor.state.doc.firstChild === node) {
          return options.placeholder || ''
        }
        return ''
      },
      emptyEditorClass: css({ color: 'muted.foreground' }),
    }),
    Paragraph,
    Text,
    ...(options.extensions || []),
  ]

  if (options.inline) {
    extensions.push(Typography)
  }

  return extensions
}

export const MemoEditor: Component<MemoEditorProps> = (props) => {
  const [isSaving, setIsSaving] = createSignal(false)

  const editor = useEditor({
    editable: props.editable,
    extensions: getExtensions({
      placeholder: 'Capture your thoughts...',
      inline: true,
      blocks: true,
      lists: true,
    }),
    editorProps: {
      attributes: { class: css({ outline: 'none', maxH: '30vh', overflow: 'overlay' }) },
    },
    content: props.content,
  })

  createEffect(
    on(
      () => props.editable,
      () => {
        if (editor().isDestroyed) {
          return
        }

        editor().setEditable(!!props.editable, false)
      },
    ),
  )

  const handleMemoSave = () => {
    setIsSaving(true)
    const val = new Memo()
    val.content = editor().getJSON()
    db.save(db.table.memos, val)
      .then(() => {
        props.afterSave?.(editor())
      })
      .finally(() => setIsSaving(false))
  }

  return (
    <>
      <styled.div
        minH="60px"
        w="full"
        bg="transparent"
        fontSize="sm"
        _focusVisible={{ ring: 'none', ringOffset: 'none', shadow: '1' }}
      >
        <SolidEditorContent editor={editor()} />
      </styled.div>
      <Show when={props.editable}>
        <Flex alignItems="center" mt="2" justify="space-between">
          <Flex gap="1">
            <Button variant="ghost" size="xs" px="0">
              <IconImage class={css({ h: '1.2rem', w: '1.2rem' })} />
            </Button>
            <Button variant="ghost" size="xs" px="0">
              <IconLink class={css({ h: '1.2rem', w: '1.2rem' })} />
            </Button>
          </Flex>
          <Button size="xs" onClick={handleMemoSave} disabled={isSaving()}>
            <Show when={isSaving()} fallback={<>Save</>}>
              <Spin mr="2" />
              Saving
            </Show>
          </Button>
        </Flex>
      </Show>
    </>
  )
}
