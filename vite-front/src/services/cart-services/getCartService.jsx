import axios from "axios";

export const getCartService = async (encodedToken) =>
  await axios.get("/test/user/cart", {
    headers: { authorization: encodedToken },
  });
