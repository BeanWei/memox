import { Popover, PopoverContent, PopoverPositioner, PopoverTrigger } from '@ark-ui/solid'
import { usePopoverContext } from '@ark-ui/solid/popover'
import uFuzzy from '@leeoniya/ufuzzy'
import { Component, For, JSX, Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { input } from '~/panda/recipes/input'
import { popover } from '~/panda/recipes/popover'
import { Tag, db } from '~/service/db'
import IconAdd from '~icons/carbon/add'

const uf = new uFuzzy({})

export type TagPopoverProps = {
  children: JSX.Element
  onSelect?: (value: string) => void
}

export const TagPopover: Component<TagPopoverProps> = (props) => {
  const [tags, setTags] = createSignal<string[]>([])
  const [tagName, setTagName] = createSignal('')
  const [searchTags, setSearchTags] = createSignal<string[]>([])

  const initTags = () => {
    db.all<Tag>(db.table.tags, {
      sorts: [
        ['count', false],
        ['updated_at', false],
      ],
    }).then((s) => {
      const ts = s.map((t) => t.name)
      setTags(ts)
      setSearchTags(ts)
    })
  }

  const handleSearchTags = (s: string) => {
    if (s) {
      const indexes = uf.search(tags(), s)[0]
      setSearchTags(indexes ? indexes.map((idx) => tags()[idx]) : [])
    } else {
      setSearchTags(tags())
    }
  }

  const handleCreateTag = (name: string) => {
    const tag = new Tag()
    tag.name = name
    db.save<Tag>(db.table.tags, tag).then(() => props.onSelect?.(name))
  }

  const Content = () => {
    const api = usePopoverContext()
    return (
      <PopoverContent class={css({ p: '1' })}>
        <styled.div borderBottomWidth="1px" borderBottomColor="border">
          <styled.input
            class={input()}
            shadow="none"
            border="none"
            placeholder="Enter tag name..."
            value={tagName()}
            onInput={(e) => {
              const s = e.target.value.trim()
              setTagName(s)
              handleSearchTags(s)
            }}
          />
        </styled.div>
        <Show
          when={!tagName() || searchTags().length > 0}
          fallback={
            <styled.div
              w="full"
              bg="accent.default"
              color="accent.foreground"
              p="2"
              display="inline-flex"
              alignItems="center"
              cursor="pointer"
              fontSize="sm"
              onClick={() => {
                handleCreateTag(tagName())
                api().close()
              }}
            >
              <IconAdd />
              Create tag {tagName()}
            </styled.div>
          }
        >
          <Flex direction="column" mt="1">
            <For each={searchTags()}>
              {(item) => (
                <styled.div
                  cursor="default"
                  userSelect="none"
                  rounded="sm"
                  px="2"
                  py="1.5"
                  fontSize="sm"
                  outline="none"
                  transition="colors"
                  _focus={{
                    bg: 'accent.default',
                    color: 'accent.foreground',
                  }}
                  _hover={{
                    bg: 'accent.default',
                    color: 'accent.foreground',
                  }}
                  _disabled={{
                    pointerEvents: 'none',
                    opacity: '50',
                  }}
                  onClick={() => {
                    props.onSelect?.(item)
                    api().close()
                  }}
                >
                  {item}
                </styled.div>
              )}
            </For>
          </Flex>
        </Show>
      </PopoverContent>
    )
  }

  return (
    <Popover
      positioning={{ placement: 'bottom-end' }}
      onOpen={initTags}
      onClose={() => setTagName('')}
    >
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <Portal>
        <PopoverPositioner class={popover()}>
          <Content />
        </PopoverPositioner>
      </Portal>
    </Popover>
  )
}
