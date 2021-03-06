/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：articleSlice
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMoodDetail, fetchMoods } from '../services/common';
import type { AppState } from '@/store/store';
import { waitTime } from '@/utils/util';

export interface ArticleState {
  list: API.Article.Mood | undefined;
  status: API.LoadingStatus;
  detail: API.Article.Detail | undefined;
}

const initialState: ArticleState = {
  list: undefined,
  status: undefined,
  detail: undefined,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    saveList: (state, action: PayloadAction<ArticleState['list']>) => {
      state.list = action.payload;
    },
    saveStatus: (state, action: PayloadAction<ArticleState['status']>) => {
      state.status = action.payload;
    },
    saveDetail: (state, action: PayloadAction<ArticleState['detail']>) => {
      state.detail = action.payload;
    },
  },
});

export const { saveList, saveStatus, saveDetail } = articleSlice.actions;

export const getArticles = createAsyncThunk<API.Article.Mood | undefined>(
  'article/getArticles',
  async (_, { dispatch, getState }) => {
    const {
      article: { list },
    } = getState() as AppState;
    dispatch(saveStatus('loading'));
    try {
      // 判断请求第几页
      const page = list ? list.page + 1 : 1;
      const { body, status } = await fetchMoods({ page, mood: 1 });
      if (status === 'success') {
        let result = list;
        if (page > 1) {
          // 加载更多延时500ms
          await waitTime(500);
          Object.entries(body.data).forEach(([year, value]) => {
            // 年份合并
            if (result?.data[year]) {
              const yearData = result.data[year];
              Object.entries(result.data[year]).forEach(([month, moods]) => {
                // 月份合并
                yearData[month] = yearData[month] ? yearData[month].concat(moods) : moods;
              });
            } else {
              result![year] = value;
            }
          });
        } else {
          result = body;
        }

        dispatch(saveList(result));
        dispatch(saveStatus(result && result.page >= result.totalPage ? 'nomore' : 'more'));
        return result;
      }
      return undefined;
    } catch (e) {
      console.log('article/getArticles', e);
      return undefined;
    }
  },
);

export const getDetail = createAsyncThunk<API.Article.Detail | undefined, { id: string }>(
  'article/getDetail',
  async (params, { dispatch }) => {
    try {
      const { body, status } = await fetchMoodDetail(params);
      if (status === 'success') {
        dispatch(saveDetail(body));
        return body;
      }
      return undefined;
    } catch (e) {
      console.log('article/getDetail', e);
      return undefined;
    }
  },
);

export default articleSlice.reducer;
