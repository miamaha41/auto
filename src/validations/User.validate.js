import createHttpError from "http-errors";
import Joi from "joi";

const userValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().lowercase().required(),
    email: Joi.string()
      .pattern(new RegExp("gmail.com$"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return userSchema.validate(data);
};
export const validateUser = (data) => {
  const { error } = userValidate(data);
  if (error) {
    throw createHttpError(error.details[0].message);
  }
};
