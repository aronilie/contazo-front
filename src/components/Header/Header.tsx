import { useLocation } from "react-router-dom";
import HeaderStyled from "./HeaderStyled";

const Header = (): JSX.Element => {
  const { pathname } = useLocation();

  const isRendered = pathname !== "/register" && pathname !== "/login";

  return (
    <>
      {isRendered && (
        <HeaderStyled className="header">
          <img
            src="/img/logo.png"
            alt="Contazo logo"
            className="header__logo"
          />
        </HeaderStyled>
      )}
    </>
  );
};

export default Header;
