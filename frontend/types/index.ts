export type TAuth = {
  email: string;
  password: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
};

export type TPSignIn = {
  user: TUser;
  token: string;
  refreshToken: string;
};
