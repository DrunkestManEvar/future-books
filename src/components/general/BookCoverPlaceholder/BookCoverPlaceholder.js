import classNames from 'classnames';

const BookCoverPlaceholder = ({ large }) => {
  const bookCoverPlaceholderClasses = ['book-cover-placeholder'];

  large && bookCoverPlaceholderClasses.push('large');

  return (
    <div className={classNames('book-cover-placeholder', {'large': large})}>
      <p>Cover not found</p>
    </div>
  );
};

export default BookCoverPlaceholder;