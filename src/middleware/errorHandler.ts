import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("An error occured: ", error);

  // check if the error has a status code, otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // send an error response
  res.status(statusCode).json({
    message: "An error occurred",
    error: error.message
  })
};

export default errorHandlerMiddleware
