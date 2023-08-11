import { Component } from 'solid-js'
import { styled } from '~/panda/jsx'
import { HTMLStyledProps } from '~/panda/types/jsx'

export const Skeleton: Component<HTMLStyledProps<'div'>> = (props) => (
  <styled.div rounded="md" bg="gray.300" opacity="0.2" animation="pulse" {...props} />
)
