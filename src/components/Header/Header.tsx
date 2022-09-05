import HeaderStyled from "./HeaderStyled";

const Header = (): JSX.Element => {
  return (
    <HeaderStyled className="header">
      <img src="/img/logo.png" alt="Contazo logo" className="header__logo" />
    </HeaderStyled>
  );
};

export default Header;
