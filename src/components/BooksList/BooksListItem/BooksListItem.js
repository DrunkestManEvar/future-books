import Card from 'components/general/Card/Card';
import LearnMoreButton from 'components/general/LearnMoreButton/LearnMoreButton';
import BookCoverPlaceholder from 'components/general/BookCoverPlaceholder/BookCoverPlaceholder';

const BooksListItem = ({ book }) => {
  const { id, title, cover, authors, categories } = book;

  const bookCoverSrc = cover.medium || cover.small;
  const bookCover = bookCoverSrc ? <img src={bookCoverSrc} alt={`${title} cover`} /> : <BookCoverPlaceholder />

  let authorNames;

  if (authors) {
    authorNames = authors.map((author, index, authorsArr) => <span key={`author-${index}`} className='books-list-item__book-author'>{author}{index !== authorsArr.length - 1 && ', '}</span>)
  }
  if (!authors) {
    authorNames = null
  }

  let booksCategory;

  if (categories) {
    [booksCategory] = categories
  }
  if (!categories) {
    booksCategory = null;
  }

  return (
    <Card>
      <article className="books-list-item">
        <div className="books-list-item__book-info-overlay">
          {bookCover}
          <div className="books-list-item__book-info-container">
            <h4 className="books-list-item__book-title">{title}</h4>
            <p className="books-list-item__book-authors">{authorNames}</p>
            {booksCategory && <p className="books-list-item__book-category"><span className='books-list-item__book-category'>{booksCategory}</span></p>}
          </div>
        </div>
        <LearnMoreButton bookId={id} />
      </article>
    </Card>
  );
};

export default BooksListItem;