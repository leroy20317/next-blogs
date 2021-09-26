/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：commonSlice
 */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInfo } from '../services/common';

export interface CommonState {
  info: API.Info | Record<string, unknown>;
}

const initialState: CommonState = {
  info: {},
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<CommonState['info']>) => {
      state.info = action.payload;
    },
  },
});

export const { saveInfo } = commonSlice.actions;

export const getInfo = createAsyncThunk('common/info', async (_, { dispatch }) => {
  try {
    const { body, status } = await fetchInfo();
    if (status === 'success') {
      dispatch(saveInfo(body));
      return body;
    }
    return undefined;
  } catch (e) {
    console.log('common/info', e);
    return e;
  }
});

export default commonSlice.reducer;
