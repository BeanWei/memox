import { Component, Show, createSignal, onCleanup, onMount } from 'solid-js'
import { Skeleton } from '~/components/shared/skeleton'
import { Flex, styled } from '~/panda/jsx'

export type InfiniteScrollProps = {
  intersect: (state: { loaded: () => void; complete: () => void }) => void
}

export const InfiniteScroll: Component<InfiniteScrollProps> = (props) => {
  const [el, setEl] = createSignal<HTMLElement>()
  const [isIntersecting, setIsIntersecting] = createSignal(false)
  const [isComplete, setIsComplete] = createSignal(false)

  let observer: IntersectionObserver

  onMount(() => {
    observer = new IntersectionObserver(([entry]) => {
      const e = el()
      if (entry && entry.isIntersecting && e) {
        setIsIntersecting(true)
        observer.unobserve(e)
        props.intersect({
          loaded() {
            setIsIntersecting(false)
            observer.observe(e)
          },
          complete() {
            observer?.disconnect()
            setIsIntersecting(false)
            setIsComplete(true)
          },
        })
      }
    })
    const e = el()
    e && observer.observe(e)
  })

  onCleanup(() => {
    observer?.disconnect()
  })

  return (
    <styled.div ref={setEl}>
      <Show when={isIntersecting()}>
        <Flex direction="column" gap="2" mt="3" mx="2">
          <Skeleton h="3" w="100%" />
          <Skeleton h="3" w="100%" />
          <Skeleton h="3" w="90%" />
          <Skeleton h="3" w="60%" />
        </Flex>
      </Show>
      <Show when={isComplete()}>
        <styled.div textAlign="center" color="muted.foreground" fontSize="xs">
          No more
        </styled.div>
      </Show>
    </styled.div>
  )
}
