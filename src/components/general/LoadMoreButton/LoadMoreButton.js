import { useDispatch } from 'react-redux';
import { fetchMoreBooks } from 'store/slices/booksSlice/booksSlice';
import classNames from 'classnames';

const LoadMoreButton = ({ bookTitle, firstBookIndex, handleSetFirstBookIndex, isShown }) => {
  const dispatch = useDispatch();

  const handleLoadMoreClick = () => {
    dispatch(fetchMoreBooks({ bookTitleQuery: bookTitle, firstBookIndex }));
    handleSetFirstBookIndex(prevState => prevState + 30);
  }

  return <button className={classNames('load-more-button', {'load-more-button--shown': isShown })} onClick={handleLoadMoreClick}>Show More</button>
}

export default LoadMoreButton;