/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Box, HStack, Text } from '@chakra-ui/react'
import { fontFamily2, fontSize2, fontWeight2 } from '../style'
import {
  BinaryExpression,
  Expression,
  ExpressionType,
  UiOptions,
} from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'

export default class AdditionExpression extends BinaryExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Addition

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
    return `${this.left.text()} + ${this.right.text()}`
  }

  ui(options?: UiOptions) {
    return <AdditionUi expression={this} options={options} />
  }
}

type AdditionProps = {
  expression: AdditionExpression
  options?: UiOptions
}

const AdditionUi = ({ expression, options }: AdditionProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <HStack>
        <Box>{expression.left.ui(options)}</Box>
        <Text
          fontFamily={fontFamily2}
          fontSize={fontSize2}
          fontWeight={fontWeight2}
        >
          +
        </Text>
        <Box>{expression.right.ui(options)}</Box>
      </HStack>
    </Interaction>
  )
}
