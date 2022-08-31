import { UserModel } from "./userModel";

export interface MessageModel {
  id: string,
  message: string,
  username: UserModel
}