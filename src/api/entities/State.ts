import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsInt, IsString } from "class-validator";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  abbreviation: string;

  @Column()
  @IsString()
  lat: string;

  @Column()
  @IsString()
  lng: string;
}
