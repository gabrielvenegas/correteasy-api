import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Permission } from "./Permission";

@Entity()
export class PermissionGroup {
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsOptional()
  id?: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  icon: string;

  @OneToMany(
    () => Permission,
    permission => permission.permissionGroup,
  )
  permissions: Permission[];
}
