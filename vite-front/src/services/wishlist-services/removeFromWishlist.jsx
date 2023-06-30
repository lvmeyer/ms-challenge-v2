import axios from "axios";

export const removeFromWishlistService = async (productId, encodedToken) => {
  return await axios.delete(`/test/user/wishlist/${productId}`, {
    headers: { authorization: encodedToken },
  });
};
