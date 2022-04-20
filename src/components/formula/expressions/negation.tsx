/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Box, HStack, Text } from '@chakra-ui/react'
import { fontFamily2, fontSize2, fontWeight2 } from '../style'
import {
  Expression,
  ExpressionType,
  UiOptions,
  UnaryExpression,
} from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'

export default class NegationExpression extends UnaryExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Negation

  constructor(public parent: Expression | null, public expression: Expression) {
    super()
    this.expression.parent = this
  }

  text(): string {
    return `-${this.expression.text()}`
  }

  ui(options?: UiOptions) {
    return <NegationUi expression={this} options={options} />
  }

  replaceChild(oldChild: Expression, newChild: Expression): void {
    if (this.expression.id === oldChild.id) {
      this.expression = newChild
    }
  }
}

type NegationProps = {
  expression: NegationExpression
  options?: UiOptions
}

const NegationUi = ({ expression, options }: NegationProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <HStack>
        <Text
          fontFamily={fontFamily2}
          fontSize={fontSize2}
          fontWeight={fontWeight2}
        >
          −
        </Text>
        <Box>{expression.expression.ui(options)}</Box>
      </HStack>
    </Interaction>
  )
}
