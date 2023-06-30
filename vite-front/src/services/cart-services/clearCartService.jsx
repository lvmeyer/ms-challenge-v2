import axios from "axios";

export const clearCartService = async (token) => {
  return await axios.post(
    "/test/user/cart/clearCart",
    {},
    { headers: { authorization: token } }
  );
};
