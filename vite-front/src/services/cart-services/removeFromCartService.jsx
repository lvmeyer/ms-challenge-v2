import axios from "axios";

export const removeFromCartService = async (productId, encodedToken) => {
  return await axios.delete(`/test/user/cart/${productId}`, {
    headers: { authorization: encodedToken },
  });
};
