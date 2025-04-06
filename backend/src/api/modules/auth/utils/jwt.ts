// jwtUtils.js
import { Request } from "express";
import jwt from "jsonwebtoken";
import config from "../../../shared/config/config";

export const generateToken = (data: any) => {
  return jwt.sign(data, config.jwt.secret, { expiresIn: "1d" });
};

export const updateToken = (data: any) => {
  return jwt.sign(data, config.jwt.secret);
};

export const extractTokenFromCookie = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.authToken;
  }
  return token;
};
