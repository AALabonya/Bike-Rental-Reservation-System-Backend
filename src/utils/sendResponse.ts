import { Response } from 'express';
type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data.message,
    data: data.data,
  });
};
export default sendResponse;

export const sendTokenResponse = async <T>(
  res: Response,
  data: TResponse<T>,
) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    token: data.token,
    data: data?.data,
    meta: data?.meta,
  });
};
