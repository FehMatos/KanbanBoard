import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Column from "../models/columnModel.js";

interface AuthBody {
  email: string;
  password: string;
}

const createToken = (_id: string): string => {
  const secret = process.env.SECRET as string;

  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

const defaultColumns = [
  {
    title: "TO DO",
    color: "linear-gradient(135deg, rgb(131, 149, 167), rgb(90, 107, 122))",
    position: 0,
  },
  {
    title: "DOING",
    color: "linear-gradient(135deg, rgb(255, 159, 67), rgb(229, 138, 46))",
    position: 1,
  },
  {
    title: "DONE",
    color: "linear-gradient(135deg, rgb(29, 209, 161), rgb(23, 165, 137))",
    position: 2,
  },
];

const loginUser = async (
  req: Request<{}, {}, AuthBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id.toString());

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const signupUser = async (
  req: Request<{}, {}, AuthBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    await Column.insertMany(
      defaultColumns.map((col) => ({
        ...col,
        user_id: user._id,
      }))
    );

    const token = createToken(user._id.toString());

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { signupUser, loginUser };
