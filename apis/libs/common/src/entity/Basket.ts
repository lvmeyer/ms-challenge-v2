import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Product, (product) => product.basket)
  products: Product[];
}
