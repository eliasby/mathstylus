/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Box, VStack } from '@chakra-ui/react'
import {
  BinaryExpression,
  Expression,
  ExpressionType,
  UiOptions,
} from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'

export default class DivisionExpression extends BinaryExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Division

  constructor(
    public parent: Expression | null,
    public readonly left: Expression,
    public readonly right: Expression
  ) {
    super()
    this.left.parent = this
    this.right.parent = this
  }

  text(): string {
    return `${this.left.text()} / ${this.right.text()}`
  }

  ui(options?: UiOptions) {
    return <DivisionUi expression={this} options={options} />
  }
}

type DivisionProps = {
  expression: DivisionExpression
  options?: UiOptions
}

const DivisionUi = ({ expression, options }: DivisionProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <VStack>
        <Box>{expression.left.ui(options)}</Box>
        <Box w="full" h="1px" bg="black"></Box>
        <Box>{expression.right.ui(options)}</Box>
      </VStack>
    </Interaction>
  )
}
