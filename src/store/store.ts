/*
 * @Author: leroy
 * @Date: 2021-12-26 16:46:27
 * @LastEditTime: 2025-02-05 11:00:52
 * @Description: store
 */
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import loadingReducer from './slices/loading';
import seoReducer from './slices/seo';
import headerReducer from './slices/header';
import homeReducer from './slices/home';
import articleReducer from './slices/article';
import envelopeReducer from './slices/envelope';
import commonReducer from './slices/common';

const combinedReducer = combineReducers({
  loading: loadingReducer,
  seo: seoReducer,
  header: headerReducer,
  home: homeReducer,
  article: articleReducer,
  envelope: envelopeReducer,
  common: commonReducer,
});
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return combinedReducer(nextState, action);
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: AppState) => TSelected) => {
  return useSelector(selector, shallowEqual);
};

export const wrapper = createWrapper<AppStore>(makeStore);
