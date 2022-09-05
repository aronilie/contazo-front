import jwt from "jwt-decode";

const fetchToken = (token: string) => {
  const payloadToken: {
    id: string;
    phoneNumber: string;
    iat: number;
  } = jwt(token);

  return {
    token: token,
    id: payloadToken.id,
    phoneNumber: payloadToken.phoneNumber,
  };
};

export default fetchToken;
