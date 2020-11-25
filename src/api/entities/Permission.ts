import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IsNumber, IsString } from "class-validator";
import { PermissionGroup } from "./PermissionGroups";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @Column()
  @IsString()
  method: "GET" | "POST" | "UPDATE" | "DELETE";

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  url: string;

  @ManyToOne(
    () => PermissionGroup,
    permissionGroup => permissionGroup.permissions,
  )
  permissionGroup: PermissionGroup;
}
