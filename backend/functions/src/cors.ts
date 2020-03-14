import { NextFunction, Request, Response } from "express";

export const OptionHandler = (req: Request, res: Response): void => {
  res.sendStatus(200);
  return;
};

export const CorsResolveMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400");
  next();
};
