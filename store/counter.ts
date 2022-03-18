import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
	value: number
}

const initialState = { value: 0 } as CounterState

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment(state) {
			state.value++
		},
		decrement(state) {
			state.value--
		},
		incrementByAmount(state, action: PayloadAction<number>) {
			state.value += action.payload
		},
	},
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer