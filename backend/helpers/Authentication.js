import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userID) => {
  const accesstokensecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accesstokensecret) {
   throw new Error("Access token secret is not defined in environment variables");
  }

  const accesstoken = jwt.sign(accesstokensecret , {
    expiresIn: "1y",
  })
  return {accesstoken}
}


export const setCookies = async (res, accessToken) => {
  res.cookie(accessToken , {
    httpOnly: true,
    secure : process.env.NODE_ENV === "production",
    sameSite : "Strict",
    maxAge : 1000 * 60 * 60 * 24 * 365
  })
}


