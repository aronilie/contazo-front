import Header from "../../components/Header/Header";
import NotFoundPageStyled from "./NotFoundPageStyled";

const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <NotFoundPageStyled className="main-container">
        <div className="container">
          <img
            src="/img/computer.png"
            alt="Broken computer"
            className="container__computer"
          />
          <h1 className="container__title">404</h1>
          <h2 className="container__subtitle">Page not found!</h2>
        </div>
      </NotFoundPageStyled>
    </>
  );
};

export default NotFoundPage;
