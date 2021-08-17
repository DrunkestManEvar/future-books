import { FaSkullCrossbones } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <main className="page page_error">
      <h3 className="page__heading">
        Oops, something went wrong... <FaSkullCrossbones />
      </h3>
    </main>
  );
};

export default ErrorPage;