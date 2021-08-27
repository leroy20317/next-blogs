/**
 * @author: leroy
 * @date: 2021/8/23 16:09
 * @description：store.err
 */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import _ from 'lodash';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';

const combinedReducer = combineReducers({
  loading: loadingReducer,
  counter: counterReducer,
  user: userReducer,
});

let store;
let initStore;

function assign(srcValue) {
  const state = {};
  Object.keys(srcValue).forEach((key) => {
    const item = initStore[key];
    Object.keys(srcValue[key]).forEach((valKey) => {
      if (!_.isEqual(srcValue[key][valKey], initStore[key][valKey])) {
        item[valKey] = srcValue[key][valKey];
      }
    });
    state[key] = item;
  });
  return state;
}

// TODO: 路由切换时 getServerSideProps 会触发 HYDRATE 此时store中数据并不是最新的redux里的 而是上次触发 HYDRATE 时的数据

const reducer = (state, action) => {
  // eslint-disable-next-line no-underscore-dangle
  let _store;
  if (action.type === HYDRATE) {
    if (!store) store = state;
    if (!initStore) initStore = combinedReducer(undefined, action);
    const newStore = assign(action.payload);
    // const nextState = _.merge(state, action.payload)
    console.log('HYDRATE', {
      state,
      payload: action.payload,
      store,
      newStore,
    });
    _store = newStore;
  } else {
    _store = combinedReducer(state, action);
  }
  store = _store;
  return _store;
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

export default createWrapper<AppStore>(makeStore);
