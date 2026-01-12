import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export interface UserDocument extends Document {
  email: string;
  password: string;
}
interface UserModel extends Model<UserDocument> {
  signup(email: string, password: string): Promise<UserDocument>;
  login(email: string, password: string): Promise<UserDocument>;
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  email: string,
  password: string
): Promise<UserDocument> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<UserDocument> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

export default mongoose.model<UserDocument, UserModel>("User", userSchema);
