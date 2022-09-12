import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationStyled from "./NavigationStyled";
import { faPhone, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = (): JSX.Element => {
  const { pathname } = useLocation();

  const isRendered = pathname !== "/register" && pathname !== "/login";

  return (
    <>
      {isRendered && (
        <NavigationStyled>
          <ul className="navigation">
            <NavLink to="/telephone" className="navigation__link">
              <div className="navigation__telephone">
                <FontAwesomeIcon icon={faPhone} size="lg" />
                <span className="navigation__text">Telephone</span>
              </div>
            </NavLink>
            <NavLink to="/contacts" className="navigation__link">
              <div className="navigation__contacts">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span className="navigation__text">Contacts</span>
              </div>
            </NavLink>
            <NavLink to="/favourites" className="navigation__link">
              <div className="navigation__favourites">
                <FontAwesomeIcon icon={faStar} size="lg" />
                <span className="navigation__text">Favourites</span>
              </div>
            </NavLink>
          </ul>
        </NavigationStyled>
      )}
    </>
  );
};

export default Navigation;
