import User from "../models/User.model.js";
import createError from "http-errors";
import { validateUser } from "../validations/User.validate.js";
import { signToken } from "../services/jwt.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    validateUser(req.body);
    const isExist = await User.findOne({ username: username });
    if (isExist) {
      throw createError.Conflict(
        `${username} is have been already registered. Please try again!`
      );
    }
    const user = new User({
      username,
      password,
      email,
    });
    const savedUser = await user.save();
    return res.send({ status: 200, registered: savedUser });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    // validateUser(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new createError.NotFound(
        `${username} has been not registered yet!`
      );
    }
    const isValid = await user.isCheckPassword(password);
    if (!isValid) {
      throw createError.Unauthorized();
    }
    const accessToken = await signToken(
      user._id,
      process.env.ACCESS_TOKEN_SECRET,
      "10m",
      false
    );
    const refreshToken = await signToken(
      user._id,
      process.env.REFRESH_TOKEN_SECRET,
      "1y",
      true
    );
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
export const getLists = async (req, res, next) => {
  const listUsers = [
    {
      username: "abc",
    },
    { username: "def" },
  ];
  res.send({ listUsers });
};
