import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserSchema } from "../types";
import { TOKEN_KEY, USER_KEY } from "@/shared/constants";

function checkUser() {
  const user = localStorage.getItem(USER_KEY);

  return user ? (JSON.parse(user) as IUser) : null;
}

function checkToken() {
  const token = localStorage.getItem(TOKEN_KEY);

  return token ? token : undefined;
}

const initialState: IUserSchema = {
  user: checkUser(),
  token: checkToken(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: IUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
      localStorage.setItem(TOKEN_KEY, action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = undefined;
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
