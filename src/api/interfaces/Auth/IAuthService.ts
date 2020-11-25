import { AuthResponse } from "../../models/Auth/AuthResponse";
import { AuthRequest } from "../../models/Auth/AuthRequest";

export interface IAuthService {
  login(user: AuthRequest): Promise<AuthResponse | undefined>;
  googleUrl(): Promise<string>;
  googleAuth(code: string): Promise<any>;
}
