import BurgerMenu from 'hamburger-react';
import { NavLink } from 'react-router-dom';
import Navlinks from 'components/Navbar/NavLinks/NavLinks';
import logo from 'images/logo.png';

const Navbar = () => {
  return (
      <nav className="navbar">
        <div className="navbar__center">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="navbar__logo" />
          </NavLink>
          <Navlinks
            isActiverClassAdded
          />
          {/* <BurgerMenu
            toggled={false}
            toggle={() => {}}
          /> */}
        </div>
      </nav>
  )
}

export default Navbar;