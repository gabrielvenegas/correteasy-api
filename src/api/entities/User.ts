import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { IsNumber, IsString, IsOptional, IsEmail, IsBoolean } from "class-validator";
import { compare, hash } from "bcrypt";
import { Role } from "./Role";
import { Permission } from "./Permission";
import { Customer } from "./Customer";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsString()
  @IsOptional()
  password?: string;

  @Column()
  @IsString()
  @IsEmail()
  mail: string;

  @Column({ default: true })
  @IsBoolean()
  active?: boolean = true;

  @Column({ nullable: true })
  @IsOptional()
  phone?: string;

  @Column({ default: false })
  @IsBoolean()
  isSuper?: boolean = false;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  async checkPassword(candidatePassword: string): Promise<boolean> {
    return this.password ? compare(candidatePassword, this.password) : false;
  }

  @BeforeInsert()
  async encryptPassword(): Promise<void> {
    this.password = await hash(this.password, 1);
  }
}
