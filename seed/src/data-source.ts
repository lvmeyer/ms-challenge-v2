import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Category } from './entity/Category';
import { Product } from './entity/Product';
import { Basket } from './entity/Basket';
import { SubCategory } from './entity/SubCategory';
import { Review } from './entity/Review';
import { ProductSubCategory } from './entity/ProductSubCategory';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'bando.ck0wxkraoavc.eu-west-3.rds.amazonaws.com',
	port: 5432,
	username: 'bando',
	password: 'bando1234',
	database: 'bando',
	synchronize: true,
	logging: false,
	entities: [
		User,
		Basket,
		Product,
		Category,
		SubCategory,
		Review,
		ProductSubCategory,
	],
	migrations: [],
	subscribers: [],
});
