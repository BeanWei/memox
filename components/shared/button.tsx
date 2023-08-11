import { A, LinkProps } from '@solidjs/router'
import { Component, Show, splitProps } from 'solid-js'
import { cx } from '~/panda/css'
import { HTMLStyledProps, styled } from '~/panda/jsx'
import { button, type ButtonVariantProps } from '~/panda/recipes'

export type ButtonProps = ButtonVariantProps & {
  href?: LinkProps['href']
} & HTMLStyledProps<'button'> &
  HTMLStyledProps<'a'>

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'variant', 'size', 'href', 'children'])

  return (
    <Show
      when={local.href}
      fallback={
        <styled.button
          {...rest}
          class={cx(button({ variant: local.variant, size: local.size }), local.class)}
          data-scope="button"
          data-part="root"
        >
          {local.children}
        </styled.button>
      }
    >
      <A href={local.href!}>
        <styled.a
          {...rest}
          class={cx(button({ variant: local.variant, size: local.size }), local.class)}
          data-scope="button"
          data-part="root"
        >
          {local.children}
        </styled.a>
      </A>
    </Show>
  )
}
