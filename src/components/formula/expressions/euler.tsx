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

export default class EulerExpression extends ValueExpression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Euler

  constructor(public parent: Expression | null) {
    super()
  }

  text(): string {
    return 'E'
  }

  ui(options?: UiOptions) {
    return <EulerUi expression={this} options={options} />
  }
}

type EulerProps = {
  expression: EulerExpression
  options?: UiOptions
}

const EulerUi = ({ expression, options }: EulerProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <Text
        fontFamily={fontFamily1}
        fontSize={fontSize1}
        fontWeight={fontWeight1}
      >
        e
      </Text>
    </Interaction>
  )
}
