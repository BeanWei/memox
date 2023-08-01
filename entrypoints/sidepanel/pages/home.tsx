import { Component, For, Show } from 'solid-js'
import { Skeleton } from '~/components/shared/skeleton'
import { useDbQuery } from '~/hooks/use-db-query'
import { css } from '~/panda/css'
import { Flex, styled } from '~/panda/jsx'
import { db } from '~/service/db'
import IconPenFountain from '~icons/carbon/pen-fountain'
import { MemoEditor } from '../components/memo/memo-editor'
import { MemoItem } from '../components/memo/memo-item'

const Home: Component = () => {
  const { isQuerying, isFinished, result, execute } = useDbQuery({
    query: () =>
      db.list(db.table.memos, {
        sorts: [['updated_at', false]],
        filters: [['deleted_at', '==', 0]],
      }),
  })

  return (
    <>
      <styled.div
        rounded="md"
        borderWidth="1px"
        bg="card.default"
        color="card.foreground"
        shadow="xs"
        p="2"
      >
        <MemoEditor
          editable
          afterSave={(editor) => {
            editor.commands.clearContent()
            execute()
          }}
        />
      </styled.div>
      <Show when={isQuerying()}>
        <Flex direction="column" gap="2" mt="3">
          <Skeleton h="3" w="100%" />
          <Skeleton h="3" w="100%" />
          <Skeleton h="3" w="90%" />
          <Skeleton h="3" w="60%" />
        </Flex>
      </Show>
      <Show when={result()?.length && isFinished()}>
        <Flex direction="column" gap="2" mt="3">
          <For each={result()}>{(item) => <MemoItem data={item} />}</For>
        </Flex>
      </Show>
      <Show when={!result()?.length && isFinished()}>
        <styled.div mt="20vh" textAlign="center">
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
