import classNames from 'classnames';

const SearchButton = ({ children, classesArray, handleClick }) => {
  return (
    <button className={classNames('btn', ...classesArray)} onClick={handleClick}>
      {children}
    </button>
  );
};

export default SearchButton;
