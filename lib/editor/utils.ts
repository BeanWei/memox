import { JSONContent, generateText } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Typography from '@tiptap/extension-typography'

export function json2Text(content: JSONContent): string {
  return generateText(content, [Document, Paragraph, Text, Typography])
}
