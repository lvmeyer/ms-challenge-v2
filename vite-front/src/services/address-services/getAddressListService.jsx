import axios from "axios";

export const getAddressListService = async (token) => {
  return await axios.get("/test/user/address", {
    headers: { authorization: token },
  });
};
