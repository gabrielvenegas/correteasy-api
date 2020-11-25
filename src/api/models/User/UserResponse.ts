import { IsNumber, IsOptional, IsString, IsEmail, IsBoolean, IsPhoneNumber, IsArray } from "class-validator";
import { Role } from "../../entities/Role";

export class UserResponse {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  mail: string;

  @IsBoolean()
  active: boolean = true;

  phone: string;

  @IsArray()
  roles: Role[];
}
