export interface JwtPayload {
  id: string;
  email: string;
  permissions: string[];
  expiration?: Date;
}
