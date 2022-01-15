/**
 * @author: leroy
 * @date: 2021/9/26 15:01
 * @description：envelopeSlice
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEnvelopes } from '../services/common';
import type { AppState } from '@/store/store';
import { waitTime } from '@/utils/util';

export interface EnvelopeState {
  list: API.Envelope.List | undefined;
  status: API.LoadingStatus;
}

const initialState: EnvelopeState = {
  list: undefined,
  status: undefined,
};

export const envelopeSlice = createSlice({
  name: 'envelope',
  initialState,
  reducers: {
    saveList: (state, action: PayloadAction<EnvelopeState['list']>) => {
      state.list = action.payload;
    },
    saveStatus: (state, action: PayloadAction<EnvelopeState['status']>) => {
      state.status = action.payload;
    },
  },
});

export const { saveList, saveStatus } = envelopeSlice.actions;

export const getEnvelopes = createAsyncThunk<API.Envelope.List | undefined>(
  'envelope/getEnvelopes',
  async (_, { dispatch, getState }) => {
    const {
      envelope: { list },
    } = getState() as AppState;
    dispatch(saveStatus('loading'));
    try {
      // 判断请求第几页
      const page = list ? list.page + 1 : 1;
      const { body, status } = await fetchEnvelopes({ page });
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
      console.log('envelope/getEnvelopes', e);
      return undefined;
    }
  },
);

export default envelopeSlice.reducer;
