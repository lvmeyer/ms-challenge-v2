import axios from "axios";

export const getOrderService = async (token) => {
  return await axios.get("test/user/orders", {
    headers: { authorization: token },
  });
};
