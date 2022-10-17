import { Router } from "express";
import createHttpError from "http-errors";
import { createUser, getLists, login } from "../../controllers/User.control.js";
import { newToken } from "../../middlewares/newToken.js";
import verifyToken from "../../middlewares/verifyToken.js";
import { verifyRefreshToken } from "../../services/jwt.js";
import { client } from "../../services/redis.js";
const router = Router();
/**
 * @router POST /user/register
 * @description Register a user
 * @access Public
 */
router.post("/register", createUser);
router.post("/login", login);
// router.post("/logout", logout);
router.post("/refresh-token", newToken);
router.get("/getLists", verifyToken, getLists);
router.delete("/logout", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createHttpError.BadRequest();
    const { userId } = await verifyRefreshToken(refreshToken);
    client.del(userId.toString(), (err, reply) => {
      if (err) throw createHttpError.InternalServerError();
      res.json({ message: "Logout successfully!'" });
    });
  } catch (error) {
    next(error);
  }
});
export default router;
