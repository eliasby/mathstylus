/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Text } from '@chakra-ui/react'
import { fontFamily1, fontSize1, fontWeight1 } from '../style'
import {
  Expression,
  ExpressionType,
  UiOptions,
  ValueExpression,
} from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'

export default class NumberExpression extends ValueExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Number

  constructor(public parent: Expression | null, public readonly value: number) {
    super()
  }

  text(): string {
    return this.value.toString()
  }

  ui(options?: UiOptions) {
    return <NumberUi expression={this} options={options} />
  }
}

type NumberProps = {
  expression: NumberExpression
  options?: UiOptions
}

const NumberUi = ({ expression, options }: NumberProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <Text
        fontFamily={fontFamily1}
        fontSize={fontSize1}
        fontWeight={fontWeight1}
      >
        {expression.value}
      </Text>
    </Interaction>
  )
}
