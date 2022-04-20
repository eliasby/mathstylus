/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Box, HStack, Text } from '@chakra-ui/react'
import { fontFamily2, fontSize2, fontWeight2 } from '../style'
import { Expression, ExpressionType, UiOptions } from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'

export default class PowerExpression extends Expression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Power

  constructor(
    public parent: Expression | null,
    public expression: Expression,
    public power: Expression
  ) {
    super()
    this.expression.parent = this
    this.power.parent = this
  }

  text(): string {
    return `${this.expression.text()}^${this.power.text()}`
  }

  ui(options?: UiOptions) {
    return <PowerUi expression={this} options={options} />
  }

  removeChild(child?: Expression): void {
    if (this.parent && child) {
      if (this.expression.id === child.id) {
        this.parent.removeChild(this)
      } else if (this.power.id === child.id) {
        this.parent.replaceChild(this, this.expression)
      } else {
        throw new Error(`Invalid argument child.id = ${child.id}`)
      }
    }
  }

  replaceChild(oldChild: Expression, newChild: Expression): void {
    if (this.expression.id === oldChild.id) {
      this.expression = newChild
    } else if (this.power.id === oldChild.id) {
      this.power = newChild
    }
  }
}

type PowerProps = {
  expression: PowerExpression
  options?: UiOptions
}

const PowerUi = ({ expression, options }: PowerProps) => {
  return (
    <Interaction expression={expression} options={options}>
      <HStack>
        <Box>{expression.expression.ui(options)}</Box>
        <Text
          fontFamily={fontFamily2}
          fontSize={fontSize2}
          fontWeight={fontWeight2}
        >
          ^
        </Text>
        <Box>{expression.power.ui(options)}</Box>
      </HStack>
    </Interaction>
  )
}
