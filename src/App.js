import { Switch, Route } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import HomePage from 'pages/HomePage/HomePage';
import BookPage from 'pages/BookPage/BookPage';
import AboutPage from 'pages/AboutPage/AboutPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';

const App = () => {
  return (
  <>
    <Navbar />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/book/:bookId' component={BookPage} />
      <Route  path='/about' component={AboutPage} />
      <Route  path='/*' component={ErrorPage} />
    </Switch>
  </>
  );
};

export default App;
