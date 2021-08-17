import { useDispatch } from 'react-redux';
import { fetchMoreBooks } from 'store/slices/booksSlice/booksSlice';
import classNames from 'classnames';

const LoadMoreButton = ({ bookTitle, firstBookIndex, handleSetFirstBookIndex, selectedCategory, selectedSortBy, isShown, isDisabled }) => {
  const dispatch = useDispatch();

  const handleLoadMoreClick = () => {
    handleSetFirstBookIndex(prevState => prevState + 30);
    dispatch(fetchMoreBooks({ bookTitleQuery: bookTitle, firstBookIndex, category: selectedCategory, sortBy: selectedSortBy }));
  }

  return <button className={classNames('load-more-button', {'load-more-button--shown': isShown })} disabled={isDisabled} onClick={handleLoadMoreClick}>Show More</button>
}

export default LoadMoreButton;