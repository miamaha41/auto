// import ajv from "../config/ajv.js";
// const schema = {
//   type: "object",
//   properties: {
//     firstName: { type: "string" },
//     lastName: { type: "string" },
//     userName: { type: "string" },
//     password: { type: "string", format: "password" },
//     email: { type: "string", format: "email" },
//     phoneNumber: { type: "string", format: "number" },
//   },
//   required: [
//     "lastName",
//     "lastName",
//     "userName",
//     "password",
//     "phoneNumber",
//     "email",
//   ],
//   additionalProperties: false,
// };
// const validate = ajv.compile(schema);

// export default User;
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { newMongoDBConn } from "../services/mongoDb.js";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    console.log("Call before save:", this.username, this.password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {}
};
const User = newMongoDBConn.model("users", UserSchema);
export default User;
