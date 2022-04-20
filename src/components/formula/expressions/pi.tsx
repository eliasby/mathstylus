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

export default class PiExpression extends ValueExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Pi

  constructor(public parent: Expression | null) {
    super()
  }

  text(): string {
    return 'PI'
  }

  ui(options?: UiOptions) {
    return <PiUi expression={this} options={options} />
  }
}

type PiProps = {
  expression: PiExpression
  options?: UiOptions
}

const PiUi = ({ expression, options }: PiProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <Text
        fontFamily={fontFamily1}
        fontSize={fontSize1}
        fontWeight={fontWeight1}
      >
        π
      </Text>
    </Interaction>
  )
}
