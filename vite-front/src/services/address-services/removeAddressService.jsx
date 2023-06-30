import axios from "axios";

export const removeAddressService = async (address, token) => {
  return await axios.delete(`/test/user/address/${address._id}`, {
    headers: { authorization: token },
  });
};
