import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { User } from './User';
import { Product } from './Product';

@Entity()
export class Config {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	price: number;

	@ManyToOne(() => User, (user) => user.configs)
	user: User;
}