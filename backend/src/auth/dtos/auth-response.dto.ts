export class AuthResponseDto {
  user: {
    id: number;
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
}
