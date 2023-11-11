import Cookies from "js-cookie";

const getJwtToken = () => {
  return Cookies.get("authToken");
};

export default getJwtToken;
