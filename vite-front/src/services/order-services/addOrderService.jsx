import axios from "axios";

export const addOrderService = async (order, token) => {
  return await axios.post(
    "test/user/orders",
    { ...order },
    { headers: { authorization: token } }
  );
};
