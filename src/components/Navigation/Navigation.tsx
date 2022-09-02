import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationStyled from "./NavigationStyled";
import { faPhone, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";

const Navigation = (): JSX.Element => {
  return (
    <NavigationStyled>
      <ul className="navigation">
        <div className="navigation__telephone">
          <FontAwesomeIcon icon={faPhone} size="lg" />
          <span>Telephone</span>
        </div>
        <div className="navigation__contacts">
          <FontAwesomeIcon icon={faUsers} size="lg" />
          <span>Contacts</span>
        </div>
        <div className="navigation__favourites">
          <FontAwesomeIcon icon={faStar} size="lg" />
          <span>Favourites</span>
        </div>
      </ul>
    </NavigationStyled>
  );
};

export default Navigation;
