import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './slices/booksSlice/booksSlice';
import currentBookSlice from './slices/currentBookSlice/currentBookSlice';

const store = configureStore({
  reducer: {
    books: booksSlice,
    currentBook: currentBookSlice,
  },
});

export default store;