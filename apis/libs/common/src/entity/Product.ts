import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Basket } from './Basket';
import { Category } from './Category';
import { Review } from './Review';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Basket, (basket) => basket.products)
  basket: Basket;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
