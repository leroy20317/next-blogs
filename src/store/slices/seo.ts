/*
 * @Author: leroy
 * @Date: 2024-11-06 10:02:02
 * @LastEditTime: 2025-02-05 11:37:37
 * @Description: SEO
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { NextSeoProps } from 'next-seo';

export type SEOState = Partial<{
  title: string;
  keywords: string;
  description: string;
  openGraph: Omit<
    Required<NextSeoProps>['openGraph'],
    'url' | 'siteName' | 'title' | 'description' | 'images' | 'videos' | 'audio'
  >;
}>;

const init = {
  title: "Leroy's Blogs",
  keywords: 'Leroy,Blog',
  description:
    'Good morning, and in case I don’t see you, good afternoon, good evening, and good night...',
};

const initialState: SEOState = {
  title: init.title,
  keywords: init.keywords,
  description: init.description,
  openGraph: undefined,
};

export const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<SEOState>) => {
      state.title = action.payload.title || init.title;
      state.keywords = action.payload.keywords || init.keywords;
      state.description = action.payload.description || init.description;
      // @ts-ignore
      state.openGraph = action.payload.openGraph || undefined;
    },
  },
});
export const { save: saveSEO } = seoSlice.actions;
export default seoSlice.reducer;
