import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface RouteProtectorProps {
  children: JSX.Element;
}

const RouteProtector = ({ children }: RouteProtectorProps): JSX.Element => {
  const user = useAppSelector((state) => state.user.id);
  const navigate = useNavigate();
  const logged = user === "" ? false : true;

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  return logged ? children : <></>;
};

export default RouteProtector;
