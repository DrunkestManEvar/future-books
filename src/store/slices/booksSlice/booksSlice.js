import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { current } from 'immer';
import axios from 'axios';
import { API_KEY } from 'data';

const initialState = {
  bookTitleQuery: '',
  books: [],
  booksFound: 0,
  newBooksBatchFound: 0,
  status: 'init',
  error: null,
};

const getBooks = async (query) => {
  try {
    const { bookTitleQuery, firstBookIndex, category, sortBy } = query;
    const subjectQuery = category !== 'all' ? `+subject:${category}` : '';
    
    const response = await axios.get(   
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitleQuery}${subjectQuery}&printType=books&startIndex=${firstBookIndex}&orderBy=${sortBy}&maxResults=30&key=${API_KEY}`
    );
    const booksResponse = await response.data.items;

    if (!booksResponse) {
      return { books: [], booksFound: 0, newBooksBatchFound: 0 };
    }

    const books = booksResponse.map(item => ({id: item.id, ...item.volumeInfo}));
    const booksFound = response.data.totalItems;
    return { books, booksFound, newBooksBatchFound: books.length };
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
      state.newBooksBatchFound = action.payload.newBooksBatchFound;
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
      state.newBooksBatchFound = action.payload.newBooksBatchFound;
      state.status = 'idle';
      state.error = null;
    },
    [fetchMoreBooks.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

export default booksSlice.reducer;