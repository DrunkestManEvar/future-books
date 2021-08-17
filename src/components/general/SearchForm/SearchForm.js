import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooks } from 'store/slices/booksSlice/booksSlice';
import SearchInput from 'components/general/SearchInput/SearchInput';
import SearchButton from 'components/general/SearchButton/SearchButton';
import { GiMagnifyingGlass } from 'react-icons/gi';

const SearchForm = ({ bookTitle, handleSetBookTitle, firstBookIndex, handleSetFirstBookIndex }) => {
  const inputValue = useRef(null);

  const dispatch = useDispatch();

  const handleInputChange = e => handleSetBookTitle(e.target.value);

  const submitForm = e => {
    e.preventDefault();
    handleSetBookTitle(inputValue.current.value);
    dispatch(fetchBooks({bookTitleQuery: bookTitle, firstBookIndex}));
    handleSetFirstBookIndex(0);
  };

  return (
    <form className="search-form" onSubmit={submitForm}>
      <SearchInput
        type="text"
        placeholder="Enter book title..."
        value={bookTitle}
        ref={inputValue}
        handleInputChange={handleInputChange}
      />
      <SearchButton classesArray={['btn_primary']}>
        Find <GiMagnifyingGlass />
      </SearchButton>
    </form>
  );
};

export default SearchForm;