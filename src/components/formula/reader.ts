/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Expression } from './expression'
import {
  AdditionExpression,
  DivisionExpression,
  EulerExpression,
  MultiplicationExpression,
  NegationExpression,
  ParenthesisExpression,
  PiExpression,
  PowerExpression,
  SubstractionExpression,
  VariableExpression,
  NumberExpression,
  FunctionExpression,
  RootExpression,
} from './expressions'

export interface Reader {
  read(value: any): Expression
}

export class AstReader implements Reader {
  public read(value: any): Expression {
    const root = new RootExpression()
    root.expression = this.readRecursive(value, root)
    return root
  }

  private readRecursive(value: any, parent?: Expression): Expression {
    const type = value.type
    if (type === 'ADDITION') {
      return new AdditionExpression(
        parent || null,
        this.readRecursive(value.left),
        this.readRecursive(value.right)
      )
    }
    if (type === 'SUBTRACTION') {
      return new SubstractionExpression(
        parent || null,
        this.readRecursive(value.left),
        this.readRecursive(value.right)
      )
    }
    if (type === 'MULTIPLICATION') {
      return new MultiplicationExpression(
        parent || null,
        this.readRecursive(value.left),
        this.readRecursive(value.right)
      )
    }
    if (type === 'DIVISION') {
      return new DivisionExpression(
        parent || null,
        this.readRecursive(value.left),
        this.readRecursive(value.right)
      )
    }
    if (type === 'POWER') {
      return new PowerExpression(
        parent || null,
        this.readRecursive(value.expression),
        this.readRecursive(value.power)
      )
    }
    if (type === 'NEGATION') {
      return new NegationExpression(
        parent || null,
        this.readRecursive(value.expression)
      )
    }
    if (type === 'PAREN') {
      return new ParenthesisExpression(
        parent || null,
        this.readRecursive(value.expression)
      )
    }
    if (type === 'NUMBER') {
      // eslint-disable-next-line
      return new NumberExpression(parent || null, value.value)
    }
    if (type === 'E') {
      return new EulerExpression(parent || null)
    }
    if (type === 'PI') {
      return new PiExpression(parent || null)
    }
    if (type === 'VARIABLE') {
      return new VariableExpression(parent || null, value.name)
    }
    if (type === 'FUNCTION') {
      return new FunctionExpression(
        parent || null,
        value.name,
        value.arguments.map((e: any) => this.readRecursive(e))
      )
    }
    throw new Error(`Unsupprted expression type: ${type}`)
  }
}
