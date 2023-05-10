import { Response } from 'express';

export interface GatewayResponseBuilder {
  res: Response;
  status: number;
  success: boolean;
  data?: any;
  message?: string;
}
