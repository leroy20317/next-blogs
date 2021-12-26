/**
 * @author: leroy
 * @date: 2021-12-12 17:41
 * @description：header
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface HeaderState {
  title?: string;
  music?: string;
  likeId?: string;
  sticky: boolean;
  autoPlayMusic: boolean;
}

const initialState: HeaderState = {
  // 吸顶动画
  sticky: false,
  // 自动播放音乐
  autoPlayMusic: false,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<HeaderState>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export default headerSlice.reducer;
