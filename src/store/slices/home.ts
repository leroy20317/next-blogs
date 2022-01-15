/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：homeSlice
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchArticles } from '../services/common';
import type { AppState } from '@/store/store';
import { waitTime } from '@/utils/util';

export interface HomeState {
  list: API.Article.List | undefined;
  status: API.LoadingStatus;
}

const initialState: HomeState = {
  list: undefined,
  status: undefined,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    saveList: (state, action: PayloadAction<HomeState['list']>) => {
      state.list = action.payload;
    },
    saveStatus: (state, action: PayloadAction<HomeState['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { saveList, saveStatus } = homeSlice.actions;

export const getArticles = createAsyncThunk(
  'home/getArticles',
  async (_, { dispatch, getState }) => {
    const {
      home: { list },
    } = getState() as AppState;
    dispatch(saveStatus('loading'));
    try {
      // 判断请求第几页
      const page = list ? list.page + 1 : 1;
      const { body, status } = await fetchArticles({ page });
      if (status === 'success') {
        const data = {
          ...body,
          data: (list?.data || []).concat(body.data),
        };

        // 加载更多延时500ms
        if (page > 1) await waitTime(500);
        dispatch(saveList(data));
        dispatch(saveStatus(data.page >= data.totalPage ? 'nomore' : 'more'));
        return data;
      }
      return undefined;
    } catch (e) {
      console.log('home/getArticles', e);
      return e;
    }
  },
);

export default homeSlice.reducer;
