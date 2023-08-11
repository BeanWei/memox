import { Component } from 'solid-js'
import { styled } from '~/panda/jsx'
import { HTMLStyledProps } from '~/panda/types/jsx'

export const Textarea: Component<HTMLStyledProps<'textarea'>> = (props) => (
  <styled.textarea
    display="flex"
    minH="60px"
    w="full"
    rounded="md"
    borderWidth="1px"
    borderColor="input"
    bg="transparent"
    px="3"
    py="2"
    fontSize="sm"
    shadow="sm"
    _focusVisible={{ ring: 'none', ringOffset: 'none', shadow: '1' }}
    _disabled={{ cursor: 'not-allowed', opacity: '0.5' }}
    {...props}
   />
)
