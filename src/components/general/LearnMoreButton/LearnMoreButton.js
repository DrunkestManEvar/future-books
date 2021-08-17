import { useHistory } from 'react-router-dom';

const LearnMoreButton = ({ bookId }) => {
  const history = useHistory();

  const handleShowCurrentBook = () => history.push(`book/${bookId}`);

  return <button className='learn-more-button' onClick={handleShowCurrentBook}>Learn More</button>
}

export default LearnMoreButton;