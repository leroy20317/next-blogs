/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：commonSlice
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAbout, fetchInfo } from '../services/common';

export interface CommonState {
  info: API.Info | undefined;
  about: API.About | undefined;
}

const initialState: CommonState = {
  info: undefined,
  about: undefined,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<API.Info>) => {
      state.info = action.payload;
    },
    saveAbout: (state, action: PayloadAction<API.About>) => {
      state.about = action.payload;
    },
  },
});

export const { saveInfo, saveAbout } = commonSlice.actions;

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
export const getAbout = createAsyncThunk<API.About | undefined>(
  'common/about',
  async (_, { dispatch }) => {
    try {
      const { body, status } = await fetchAbout();
      if (status === 'success') {
        dispatch(saveAbout(body));
        return body;
      }
      return undefined;
    } catch (e) {
      console.log('common/about', e);
      // return e;
      return undefined;
    }
  },
);

export default commonSlice.reducer;
