import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskCardReducer from './taskCardSlice';

export const store = configureStore({
  reducer: {
    taskCard: taskCardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
