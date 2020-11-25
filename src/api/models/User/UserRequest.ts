import { IsNumber, IsString, IsEmail, IsBoolean, IsPhoneNumber, IsOptional, MinLength } from "class-validator";
import { Role } from "../../entities/Role";
import { Permission } from "../../entities/Permission";

export class UserRequest {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsEmail()
  mail: string;

  @IsBoolean()
  active: boolean = true;

  @IsOptional()
  phone?: string;

  @IsOptional()
  roles: Role[];

  @IsOptional()
  permissions: Permission[];
}
