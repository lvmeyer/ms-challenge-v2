import axios from "axios";

export const addToWishlistService = async (product, encodedToken) => {
  return await axios.post(
    "/test/user/wishlist",
    { product: { ...product } },
    {
      headers: { authorization: encodedToken },
    }
  );
};
