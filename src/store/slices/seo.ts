/**
 * @author: leroy
 * @date: 2021/8/23 16:09
 * @description：TDK
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SEOState = Partial<{
  title: string;
  keywords: string;
  description: string;
}>;

const initialState: SEOState = {
  title: "Leroy's Blog",
  keywords: 'Leroy,Blog',
  description:
    'Good morning, and in case I don’t see you, good afternoon, good evening, and good night...',
};

export const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Partial<SEOState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value) {
          if (key === 'title') state.title = `${value} | ${state.title}`;
          else state[key] = value;
        }
      });
    },
  },
});
export const { save: saveTDK } = seoSlice.actions;
export default seoSlice.reducer;
