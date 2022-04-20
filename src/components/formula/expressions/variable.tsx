/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Text } from '@chakra-ui/react'
import {
  Expression,
  ExpressionType,
  UiOptions,
  ValueExpression,
} from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'
import { fontFamily1, fontSize1, fontWeight1 } from '../style'

export default class VariableExpression extends ValueExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Variable

  constructor(public parent: Expression | null, public readonly name: string) {
    super()
  }

  text(): string {
    return this.name
  }

  ui(options?: UiOptions) {
    return <VariableUi expression={this} options={options} />
  }
}

type VariableProps = {
  expression: VariableExpression
  options?: UiOptions
}

const VariableUi = ({ expression, options }: VariableProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <Text
        fontFamily={fontFamily1}
        fontSize={fontSize1}
        fontWeight={fontWeight1}
      >
        {expression.name}
      </Text>
    </Interaction>
  )
}
