import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from 'data';

const initialState = {
  book: {
    title: '',
    authors: [],
    categories: [],
    description: '',
    cover: {
      small: null,
      medium: null
    }
  },
  loading: true,
  error: false,
};

export const fetchCurrentBook = createAsyncThunk(
  'currentBookSlice/fetchCurrentBook',
  async query => {
    try {
      const {bookId} = query;

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`);

      const bookResponse = await response.data.volumeInfo;

      const {
        title, 
        authors,
        categories,
        description,
        imageLinks,
        } = bookResponse;

      const book = {
        title, 
        authors,
        categories,
        description,
        cover: {
          extraLarge: imageLinks?.extraLarge,
          large: imageLinks?.large,
          medium: imageLinks?.medium,
          small: imageLinks?.small,
          thumbnail: imageLinks?.thumbnail,
          smallThumbnail: imageLinks?.smallThumbnail,
        }
      }

      return book;
    } catch (error) {
      console.error(error);
    }
  }
);

const currentBookSlice = createSlice({
  name: 'currentBook',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrentBook.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchCurrentBook.fulfilled]: (state, action) => {
      state.book = action.payload;
      state.loading = false;
      state.error = false;
    },
    [fetchCurrentBook.rejected]: (state, action) => {
      state.book = null;
      state.loading = false;
      state.error = true;
    },
  },
});

export default currentBookSlice.reducer;