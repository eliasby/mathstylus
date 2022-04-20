/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { v4 as uuidv4 } from 'uuid'
import hashids from 'hashids'

export function newHashId(): string {
  return new hashids(uuidv4()).encode(Date.now())
}

export function newHyphenlessUuid(): string {
  return uuidv4().replaceAll('-', '')
}
