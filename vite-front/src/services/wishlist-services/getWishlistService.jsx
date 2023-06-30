import axios from "axios";

export const getWishlistService = async (encodedToken) =>
  await axios.get("/test/user/wishlist", {
    headers: { authorization: encodedToken },
  });
