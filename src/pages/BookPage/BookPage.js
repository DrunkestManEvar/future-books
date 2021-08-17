import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentBook } from 'store/slices/currentBookSlice/currentBookSlice';
import Spinner from 'components/general/Spinner/Spinner';
import BookCoverPlaceholder from 'components/general/BookCoverPlaceholder/BookCoverPlaceholder';
import ErrorPage from 'pages/ErrorPage/ErrorPage';

const BookPage = props => {
  const {bookId} = props.match.params;
  const book = useSelector(state => state.currentBook.book);
  const bookLoading = useSelector(state => state.currentBook.loading);
  const bookError = useSelector(state => state.currentBook.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const book = { bookId };
    dispatch(fetchCurrentBook(book));
  }, [bookId, dispatch]);

  if (bookLoading) return <Spinner />;
  if (bookError) return <ErrorPage />;

  const bookCoverSrc = book.cover.thumbnail || book.cover.smallThumbnail;
  const bookCover = bookCoverSrc ? <img src={bookCoverSrc} alt={`${book.title} cover`} /> : <BookCoverPlaceholder />

  return (
    <>
      <article className="page page--book">
        <div className='book'>
          <div className='book__cover-container'>
            {bookCover}
          </div>
          <div className='book__info'>
            <h3 className='book__title'>{book.title}</h3>
            <div className='book__authors'>{book.authors.map((author, index) => <span key={`author-${index}`} className='book__author'>{author}</span>)}</div>
            <div className='book__categories'>{book.categories.map((category, index) => <span key={`category-${index}`} className='book__category'>{category}</span>)}</div>
            <div className='book__description'>{book.description}</div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BookPage;