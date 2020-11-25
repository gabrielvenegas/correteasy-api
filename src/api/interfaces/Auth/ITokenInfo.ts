import { Role } from "../../entities/Role";

export interface ITokenInfo {
  user_id: number;
  username: string;
  roles: Role[];
}
