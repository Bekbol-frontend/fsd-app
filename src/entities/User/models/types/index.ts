export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

export interface IUserSchema {
  user: IUser | null;
  token?: string;
}
