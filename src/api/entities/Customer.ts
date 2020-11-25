import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNumber, IsString, IsOptional, IsEmail, IsBoolean } from "class-validator";
import { User } from "./User";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @Column({ unique: true })
  @IsString()
  name: string;

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

  @Column({ nullable: true })
  @IsOptional()
  cpf?: string;

  @Column({ nullable: true })
  @IsOptional()
  rg?: string;

  @Column({ nullable: true })
  @IsOptional()
  cep?: string;

  @Column({ nullable: true })
  @IsOptional()
  street?: string;

  @Column({ nullable: true })
  @IsOptional()
  city?: string;

  @Column({ nullable: true })
  @IsOptional()
  state?: string;

  @Column({ nullable: true })
  @IsOptional()
  number?: string;

  @Column({ nullable: true })
  @IsOptional()
  district?: string;

  @Column({ nullable: true })
  @IsOptional()
  complement?: string;

  @Column({ nullable: true })
  @IsOptional()
  civilState?: string;

  @Column({ nullable: true })
  @IsOptional()
  birthDate?: string;

  @Column({ nullable: true })
  @IsOptional()
  gender?: string;

  @Column({ nullable: false })
  @IsOptional()
  height?: string;

  @Column({ nullable: true })
  @IsOptional()
  schooling?: string;

  @Column({ nullable: true })
  @IsOptional()
  profession?: string;

  @Column({ nullable: true })
  @IsOptional()
  company?: string;

  @Column({ nullable: true })
  @IsOptional()
  role?: string;

  @Column({ nullable: true })
  @IsOptional()
  income?: string;

  @Column({ nullable: true })
  @IsOptional()
  physicalDeficit?: boolean;

  @Column({ nullable: true })
  @IsOptional()
  physicalDeficitDesc?: string;

  @Column({ nullable: true })
  @IsOptional()
  profilePic?: string;

  @ManyToOne(() => User, (user) => user.customers)
  user: User;
}
