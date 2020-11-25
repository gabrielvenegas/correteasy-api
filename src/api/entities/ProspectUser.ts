import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { IsNumber, IsString, IsOptional, IsEmail, IsBoolean } from "class-validator";
import { compare, hash } from "bcrypt";
import { Role } from "./Role";
import { Permission } from "./Permission";
import { Customer } from "./Customer";
@Entity()
export class ProspectUser {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  mail: string;

  @Column()
  @IsString()
  phone: string;
}
