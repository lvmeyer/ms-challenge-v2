import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Product } from './Product';
import { Max, Min } from 'class-validator';

@Entity()
export class Review {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	description: string;

	@Column()
	@Min(0)
	@Max(5)
	rating: number;

	@Column({ default: 0 })
	@Min(0)
	reports: number;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	@ManyToOne(() => Product, (product) => product.reviews)
	product: Product;
}
