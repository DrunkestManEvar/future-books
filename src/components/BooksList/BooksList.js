import { useSelector } from 'react-redux';
import BooksListItem from 'components/BooksList/BooksListItem/BooksListItem';
import Spinner from 'components/general/Spinner/Spinner';
import LoadMoreButton from 'components/general/LoadMoreButton/LoadMoreButton';

const BooksList = ({ bookTitle, firstBookIndex, handleSetFirstBookIndex, selectedCategory, selectedSortBy }) => {
  const books = useSelector(state => state.books.books);
  const booksStatus = useSelector(state => state.books.status);
  const booksFound = useSelector(state => state.books.booksFound);
  const newBooksBatchFound = useSelector(state => state.books.newBooksBatchFound);

  let content;

  if (booksStatus === 'loadingFull') return <div className='books-list__spinner-container'><Spinner /></div>;

  if (!booksFound && booksStatus !== 'loadingFull')
    content = (
      <h3>
        No books have been found :( Please check if the book title is correct.
      </h3>
    );

  if (!booksFound && booksStatus === 'init')
    content = <h3>Enter a book title to find books!</h3>;

  if (booksFound) {
    content = (
      <>
      <h3>Book entries found: {booksFound}</h3>
      {books.map((book, index) => {
        const {
          id,
          authors,
          categories,
          title,
          imageLinks
        } = book;
  
        const bookItem = {
          id,
          title,
          authors,
          categories,
          cover: {
            small: imageLinks?.smallThumbnail,
            medium: imageLinks?.thumbnail
          },
        };
  
        return <BooksListItem book={bookItem} key={index} />
      })}
      </>
    )
  }

  const shouldLoadMoreBeDisabled = (books && books.length >= booksFound) || !newBooksBatchFound;

  return (
    <>
      <section className="books-list">
        {content}
        {booksStatus === 'loadingPartial' && <div className='books-list__spinner-container'><Spinner /></div>}
        </section>
      <LoadMoreButton bookTitle={bookTitle} firstBookIndex={firstBookIndex} handleSetFirstBookIndex={handleSetFirstBookIndex} selectedCategory={selectedCategory} selectedSortBy={selectedSortBy} isShown={booksFound} isDisabled={shouldLoadMoreBeDisabled} />
    </>
  );
};

export default BooksList;
