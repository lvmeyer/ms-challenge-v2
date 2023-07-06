import { AppDataSource } from './data-source';
import { User } from './entity/User';
import { hash } from 'bcryptjs';
import { Role } from './entity/auth.enum';
import { Product } from './entity/Product';
import { Category } from './entity/Category';
import { Basket } from './entity/Basket';
import { Review } from './entity/Review';

AppDataSource.initialize()
	.then(async () => {
		await AppDataSource.manager.delete(Review, {});
		await AppDataSource.manager.delete(User, {});
		await AppDataSource.manager.delete(Product, {});
		await AppDataSource.manager.delete(Category, {});
		await AppDataSource.manager.delete(Basket, {});

		// ============== CATEGORIES ==============
		console.log('Loading categories from the database...');
		const cat1 = new Category();
		cat1.name = 'Graphics Cards';
		await AppDataSource.manager.save(cat1);

		const cat2 = new Category();
		cat2.name = 'Motherboards';
		await AppDataSource.manager.save(cat2);

		const cat3 = new Category();
		cat3.name = 'Processors';
		await AppDataSource.manager.save(cat3);

		const cat4 = new Category();
		cat4.name = 'Memory';
		await AppDataSource.manager.save(cat4);

		const categories = await AppDataSource.manager.find(Category);
		console.log('Loaded categories: ', categories);

		// ============== REVIEWS ==============
		console.log('Loading reviews from the database...');
		const review1 = new Review();
		review1.description = 'Great product';
		review1.rating = 5;
		await AppDataSource.manager.save(review1);

		const review2 = new Review();
		review2.description = 'Description deserves report 2';
		review2.rating = 1;
		review2.reports = 6;
		await AppDataSource.manager.save(review2);

		const review3 = new Review();
		review3.description = 'Description deserves report 3';
		review3.rating = 3;
		review3.reports = 5;
		await AppDataSource.manager.save(review3);

		const review4 = new Review();
		review4.description = 'Description deserves report 4';
		review4.rating = 3;
		review4.reports = 3;
		await AppDataSource.manager.save(review4);

		const review5 = new Review();
		review5.description = 'Description deserves report 5';
		review5.rating = 1;
		review5.reports = 6;
		await AppDataSource.manager.save(review5);

		const review6 = new Review();
		review6.description = 'Description deserves report 6';
		review6.rating = 3;
		review6.reports = 6;
		await AppDataSource.manager.save(review6);

		const review7 = new Review();
		review7.description = 'Incredible product';
		review7.rating = 2;
		review7.reports = 0;
		await AppDataSource.manager.save(review7);

		const reviews = await AppDataSource.manager.find(Category);

		console.log('Loaded reviews: ', reviews);

		// ============== PRODUCTS ==============
		console.log('Loading products from the database...');
		const product1 = new Product();
		product1.name = 'ASRock AMD Radeon RX 6600';
		product1.description = 'ASRock AMD Radeon RX 6600';
		product1.image =
			'https://media.materiel.net/r550/products/MN0005897216_1.jpg';
		product1.price = 229;
		product1.category = cat1;
		product1.reviews = [review1, review2, review3];
		await AppDataSource.manager.save(product1);

		const product2 = new Product();
		product2.name = 'ASRock AMD Radeon RX 6700';
		product2.description = 'ASRock AMD Radeon RX 6700';
		product2.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/81/47/LD0005814778_1.jpg';
		product2.price = 399;
		product2.category = cat1;
		product2.reviews = [review4, review5, review6, review7];
		await AppDataSource.manager.save(product2);

		const product3 = new Product();
		product3.name = 'ASRock AMD Radeon RX 7600';
		product3.description = 'ASRock AMD Radeon RX 7600';
		product3.image =
			'https://www.asrock.com/Graphics-Card/photo/Radeon%20RX%207600%20Steel%20Legend%208GB%20OC(M1).png';
		product3.price = 350;
		product3.category = cat1;
		await AppDataSource.manager.save(product3);

		const product4 = new Product();
		product4.name = 'ASUS DUAL GeForce RTX 3060';
		product4.description = 'ASUS DUAL GeForce RTX 3060';
		product4.image =
			'https://www.asrock.com/Graphics-Card/photo/Radeon%20RX%207600%20Steel%20Legend%208GB%20OC(M1).png';
		product4.price = 499;
		product4.category = cat1;
		await AppDataSource.manager.save(product4);

		const product5 = new Product();
		product5.name = 'ASUS ROG Strix GeForce RTX 3060';
		product5.description = 'ASUS ROG Strix GeForce RTX 3060';
		product5.image =
			'https://m.media-amazon.com/images/I/81gBKaOGz9L._AC_UF1000,1000_QL80_.jpg';
		product5.price = 599;
		product5.category = cat1;
		await AppDataSource.manager.save(product5);

		const product6 = new Product();
		(product6.name = 'ASUS TUF GAMING B550-PLUS'),
			(product6.description = 'ASUS TUF GAMING B550-PLUS');
		product6.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/68/67/LD0005686754_1.jpg';
		product6.price = 149;
		product6.category = cat2;
		await AppDataSource.manager.save(product6);

		const product7 = new Product();
		product7.name = 'ASUS ROG Strix B550-F Gaming';
		product7.description = 'ASUS ROG Strix B550-F Gaming';
		product7.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/91/26/LD0005912641_1.jpg';
		product7.price = 199;
		product7.category = cat2;
		await AppDataSource.manager.save(product7);

		const product8 = new Product();
		product8.name = 'ASUS ROG Strix B550-E Gaming';
		product8.description = 'ASUS ROG Strix B550-E Gaming';
		product8.image =
			'https://rog.asus.com/websites/global/products/fkufhp8oogo9exki/img/kv/pd.png';
		product8.price = 249;
		product8.category = cat2;
		await AppDataSource.manager.save(product8);

		const product9 = new Product();
		product9.name = 'ASUS ROG Strix B550-XE Gaming';
		product9.description = 'ASUS ROG Strix B550-XE Gaming';
		product9.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/75/20/LD0005752029_1.jpg';
		product9.price = 299;
		product9.category = cat2;
		await AppDataSource.manager.save(product9);

		const product10 = new Product();
		product10.name = 'AMD Ryzen 5 5600X';
		product10.description = 'AMD Ryzen 5 5600X';
		product10.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product10.price = 299;
		product10.category = cat3;
		await AppDataSource.manager.save(product10);

		const product11 = new Product();
		product11.name = 'AMD Ryzen 7 5800X';
		product11.description = 'AMD Ryzen 7 5800X';
		product11.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product11.price = 449;
		product11.category = cat3;
		await AppDataSource.manager.save(product11);

		const product12 = new Product();
		product12.name = 'AMD Ryzen 9 5900X';
		product12.description = 'AMD Ryzen 9 5900X';
		product12.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product12.price = 549;
		product12.category = cat3;
		await AppDataSource.manager.save(product12);

		const product13 = new Product();
		product13.name = 'AMD Ryzen 9 5950X';
		product13.description = 'AMD Ryzen 9 5950X';
		product13.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product13.price = 799;
		product13.category = cat3;

		await AppDataSource.manager.save(product13);

		const product14 = new Product();
		product14.name = 'G.Skill Trident Z Neo 32GB';
		product14.description = 'G.Skill Trident Z Neo 32GB';
		product14.image = 'https://m.media-amazon.com/images/I/71w2mY6QwSL.jpg';
		product14.price = 199;
		product14.category = cat4;
		await AppDataSource.manager.save(product14);

		const product15 = new Product();
		product15.name = 'G.Skill Trident Z Neo 64GB';
		product15.description = 'G.Skill Trident Z Neo 64GB';
		product15.image = 'https://m.media-amazon.com/images/I/71w2mY6QwSL.jpg';
		product15.price = 399;
		product15.category = cat4;
		await AppDataSource.manager.save(product15);

		const product16 = new Product();
		product16.name = 'Corsair Vengeance LPX 32GB';
		product16.description = 'Corsair Vengeance LPX 32GB';
		product16.image =
			'https://www.1fodiscount.com/ressources/site/img/product/kit-barrettes-memoire-32go-2x16go-dimm-ddr4-corsair-vengeance-lpx-pc4-25600-3200-mhz-noir_141304__480.webp';
		product16.price = 199;
		product16.category = cat4;
		await AppDataSource.manager.save(product16);

		const product17 = new Product();
		product17.name = 'Corsair Vengeance LPX 64GB';
		product17.description = 'Corsair Vengeance LPX 64GB';
		product17.image = 'https://m.media-amazon.com/images/I/71w2mY6QwSL.jpg';
		product17.price = 399;
		product17.category = cat4;
		await AppDataSource.manager.save(product17);

		const products = await AppDataSource.manager.find(Product);
		console.log('Loaded products: ', products);
		// ============== BASKET ==============
		console.log('Loading basket from the database...');
		const basket = new Basket();
		basket.price = product1.price + product6.price + product13.price;
		basket.products = [product1, product6, product13];
		await AppDataSource.manager.save(basket);

		// ============== USERS ==============
		console.log('Loading users from the database...');
		const password = await hash('password', 10);

		const user = new User();
		user.role = Role.USER;
		user.email = 'user@user.com';
		user.firstname = 'Pierre';
		user.lastname = 'Boitelle';
		user.password = password;
		user.basket = basket;
		await AppDataSource.manager.save(user);

		const admin = new User();
		admin.role = Role.ADMINISTRATOR;
		admin.email = 'admin@admin.com';
		admin.firstname = 'Odessa';
		admin.lastname = 'Chesneau';
		admin.password = password;

		await AppDataSource.manager.save(admin);

		const users = await AppDataSource.manager.find(User);
		console.log('Loaded users: ', users);
	})
	.catch((error) => console.log(error));
