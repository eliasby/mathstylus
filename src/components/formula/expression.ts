/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ReactNode } from 'react'
import { newHashId } from './id'

export enum ExpressionType {
  Root = 'root',
  Addition = 'addition',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division',
  Power = 'power',
  Negation = 'negation',
  Parenthesis = 'parenthesis',
  Number = 'number',
  Euler = 'euler',
  Pi = 'pi',
  Variable = 'variable',
  Function = 'function',
}

export type UiOptions = {
  interactions?: boolean
}

export abstract class Expression {
  id: string = newHashId()
  abstract type: ExpressionType
  abstract parent: Expression | null
  abstract text(): string
  abstract ui(options?: UiOptions): ReactNode
  abstract removeChild(expression: Expression): void
  abstract replaceChild(oldChild: Expression, newChild: Expression): void

  onChange: () => void = () => {
    this.parent?.onChange()
  }

  onActive: (expression: Expression) => void = (expression: Expression) => {
    this.parent?.onActive(expression)
  }

  removeSelf() {
    this.parent?.removeChild(this)
    this.onChange()
  }
}

export abstract class BinaryExpression extends Expression {
  abstract id: string
  abstract type: ExpressionType
  abstract left: Expression
  abstract right: Expression
  abstract text(): string
  abstract ui(): ReactNode

  removeChild(child?: Expression): void {
    if (this.parent && child) {
      let remaining
      if (this.left.id === child.id) {
        remaining = this.right
      } else if (this.right.id === child.id) {
        remaining = this.left
      } else {
        throw new Error(`Invalid argument child.id = ${child.id}`)
      }
      this.parent.replaceChild(this, remaining)
    }
  }

  replaceChild(oldChild: Expression, newChild: Expression): void {
    if (this.left.id === oldChild.id) {
      this.left = newChild
    } else if (this.right.id === oldChild.id) {
      this.right = newChild
    }
  }
}

export abstract class UnaryExpression extends Expression {
  abstract id: string
  abstract type: ExpressionType
  abstract text(): string
  abstract ui(): ReactNode
  abstract replaceChild(oldChild: Expression, newChild: Expression): void

  removeChild(_?: Expression): void {
    if (this.parent) {
      this.parent.removeChild(this)
    }
  }
}

export abstract class ValueExpression extends Expression {
  abstract id: string
  abstract type: ExpressionType
  abstract text(): string
  abstract ui(): ReactNode

  removeChild(_?: Expression): void {}
  replaceChild(_: Expression, __: Expression): void {}
}
