/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { HStack, Box, Text } from '@chakra-ui/react'
import { Expression, ExpressionType, UiOptions } from '../expression'
import { newHashId } from '../id'
import Interaction from '../interaction'
import { fontFamily1, fontSize1, fontWeight1 } from '../style'

export default class FunctionExpression extends Expression {
  public readonly id: string = newHashId()
  public readonly type: ExpressionType = ExpressionType.Function

  constructor(
    public parent: Expression | null,
    public readonly name: string,
    public args: Expression[]
  ) {
    super()
    this.args.forEach((a) => (a.parent = this))
  }

  text(): string {
    return `${this.name}(${this.args.map((e) => e.text()).join(', ')})`
  }

  ui(options?: UiOptions) {
    return <FunctionUi expression={this} options={options} />
  }

  removeChild(child?: Expression): void {
    if (child) {
      this.args = this.args.filter((a) => a.id !== child?.id)
    }
  }

  replaceChild(oldChild: Expression, newChild: Expression): void {
    const index = this.args.findIndex((a) => a.id === oldChild.id)
    if (index !== -1) {
      this.args[index] = newChild
    }
  }
}

type FunctionProps = {
  expression: FunctionExpression
  options?: UiOptions
}

const FunctionUi = ({ expression, options }: FunctionProps) => {
  if (expression.name === 'SQRT') {
    return (
      <Interaction expression={expression} options={options}>
        <HStack spacing={0}>
          <Box w="19px">
            <Text
              fontFamily={fontFamily1}
              fontSize="31px"
              fontWeight={fontWeight1}
            >
              &radic;
            </Text>
          </Box>
          <HStack borderTop="1px solid black">
            {expression.args.map((e, index) => (
              <Box key={index}>
                <>{e.ui(options)}</>
                {index !== expression.args.length - 1 && <Text>,</Text>}
              </Box>
            ))}
          </HStack>
        </HStack>
      </Interaction>
    )
  } else {
    return (
      <Interaction expression={expression} options={options}>
        <HStack spacing={0.5}>
          <Text
            fontFamily={fontFamily1}
            fontSize={fontSize1}
            fontWeight={fontWeight1}
          >
            {expression.name.toLowerCase()}
          </Text>
          <Text
            fontFamily={fontFamily1}
            fontSize={fontSize1}
            fontWeight={fontWeight1}
          >
            (
          </Text>
          <HStack>
            {expression.args.map((e, index) => (
              <Box key={index}>
                <>{e.ui(options)}</>
                {index !== expression.args.length - 1 && <Text>,</Text>}
              </Box>
            ))}
          </HStack>
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
}
