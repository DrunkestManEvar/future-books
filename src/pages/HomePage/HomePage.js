import { useState } from 'react';
import SearchForm from 'components/general/SearchForm/SearchForm';
import BooksList from 'components/BooksList/BooksList';
import Modal from 'components/general/Modal/Modal';

const HomePage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [firstBookIndex, setFirstBookIndex] = useState(0);

  return (
    <main className="page page_home">
      <h3 className="page__heading">Search for your new favorite book!</h3>
      <SearchForm bookTitle={bookTitle} handleSetBookTitle={setBookTitle} firstBookIndex={firstBookIndex} handleSetFirstBookIndex={setFirstBookIndex} />
      <BooksList bookTitle={bookTitle} firstBookIndex={firstBookIndex} handleSetFirstBookIndex={setFirstBookIndex} />
      <Modal modalType={{ type: 'book' }} />
    </main>
  );
};

export default HomePage;