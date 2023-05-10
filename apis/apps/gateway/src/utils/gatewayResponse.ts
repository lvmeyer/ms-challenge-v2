import { GatewayResponseBuilder } from '../interfaces/GatewayResponseBuilder';

export const gatewayResponse = ({
  res,
  status,
  success,
  data,
  message,
}: GatewayResponseBuilder) => {
  return res.status(status).json({ success, data, message });
};
