import createHttpError from "http-errors";
import JWT from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return next(createError.Unauthorized);
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found!" });
  }
  // try {
  // const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  // req.userId = decoded.userId;
  // if (decoded) next();
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next(createHttpError(401, err));
    }
    req.payload = payload;
    next();
  });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(403).json({ success: false, message: "Invalid token!" });
  // }
};
export default verifyToken;
