// TODO später hiermit einen Store bauen und alle User Actionen auf den Store umstellen

import { User } from "../../models/user.model";

export interface UserState {
  loggedIn: boolean;
  user: User | null
}

export const initialState: UserState = {
  loggedIn: false,
  user: null,
};