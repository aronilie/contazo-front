import DetailContact from "../../components/DetailContact/DetailContact";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import { defaultContact } from "../../utils/components-utils/defaultObjects";

const DetailContactPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <DetailContact contact={defaultContact} />
      <Navigation />
    </>
  );
};

export default DetailContactPage;
