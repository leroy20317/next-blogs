/**
 * @author: leroy
 * @date: 2021/8/23 16:09
 * @description：store
 */
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import loadingReducer from './slices/loading';
import seoReducer from './slices/seo';
import headerReducer from './slices/header';
import homeReducer from './slices/home';
import commonReducer from './slices/common';

const combinedReducer = combineReducers({
  loading: loadingReducer,
  seo: seoReducer,
  header: headerReducer,
  home: homeReducer,
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
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
