/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useEffect, useState } from 'react'
import { Center, VStack } from '@chakra-ui/react'
import { parse } from './parser/formula-parser'
import { AutoResizeTextarea } from './components/auto-resize-textarea'
import { Expression, AstReader } from './components/formula'
import { useAppDispatch, useAppSelector } from './store/hook'
import Viewer from './components/formula/viewer'
import { viewerDidOpen } from './store/ui/interaction'

function App() {
  const [formula, setFormula] = useState(
    '-($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a) + PI^E / FOO(BAR($x))'
  )
  const [rootExpression, setRootExpression] = useState<Expression | null>()
  const [activeExpression, setActiveExpression] = useState<Expression | null>()
  const [invalid, setInvalid] = useState(false)
  const viewerOpen = useAppSelector((state) => state.ui.interaction.viewerOpen)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!formula) {
      return
    }
    try {
      const expression = new AstReader().read(parse(formula))
      expression.onChange = () => {
        setFormula(expression.text())
      }
      expression.onActive = (e: Expression) => {
        setActiveExpression(e)
      }
      setRootExpression(expression)
      setInvalid(false)
    } catch (e) {
      setInvalid(true)
    }
  }, [formula])

  return (
    <>
      <Center h="100vh">
        <VStack w="750px" minH="200px" spacing="40px">
          <AutoResizeTextarea
            isInvalid={invalid}
            value={formula}
            size="md"
            variant="filled"
            resize="vertical"
            textAlign="center"
            minH="40px"
            fontFamily="'JetBrains Mono'"
            onChange={(event) => setFormula(event.target.value)}
          />
          <Center h="full">{rootExpression?.ui()}</Center>
        </VStack>
      </Center>
      {activeExpression && (
        <Viewer
          open={viewerOpen}
          expression={activeExpression}
          onClose={() => dispatch(viewerDidOpen(false))}
        />
      )}
    </>
  )
}

export default App
