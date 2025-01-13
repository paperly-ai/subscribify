import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import documentsReducer from '@/features/documents/documentSlice';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
