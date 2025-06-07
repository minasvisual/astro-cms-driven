
export type loginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};