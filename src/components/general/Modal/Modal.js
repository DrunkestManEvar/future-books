import { useSelector } from 'react-redux';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/general/Spinner/Spinner';
import Overlay from 'components/general/Overlay/Overlay';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ modalType }) => {
  const book = useSelector(state => state.currentBook.book);
  const bookLoading = useSelector(state => state.currentBook.loading);
  const bookError = useSelector(state => state.currentBook.error);

  let bookContent;

  if (bookLoading) bookContent = <Spinner />;
  else if (bookError) bookContent = <ErrorPage />;
  else bookContent = <BookCard book={book} showTitle />;

  const modalTypes = {
    notification: modalType.msg,
    book: bookContent,
  };

  const modalContents = modalTypes[modalType.type];

  return (
    <Overlay>
      <div className="modal">
          <IoMdClose />
        <div className="modal__center">{modalContents}</div>
      </div>
    </Overlay>
  );
};

export default Modal;