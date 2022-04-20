/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Expression, ExpressionType, UiOptions } from '../expression'
import { newHashId } from '../id'

export default class RootExpression extends Expression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Root
  parent: Expression | null = null

  constructor(public expression?: Expression) {
    super()
    if (this.expression) {
      this.expression.parent = this
    }
  }

  text(): string {
    return this.expression?.text() || ''
  }

  ui(options?: UiOptions) {
    return this.expression?.ui(options) || null
  }

  removeChild(child?: Expression): void {
    if (this.expression?.id === child?.id) {
      this.expression = undefined
    }
  }

  replaceChild(oldChild: Expression, newChild: Expression): void {
    if (this.expression?.id === oldChild.id) {
      this.expression = newChild
    }
  }
}
