import React, { useRef } from 'react';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { fetchBooks } from 'store/slices/booksSlice/booksSlice';
import { GiMagnifyingGlass } from 'react-icons/gi';
import SearchInput from 'components/general/SearchInput/SearchInput';
import SearchButton from 'components/general/SearchButton/SearchButton';

const SearchForm = ({ bookTitle, handleSetBookTitle, firstBookIndex, handleSetFirstBookIndex, selectedCategory, handleSetSelectedCategory, selectedSortBy, handleSetSelectedSortBy, categoryOptions, sortByOptions }) => {
  const inputValue = useRef(null);

  const dispatch = useDispatch();

  const handleInputChange = e => handleSetBookTitle(e.target.value);

  const submitForm = e => {
    e.preventDefault();

    if (!inputValue.current.value) return;

    handleSetBookTitle(inputValue.current.value);
    dispatch(fetchBooks({bookTitleQuery: bookTitle, firstBookIndex: 0, category: selectedCategory, sortBy: selectedSortBy}));
    handleSetFirstBookIndex(30);
  };

  return (
    <form className="search-form" onSubmit={submitForm}>
      <div className='search-form__text-input'>
        <SearchInput
          type="text"
          placeholder="Enter book title..."
          value={bookTitle}
          ref={inputValue}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className='search-form__options-select'>
        <Select options={categoryOptions} defaultValue={categoryOptions[0]} onChange={e => handleSetSelectedCategory(e.value)}/>
        <Select options={sortByOptions} defaultValue={sortByOptions[0]} onChange={e => handleSetSelectedSortBy(e.value)}/>
      </div>
      <div className='search-form__search-button'>
        <SearchButton classesArray={['btn_primary']}>
          Find <GiMagnifyingGlass />
        </SearchButton>
      </div>
    </form>
  );
};

export default SearchForm;