import { IsString } from "class-validator";

export class AuthRequest {
  @IsString()
  mail: string;

  @IsString()
  password: string;
  constructor() {}
}
