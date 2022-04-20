/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ReactNode, useState } from 'react'
import { Center } from '@chakra-ui/react'
import { Expression, UiOptions } from './expression'
import { useAppDispatch } from '../../store/hook'
import { viewerDidOpen } from '../../store/ui/interaction'

type InteractionProps = {
  expression: Expression
  options?: UiOptions
  children: ReactNode
}

const Interaction = ({ expression, options, children }: InteractionProps) => {
  const [active, setActive] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <Center
      bg={active ? 'green.100' : 'transparent'}
      cursor={options?.interactions === false ? 'default' : 'pointer'}
      onMouseOver={(event) => {
        if (options?.interactions !== false) {
          setActive(true)
        }
        event.stopPropagation()
      }}
      onMouseOut={(event) => {
        if (options?.interactions !== false) {
          setActive(false)
        }
        event.stopPropagation()
      }}
      onMouseLeave={(event) => {
        setActive(false)
        event.stopPropagation()
      }}
      onClick={(event) => {
        if (options?.interactions !== false) {
          expression.onActive(expression)
          dispatch(viewerDidOpen(true))
        }
        event.stopPropagation()
      }}
    >
      {children}
    </Center>
  )
}

export default Interaction
