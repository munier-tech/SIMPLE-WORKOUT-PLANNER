import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "UNAUTHORIZED - No accessToken provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "UNAUTHORIZED - accessToken expired" });
      }
    }


    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "UNAUTHORIZED - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute middleware:", error);
    return res.status(500).json({ message: error.message });
  }
};
