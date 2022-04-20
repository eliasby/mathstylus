/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Box, HStack, Text } from '@chakra-ui/react'
import { fontFamily1, fontSize1, fontWeight1 } from '../style'
import {
  Expression,
  ExpressionType,
  UiOptions,
  UnaryExpression,
} from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'

export default class ParenthesisExpression extends UnaryExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Parenthesis

  constructor(public parent: Expression | null, public expression: Expression) {
    super()
    this.expression.parent = this
  }

  text(): string {
    return `(${this.expression.text()})`
  }

  ui(options?: UiOptions) {
    return <ParenthesisUi expression={this} options={options} />
  }

  replaceChild(oldChild: Expression, newChild: Expression): void {
    if (this.expression.id === oldChild.id) {
      this.expression = newChild
    }
  }
}

type ParenthesisProps = {
  expression: ParenthesisExpression
  options?: UiOptions
}

const ParenthesisUi = ({ expression, options }: ParenthesisProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <HStack spacing={0.5}>
        <Text
          fontFamily={fontFamily1}
          fontSize={fontSize1}
          fontWeight={fontWeight1}
        >
          (
        </Text>
        <Box>{expression.expression.ui(options)}</Box>
        <Text
          fontFamily={fontFamily1}
          fontSize={fontSize1}
          fontWeight={fontWeight1}
        >
          )
        </Text>
      </HStack>
    </Interaction>
  )
}
