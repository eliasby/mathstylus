/*---------------------------------------------------------------------------------------------
 *  Copyright (c) (Elias) Anass Bouassaba. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InteractionState = {
  viewerOpen: boolean
}

const initialState: InteractionState = {
  viewerOpen: false,
}

const slice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    viewerDidOpen: (state, action: PayloadAction<boolean>) => {
      state.viewerOpen = action.payload
    },
  },
})

export const { viewerDidOpen } = slice.actions

export default slice.reducer
