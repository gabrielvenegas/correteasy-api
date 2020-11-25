import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { IsString, IsInt, IsOptional } from "class-validator";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @IsInt()
  id?: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @ManyToMany(() => Permission, { persistence: true, cascade: true })
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(
    () => User,
    user => user.roles,
    { persistence: true, cascade: true },
  )
  users: User[];
}
