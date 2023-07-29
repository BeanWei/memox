import { A, LinkProps } from '@solidjs/router'
import { Component, JSX, splitProps } from 'solid-js'
import { cx } from '~/panda/css'
import { styled } from '~/panda/jsx'
import { button, type ButtonVariantProps } from '~/panda/recipes'

export type ButtonProps = ButtonVariantProps & {
  href?: LinkProps['href']
} & JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'variant', 'size', 'href', 'children'])

  if (local.href) {
    return (
      <A href={local.href}>
        <styled.a
          {...rest}
          class={cx(button({ variant: local.variant, size: local.size }), local.class)}
          data-scope="button"
          data-part="root"
        >
          {local.children}
        </styled.a>
      </A>
    )
  }

  return (
    <styled.button
      {...rest}
      class={cx(button({ variant: local.variant, size: local.size }), local.class)}
      data-scope="button"
      data-part="root"
    >
      {local.children}
    </styled.button>
  )
}
