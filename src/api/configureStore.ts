import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { catalogSlice } from './catalogSlice';
import { accountSlice } from './accountSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
