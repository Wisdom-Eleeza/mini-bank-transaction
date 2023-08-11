import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Customer } from "../entities/Customer";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: TransactionType })
  type!: string;

  @Column({ type: "numeric" })
  amount!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Customer, (customer) => customer.transaction, {
    onDelete: "CASCADE",
  })
  @JoinColumn({name: 'customer_id'})
  customer!: Customer;
}

// Relationships (one - many and many - one relationship)
// one customer can have many transaction and one transaction belongs to a single customer
// Customer - Transaction
// 1        -   1
// 1        -   2
// 2        -   1
// 2        -   2
