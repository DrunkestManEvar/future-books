import React from 'react';
import BookCoverPlaceholder from 'components/general/BookCoverPlaceholder/BookCoverPlaceholder';
import { MdCropRotate } from 'react-icons/md';

const BookCard = ({ book, showTitle }) => {
  const publishers = book.publishers?.map((publisher, index) => (
    <span key={index}>{publisher}</span>
  ));

  let bookCover;

  if (typeof book.coverId === 'number') {
    bookCover = (
      <img
        src={`http://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
        alt="Book cover"
        className="book-desc__book-img"
      />
    );
  } else if (typeof book.coverId === 'object') {
    bookCover = (
      <img
        src={`http://covers.openlibrary.org/b/id/${book.coverId[0]}-M.jpg`}
        alt="Book cover"
        className="book-desc__book-img"
      />
    );
  }

  if (!book.coverId) {
    bookCover = <BookCoverPlaceholder large />;
  }

  const showBookInfo = bookData => bookData ?? 'Not Found';

  return (
    <article className="book-desc">
      <div className="book-desc__side book-desc__side_front">
        <MdCropRotate className="book-desc__rotate-icon" />
        {bookCover}
      </div>

      <div className="book-desc__side book-desc__side_back">
        {showTitle && (
          <p className="book-desc__book-title">
            Title: {showBookInfo(book.title)}
          </p>
        )}
        <p className="book-desc__book-author">
          Author: {showBookInfo(book.author)}
        </p>
        <p className="book-desc__book-release-date">
          Release Date: {showBookInfo(book.publish_date)}
        </p>
        <p className="book-desc__book-publisher">
          Publishers: {showBookInfo(publishers)}
        </p>
        <p className="book-desc__book-ISBN">
          ISBN: {showBookInfo(book.isbn_10 ?? book.isbn_13)}
        </p>
      </div>
    </article>
  );
};

export default BookCard;
