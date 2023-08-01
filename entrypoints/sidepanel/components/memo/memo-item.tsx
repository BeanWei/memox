import { format, isThisYear, isToday } from 'date-fns'
import { Component, Show, createSignal } from 'solid-js'
import { useElementHover } from 'solidjs-use'
import { Button } from '~/components/shared/button'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { Memo } from '~/service/db'
import IconEdit from '~icons/carbon/edit'
import IconOverflowMenu from '~icons/carbon/overflow-menu-vertical'
import { MemoEditor } from './memo-editor'

function timeFormat(ts: number): string {
  // Convert Unix timestamp to milliseconds
  const dateObj = new Date(ts * 1000)

  if (isToday(dateObj)) {
    // If the date is today, display as "Today HH:mm"
    return `Today ${format(dateObj, 'HH:mm')}`
  } else if (isThisYear(dateObj)) {
    // If the date is in the current year, display as "MM/dd HH:mm"
    return format(dateObj, 'MM/dd HH:mm')
  } else {
    // Otherwise, display as "MM/dd/yyyy HH:mm"
    return format(dateObj, 'MM/dd/yyyy HH:mm')
  }
}

export const MemoItem: Component<{ data: Memo }> = (props) => {
  const [el, setEl] = createSignal<HTMLElement>()
  const isHovered = useElementHover(el)

  const [editable, setEditable] = createSignal(false)

  return (
    <styled.div
      ref={setEl}
      rounded="md"
      borderWidth="1px"
      bg="card.default"
      color="card.foreground"
      shadow="xs"
      px="2"
      pt="0.5"
      pb="2"
    >
      <Show when={!editable()}>
        <Flex justify="space-between" align="center">
          <styled.span fontSize="xs" color="muted.foreground" py="2">
            Updated at {timeFormat(props.data.updated_at)}
          </styled.span>
          <Show when={isHovered()}>
            <Flex justify="end" align="center">
              <Button variant="ghost" size="xs" class={css({ px: '0' })}>
                <IconEdit class={css({ h: '1.2rem', w: '1.2rem' })} />
              </Button>
              <Button variant="ghost" size="xs" class={css({ px: '0' })}>
                <IconOverflowMenu class={css({ h: '1.2rem', w: '1.2rem' })} />
              </Button>
            </Flex>
          </Show>
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
