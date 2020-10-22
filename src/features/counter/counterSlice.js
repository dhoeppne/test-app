import { createSlice } from '@reduxjs/toolkit';
import {fetch} from "whatwg-fetch";

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    ipAddress: "",
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    updateIpAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, updateIpAddress } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const asyncRequest = amount => async dispatch => {
  const jsonRes = await (await fetch("http://ip.jsontest.com/")).json();
  return dispatch(updateIpAddress(jsonRes.ip));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;
export const selectIp = state => state.counter.ipAddress;

export default counterSlice.reducer;
