import { Types } from "mongoose";

export interface UserPayload {
  _id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
