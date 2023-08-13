import {
    Entity,
    Column,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
  } from "typeorm";
  import { Personal } from "../utils/Personal";
  import { Customer } from "./Customer";
  
  @Entity()
  export class Banker extends Personal {
    @Column({ type: "simple-json" })
    address!: {
      address: string;
      city: string;
      province: string;
      postcode: number;
    };
  
    @Column({ unique: true, length: 10 })
    employee_number!: string;
  
    @ManyToMany(() => Customer, customer => customer.bankers, {
      cascade: true,
    })
    @JoinTable({
      name: 'banker_to_customer', // Corrected name with underscores
      joinColumn: {
        name: 'banker_id', // Name of the column in the join table
        referencedColumnName: 'id', // Referenced column in the Banker entity
      },
      inverseJoinColumn: {
        name: 'customer_id', // Name of the column in the join table
        referencedColumnName: 'id', // Referenced column in the Customer entity
      },
    })
    customers!: Customer[];
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  }
  