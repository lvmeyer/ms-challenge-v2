import { IsEmail, IsString } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Role } from './auth.enum';
import { Basket } from './Basket';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: true })
	@IsEmail()
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	@IsString()
	firstname: string;

	@Column({ nullable: true })
	@IsString()
	lastname: string;

	@Column({
		nullable: false,
		type: 'enum',
		enum: Role,
		default: Role.USER,
	})
	public role: Role;

	@OneToOne(() => Basket)
	@JoinColumn()
	basket: Basket;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;
}
