/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：commonSlice
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInfo } from '../services/common';

export interface CommonState {
  info: API.Info | undefined;
}

const initialState: CommonState = {
  info: undefined,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<API.Info>) => {
      state.info = action.payload;
    },
  },
});

export const { saveInfo } = commonSlice.actions;

export const getInfo = createAsyncThunk<API.Info | undefined>(
  'common/info',
  async (_, { dispatch }) => {
    try {
      const { body, status } = await fetchInfo();
      if (status === 'success') {
        dispatch(saveInfo(body));
        return body;
      }
      return undefined;
    } catch (e) {
      console.log('common/info', e);
      // return e;
      return undefined;
    }
  },
);

export default commonSlice.reducer;
