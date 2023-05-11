import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  // @OneToMany(() => Product, (product) => product.order)
  // @IsOptional()
  // products?: Product[];
}

// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ unique: true })
//   name: string;

//   @Column()
//   price: number;

//   @Column({ default: 0 })
//   quantity: number;

//   @Column()
//   description: string;

//   @CreateDateColumn()
//   createdDate: Date;

//   @UpdateDateColumn()
//   updatedDate: Date;

//   @ManyToOne(() => Order, (order) => order.products)
//   order: Order;
// }
