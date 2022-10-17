import createHttpError from "http-errors";
import { signToken, verifyRefreshToken } from "../services/jwt.js";

export const newToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createHttpError.BadRequest();
    const { userId } = await verifyRefreshToken(refreshToken);
    const accessToken = await signToken(
      userId,
      process.env.ACCESS_TOKEN_SECRET,
      "10m",
      false
    );
    const refToken = await signToken(
      userId,
      process.env.REFRESH_TOKEN_SECRET,
      "1y",
      true
    );
    res.json({ accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};
