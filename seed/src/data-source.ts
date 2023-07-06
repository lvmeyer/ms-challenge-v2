import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Category } from './entity/Category';
import { Product } from './entity/Product';
import { Basket } from './entity/Basket';
import { Review } from './entity/Review';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: '0.0.0.0',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'bando',
	synchronize: true,
	logging: false,
	entities: [User, Basket, Product, Category, Review],
	migrations: [],
	subscribers: [],
});
