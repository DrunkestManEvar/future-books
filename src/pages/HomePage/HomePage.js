import { useState } from 'react';
import SearchForm from 'components/general/SearchForm/SearchForm';
import BooksList from 'components/BooksList/BooksList';

const HomePage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [firstBookIndex, setFirstBookIndex] = useState(30);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSortBy, setSelectedSortBy] = useState('relevance');

  const categoryOptions = [{value: 'all', label: 'All'}, {value: 'art', label: 'Art'}, {value: 'biography', label: 'Biography'}, {value: 'computers', label: 'Computers'}, {value: 'history', label: 'History'}, {value: 'medical', label: 'Medical'}, {value: 'poetry', label: 'Poetry'}];
  const sortByOptions = [{value: 'relevance', label: 'Relevance'}, {value: 'newest', label: 'Newest'}];

  return (
    <main className="page page_home">
      <h3 className="page__heading">Search for your new favorite book!</h3>
      <SearchForm bookTitle={bookTitle} handleSetBookTitle={setBookTitle} firstBookIndex={firstBookIndex} handleSetFirstBookIndex={setFirstBookIndex} selectedCategory={selectedCategory} handleSetSelectedCategory={setSelectedCategory} selectedSortBy={selectedSortBy} handleSetSelectedSortBy={setSelectedSortBy} categoryOptions={categoryOptions} sortByOptions={sortByOptions}  />
      <BooksList bookTitle={bookTitle} firstBookIndex={firstBookIndex} handleSetFirstBookIndex={setFirstBookIndex} selectedCategory={selectedCategory} selectedSortBy={selectedSortBy} />
    </main>
  );
};

export default HomePage;