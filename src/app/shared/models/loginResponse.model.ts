export interface ILoginResponse {
  message: string;
  token: string;
  userId: string;
  name: string;
  email: string;
  refreshToken: string;
}
