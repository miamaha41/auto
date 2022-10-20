import createHttpError from "http-errors";
import Joi from "joi";

const userValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().lowercase().required(),
    email: Joi.string()
      .pattern(
        /([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/
      )
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });
  return userSchema.validate(data);
};
export const validateUser = (data) => {
  const { error } = userValidate(data);
  if (error) {
    throw createHttpError(error.details[0].message);
  }
};
