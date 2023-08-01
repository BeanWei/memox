import { Component, Show, createSignal } from 'solid-js'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { Memo } from '~/service/db'
import IconEdit from '~icons/carbon/pen'
import { MemoEditor } from './memo-editor'

export const MemoItem: Component<{ data: Memo }> = (props) => {
  const [editable, setEditable] = createSignal(false)

  return (
    <styled.div
      rounded="md"
      borderWidth="1px"
      bg="card.default"
      color="card.foreground"
      shadow="xs"
      p="2"
    >
      <Show when={!editable()}>
        <Flex justify="space-between" align="center">
          <styled.span fontSize="xs" color="muted.foreground">
            Updated at 07-27 21:51
          </styled.span>
          <Flex justify="end" align="center">
            <Button variant="ghost" size="sm" class={css({ w: '9', px: '0' })}>
              <IconEdit class={css({ h: '1.2rem', w: '1.2rem' })} />
            </Button>
          </Flex>
        </Flex>
      </Show>
      <MemoEditor
        editable={editable()}
        content={props.data.content}
        afterSave={() => setEditable(false)}
      />
    </styled.div>
  )
}
