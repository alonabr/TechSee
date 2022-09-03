import { UserModel } from "./userModel";

export interface MessageModel {
  message: string,
  username: UserModel
}