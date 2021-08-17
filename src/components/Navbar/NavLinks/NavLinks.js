import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { navlinks } from 'components/Navbar/data';

const NavlinksList = ({ isActiveClassAdded }) => {
  return (
    <ul className={classNames('navbar__navlinks', {'active': isActiveClassAdded})}>
      {navlinks.map((navlink, index) => (
        <li key={navlink.direction + index} className="navbar__navlink">
          <NavLink
            exact={navlink.exact || false}
            activeClassName="active"
            to={navlink.direction}
          >
            {navlink.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavlinksList;