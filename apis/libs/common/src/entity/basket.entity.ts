import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // @OneToMany(() => Product, (order) => order.products)
  // order: Order;
}
