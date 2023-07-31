import { debounce } from '@solid-primitives/scheduled'
import { Editor as BaseEditor, Content, Extensions } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import Typography from '@tiptap/extension-typography'
import { SolidEditorContent, useEditor } from '@vrite/tiptap-solid'
import { Component, createEffect, on, splitProps } from 'solid-js'
import { css } from '~/panda/css'
import { HTMLStyledProps, styled } from '~/panda/jsx'

export type ExtensionOptions = {
  content?: string
  extensions?: Extensions
  placeholder?: string
  lists?: boolean
  blocks?: boolean
  inline?: boolean
}
export type EditorProps = Omit<HTMLStyledProps<'div'>, 'onBlur'> &
  ExtensionOptions & {
    initialValue?: Content
    readOnly?: boolean
    handleValueUpdates?: boolean
    onChange?(editor: BaseEditor): void
    onUpdate?(editor: BaseEditor): void
    onBlur?(editor: BaseEditor): void
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

export const Editor: Component<EditorProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'initialValue',
    'readOnly',
    'handleValueUpdates',
    'onChange',
    'onUpdate',
    'onBlur',
  ])

  const handleChange = debounce((editor: BaseEditor) => {
    local.onChange?.(editor)
  }, 350)

  const editor = useEditor({
    editable: !local.readOnly,
    extensions: getExtensions(props),
    editorProps: {
      attributes: { class: css({ outline: 'none', maxH: '30vh', overflow: 'overlay' }) },
    },
    content: local.initialValue,
    onUpdate({ editor }) {
      local.onUpdate?.(editor)
      handleChange.clear()
      handleChange(editor)
    },
    onBlur({ editor }) {
      local.onBlur?.(editor)
    },
  })

  if (local.handleValueUpdates !== false) {
    createEffect(
      on(
        () => local.initialValue,
        () => {
          if (editor().isDestroyed) {
            return
          }

          if (local.initialValue) {
            const { from, to } = editor().state.selection

            editor().commands.setContent(local.initialValue, false)
            editor().commands.setTextSelection({ from, to })
          } else {
            editor().commands.clearContent(false)
          }
        },
      ),
    )
  }

  createEffect(
    on(
      () => local.readOnly,
      () => {
        if (editor().isDestroyed) {
          return
        }

        editor().setEditable(!local.readOnly, false)
      },
    ),
  )

  return (
    <styled.div
      minH="60px"
      w="full"
      bg="transparent"
      fontSize="sm"
      _focusVisible={{ ring: 'none', ringOffset: 'none', shadow: '1' }}
      {...rest}
    >
      <SolidEditorContent editor={editor()} />
    </styled.div>
  )
}
