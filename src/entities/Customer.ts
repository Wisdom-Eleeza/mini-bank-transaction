import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ type: "simple-json" })
  info!: {
    age: number;
    hair_color: string;
  };

  @Column({ type: "simple-json" })
  address!: {
    address: string;
    city: string;
    province: string;
    postcode: number;
  };

  @Column({ type: "simple-array" })
  family_member!: string[];

  @OneToMany(() => Transaction, transaction => transaction.customer)
  transaction!: Transaction[]

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
