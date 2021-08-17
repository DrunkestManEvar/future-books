import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { current } from 'immer';
import axios from 'axios';
import { API_KEY } from 'data';

const initialState = {
  bookTitleQuery: '',
  books: [],
  booksFound: 0,
  status: 'init',
  error: null,
};

const getBooks = async (query) => {
  try {
    const { bookTitleQuery, firstBookIndex } = query;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitleQuery}&printType=books&startIndex=${firstBookIndex}&maxResults=30&key=${API_KEY}`
    );

    const books = await response.data.items.map(item => ({id: item.id, ...item.volumeInfo}));
    const booksFound = response.data.totalItems;
    return {books, booksFound};
  } catch (error) {
    return error;
  }
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  (query) => getBooks(query)
);

export const fetchMoreBooks = createAsyncThunk(
  'books/fetchMoreBooks',
  (query) => getBooks(query)
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = 'loadingFull';
      state.error = null;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.books = action.payload.books;
      state.booksFound = action.payload.booksFound;
      state.status = 'idle';
      state.error = null;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.error = action.error;
    },
    [fetchMoreBooks.pending]: (state, action) => {
      state.status = 'loadingPartial';
      state.error = null;
    },
    [fetchMoreBooks.fulfilled]: (state, action) => {
      state.books = [...current(state.books), ...action.payload.books];
      state.status = 'idle';
      state.error = null;
    },
    [fetchMoreBooks.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export default booksSlice.reducer;