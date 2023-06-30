import axios from "axios";

export const addAddressService = async (address, token) => {
  return await axios.post(
    "/test/user/address/",
    { address },
    { headers: { authorization: token } }
  );
};
