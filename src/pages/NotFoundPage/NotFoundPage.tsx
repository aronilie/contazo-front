import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NotFoundPageStyled from "./NotFoundPageStyled";
import LinkContainerStyled from "../../utils/components-utils/LinkContainerStyled";

const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <NotFoundPageStyled className="main-container">
        <div className="container">
          <img
            src="/img/computer.png"
            alt="Broken computer"
            className="container__computer"
          />
          <h1 className="container__title">404</h1>
          <h2 className="container__subtitle">Page not found!</h2>
          <Link to={"/home"} className="container__link">
            <LinkContainerStyled className="link">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="lg"
                className="link__sign"
              />
              <span className="link__sign">Home</span>
            </LinkContainerStyled>
          </Link>
        </div>
      </NotFoundPageStyled>
    </>
  );
};

export default NotFoundPage;
