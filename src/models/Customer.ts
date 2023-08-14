import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { Personal } from "../utils/Personal";
import { Banker } from "./Banker";

@Entity()
export class Customer extends Personal {
  @Column({ type: "numeric", default: 0})
  balance!: number;

  @Column({ type: "simple-json", nullable: true })
  info!: {
    age: number;
    hair_color: string;
  };

  @Column({ type: "simple-json", nullable: true })
  address!: {
    address: string;
    city: string;
    province: string;
    postcode: number;
  };

  @Column({ type: "simple-array", default:[] })
  family_member!: string[];

  // when a customer record is deleted, all associated transactions related to that customer
  // will also be automatically deleted(onDelete: "CASCADE"). This ensures data consistency and prevents
  // orphaned records. Using this must be handled with caution
  @OneToMany(() => Transaction, (transaction) => transaction.customer, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customer_transactions" })
  transaction!: Transaction[];

  @ManyToMany(() => Banker, (banker) => banker.customers)
  bankers!: Banker[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

// Relationships (one - many and many - one relationship)
// one customer can have many transaction and one transaction belongs to a single customer
// Customer - Transaction
// 1        -   1
// 1        -   2
// 2        -   1
// 2        -   2

// Relationships between customer and banker
/**
 * The relationship between customer and banker entity could be many-to-many relationship.
 * This means multiple customers can be associated with multiple bankers and
 * multiple bankers can be associated with multiple customers
 */
// Customer - Banker
// 1        - 1
// 1        - 2
// 2        - 1
// 2        - 2
