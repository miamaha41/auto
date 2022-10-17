import createHttpError from "http-errors";
import JWT from "jsonwebtoken";
import { client } from "../services/redis.js";
export const signToken = async (userId, secret, expire, setRedis) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const options = {
      expiresIn: expire, //10m 10s
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) return reject(createHttpError(err));
      if (setRedis)
        client.set(
          userId.toString(),
          token,
          "EX",
          365 * 24 * 60 * 60,
          (err, reply) => {
            if (err) return reject(createHttpError.InternalServerError());
          }
        );
      resolve(token);
    });
  });
};

export const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return reject(err);
        }
        client.get(payload.userId, (err, reply) => {
          if (err) return reject(createHttpError.InternalServerError());
          if (refreshToken === reply) return resolve(payload);
          return reject(createHttpError.Unauthorized());
        });
      }
    );
  });
};
