import { Component, For, Show, createSignal } from 'solid-js'
import { InfiniteScroll, InfiniteScrollProps } from '~/components/fragment/infinite-scroll'
import { Skeleton } from '~/components/shared/skeleton'
import { useDbQuery } from '~/hooks/use-db-query'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { Memo, db } from '~/service/db'
import IconPenFountain from '~icons/carbon/pen-fountain'
import { MemoEditor } from '../components/memo/memo-editor'
import { MemoItem } from '../components/memo/memo-item'

const Home: Component = () => {
  const [hasMore, setHasMore] = createSignal(false)
  const [data, setData] = createSignal<Memo[]>([])
  const [page, setPage] = createSignal(1)
  const { isQuerying, isFinished, execute } = useDbQuery({
    query: () =>
      db.list(db.table.memos, {
        sorts: [['updated_at', false]],
        filters: [['deleted_at', '==', 0]],
        page: page(),
        limit: db.defaultLimit,
      }),
    onSuccess: (res: Memo[]) => {
      setHasMore(res.length >= db.defaultLimit)
      setData((data) => [...data, ...(res || [])])
    },
  })

  const handleIntersect: InfiniteScrollProps['intersect'] = (state) => {
    if (hasMore()) {
      setPage(page() + 1)
      execute().finally(() => state.loaded())
    } else {
      state.complete()
    }
  }

  return (
    <>
      <styled.div
        rounded="md"
        borderWidth="1px"
        bg="card.default"
        color="card.foreground"
        shadow="xs"
        p="2"
        mx="2"
      >
        <MemoEditor
          editable
          afterSave={(editor) => {
            editor.commands.clearContent()
            setData([])
            execute()
          }}
        />
      </styled.div>
      <Show when={isQuerying()}>
        <Flex direction="column" gap="2" mt="3" mx="2">
          <Skeleton h="3" w="100%" />
          <Skeleton h="3" w="100%" />
          <Skeleton h="3" w="90%" />
          <Skeleton h="3" w="60%" />
        </Flex>
      </Show>
      <Show when={data()?.length}>
        <Flex direction="column" gap="2" mt="3" px="2" h="calc(100vh - 190px)" overflow="overlay">
          <For each={data()}>{(item) => <MemoItem data={item} />}</For>
          <InfiniteScroll intersect={handleIntersect} />
        </Flex>
      </Show>
      <Show when={!data()?.length && isFinished()}>
        <styled.div mt="20vh" textAlign="center" mx="2">
          <IconPenFountain
            class={css({ m: 'auto', w: '50px', h: '50px', color: 'muted.foreground' })}
          />
          <styled.p color="muted.foreground" fontSize="sm" mt="2">
            Flash of genius? Make a note.
          </styled.p>
        </styled.div>
      </Show>
    </>
  )
}

export default Home
