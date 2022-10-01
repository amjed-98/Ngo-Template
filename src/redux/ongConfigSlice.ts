import { createSlice, type PayloadAction, type Slice } from '@reduxjs/toolkit'
import type{ IAppState } from '../types/interfaces'

const initialState: IAppState = {
  ongConfig: {},
  ongId: '',
}

export const ongConfigSlice: Slice<IAppState> = createSlice({
  name: 'ongConfig',
  initialState,
  reducers: {
    setOngConfig: (state: IAppState, action: PayloadAction<TAllPlatformConfig>) => {
      state.ongConfig = action.payload
    },
    setOngId: (state: IAppState, action: PayloadAction<string>) => {
      state.ongId = action.payload
    },
  },
})

export const { setOngConfig, setOngId } = ongConfigSlice.actions
export default ongConfigSlice.reducer
