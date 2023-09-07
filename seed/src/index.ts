import { AppDataSource } from './data-source';
import { User } from './entity/User';
import { hash } from 'bcryptjs';
import { Role } from './entity/auth.enum';
import { Product } from './entity/Product';
import { Category } from './entity/Category';
import { Basket } from './entity/Basket';
import { SubCategory } from './entity/SubCategory';
import { Review } from './entity/Review';
import { ProductSubCategory } from './entity/ProductSubCategory';

AppDataSource.initialize()
	.then(async () => {
		await AppDataSource.manager.delete(Review, {});
		await AppDataSource.manager.delete(User, {});
		await AppDataSource.manager.delete(ProductSubCategory, {});
		await AppDataSource.manager.delete(Product, {});
		await AppDataSource.manager.delete(SubCategory, {});
		await AppDataSource.manager.delete(Category, {});
		await AppDataSource.manager.delete(Review, {});
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

		// ============== SUB_CATEGORIES ==============
		console.log('Loading sub-categories from the database...');
		const sub_cat1 = new SubCategory();
		sub_cat1.name = 'ASUS';
		sub_cat1.type = 'Marque';
		sub_cat1.category = cat1;
		await AppDataSource.manager.save(sub_cat1);

		const sub_cat2 = new SubCategory();
		sub_cat2.name = 'NVIDIA';
		sub_cat2.type = 'Marque';
		sub_cat2.category = cat1;
		await AppDataSource.manager.save(sub_cat2);

		const sub_cat3 = new SubCategory();
		sub_cat3.name = 'Intel';
		sub_cat3.type = 'Marque';
		sub_cat3.category = cat3;
		await AppDataSource.manager.save(sub_cat3);

		const sub_cat4 = new SubCategory();
		sub_cat4.name = 'AMD';
		sub_cat4.type = 'Marque';
		sub_cat4.category = cat3;
		await AppDataSource.manager.save(sub_cat4);

		const sub_cat5 = new SubCategory();
		sub_cat5.name = 'DDR4';
		sub_cat5.type = 'RAM';
		sub_cat5.category = cat4;
		await AppDataSource.manager.save(sub_cat5);

		const sub_cat6 = new SubCategory();
		sub_cat6.name = 'DDR5';
		sub_cat6.type = 'RAM';
		sub_cat6.category = cat4;
		await AppDataSource.manager.save(sub_cat6);

		const sub_cat55 = new SubCategory();
		sub_cat55.name = 'DDR4';
		sub_cat55.type = 'RAM';
		sub_cat55.category = cat2;
		await AppDataSource.manager.save(sub_cat55);

		const sub_cat66 = new SubCategory();
		sub_cat66.name = 'DDR5';
		sub_cat66.type = 'RAM';
		sub_cat66.category = cat2;
		await AppDataSource.manager.save(sub_cat66);

		const sub_cat7 = new SubCategory();
		sub_cat7.name = '64GO';
		sub_cat7.type = 'GO';
		sub_cat7.category = cat4;
		await AppDataSource.manager.save(sub_cat7);

		const sub_cat8 = new SubCategory();
		sub_cat8.name = '32GO';
		sub_cat8.type = 'GO';
		sub_cat8.category = cat4;
		await AppDataSource.manager.save(sub_cat8);

		const sub_cat9 = new SubCategory();
		sub_cat9.name = 'Socket LGA1200';
		sub_cat9.type = 'SOCKET';
		sub_cat9.category = cat2;
		await AppDataSource.manager.save(sub_cat9);

		const sub_cat10 = new SubCategory();
		sub_cat10.name = 'Socket AM4';
		sub_cat10.type = 'SOCKET';
		sub_cat10.category = cat2;
		await AppDataSource.manager.save(sub_cat10);

		const sub_cat11 = new SubCategory();
		sub_cat11.name = 'Socket LGA1200';
		sub_cat11.type = 'SOCKET';
		sub_cat11.category = cat3;
		await AppDataSource.manager.save(sub_cat11);

		const sub_cat12 = new SubCategory();
		sub_cat12.name = 'Socket AM4';
		sub_cat12.type = 'SOCKET';
		sub_cat12.category = cat3;
		await AppDataSource.manager.save(sub_cat12);


		const sub_cat13 = new SubCategory();
		sub_cat13.name = 'PCI Express 2.0';
		sub_cat13.type = 'SLOT';
		sub_cat13.category = cat1;
		await AppDataSource.manager.save(sub_cat13);


		const sub_cat14 = new SubCategory();
		sub_cat14.name = 'PCI Express 3.0';
		sub_cat14.type = 'SLOT';
		sub_cat14.category = cat1;
		await AppDataSource.manager.save(sub_cat14);

		const sub_cat15 = new SubCategory();
		sub_cat15.name = 'PCI Express 2.0';
		sub_cat15.type = 'SLOT';
		sub_cat15.category = cat2;
		await AppDataSource.manager.save(sub_cat15);


		const sub_cat16 = new SubCategory();
		sub_cat16.name = 'PCI Express 3.0';
		sub_cat16.type = 'SLOT';
		sub_cat16.category = cat2;
		await AppDataSource.manager.save(sub_cat16);

		const sub_categories = await AppDataSource.manager.find(SubCategory);
		console.log('Loaded sub-categories: ', sub_categories);

		// ============== PRODUCTS ==============
		console.log('Loading products from the database...');
		const product1 = new Product();
		product1.name = 'ASRock AMD Radeon RX 6600';
		product1.description = 'ASRock AMD Radeon RX 6600';
		product1.image =
			'https://media.materiel.net/r550/products/MN0005897216_1.jpg';
		product1.price = 229;
		product1.quantity = 1;
		product1.category = cat1;
		product1.reviews = [review1, review2, review3];
		await AppDataSource.manager.save(product1);

		const product2 = new Product();
		product2.name = 'ASRock AMD Radeon RX 6700';
		product2.description = 'ASRock AMD Radeon RX 6700';
		product2.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/81/47/LD0005814778_1.jpg';
		product2.price = 399;
		product2.quantity = 50;
		product2.category = cat1;
		product2.reviews = [review4, review5, review6, review7];
		await AppDataSource.manager.save(product2);

		const product3 = new Product();
		product3.name = 'ASRock AMD Radeon RX 7600';
		product3.description = 'ASRock AMD Radeon RX 7600';
		product3.image =
			'https://www.asrock.com/Graphics-Card/photo/Radeon%20RX%207600%20Steel%20Legend%208GB%20OC(M1).png';
		product3.price = 350;
		product3.quantity = 50;
		product3.category = cat1;
		await AppDataSource.manager.save(product3);

		const product4 = new Product();
		product4.name = 'ASUS DUAL GeForce RTX 3060';
		product4.description = 'ASUS DUAL GeForce RTX 3060';
		product4.image =
			'https://www.asrock.com/Graphics-Card/photo/Radeon%20RX%207600%20Steel%20Legend%208GB%20OC(M1).png';
		product4.price = 499;
		product4.quantity = 50;
		product4.category = cat1;
		await AppDataSource.manager.save(product4);

		const product5 = new Product();
		product5.name = 'ASUS ROG Strix GeForce RTX 3060';
		product5.description = 'ASUS ROG Strix GeForce RTX 3060';
		product5.image =
			'https://m.media-amazon.com/images/I/81gBKaOGz9L._AC_UF1000,1000_QL80_.jpg';
		product5.price = 599;
		product5.quantity = 50;
		product5.category = cat1;
		await AppDataSource.manager.save(product5);

		const product6 = new Product();
		(product6.name = 'ASUS TUF GAMING B550-PLUS'),
			(product6.description = 'ASUS TUF GAMING B550-PLUS');
		product6.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/68/67/LD0005686754_1.jpg';
		product6.price = 149;
		product6.quantity = 1;
		product6.category = cat2;
		await AppDataSource.manager.save(product6);

		const product7 = new Product();
		product7.name = 'ASUS ROG Strix B550-F Gaming';
		product7.description = 'ASUS ROG Strix B550-F Gaming';
		product7.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/91/26/LD0005912641_1.jpg';
		product7.price = 199;
		product7.quantity = 0;
		product7.category = cat2;
		await AppDataSource.manager.save(product7);

		const product8 = new Product();
		product8.name = 'ASUS ROG Strix B550-E Gaming';
		product8.description = 'ASUS ROG Strix B550-E Gaming';
		product8.image =
			'https://rog.asus.com/websites/global/products/fkufhp8oogo9exki/img/kv/pd.png';
		product8.price = 249;
		product8.quantity = 50;
		product8.category = cat2;
		await AppDataSource.manager.save(product8);

		const product9 = new Product();
		product9.name = 'ASUS ROG Strix B550-XE Gaming';
		product9.description = 'ASUS ROG Strix B550-XE Gaming';
		product9.image =
			'https://media.ldlc.com/r1600/ld/products/00/05/75/20/LD0005752029_1.jpg';
		product9.price = 299;
		product9.quantity = 50;
		product9.category = cat2;
		await AppDataSource.manager.save(product9);

		const product10 = new Product();
		product10.name = 'AMD Ryzen 5 5600X';
		product10.description = 'AMD Ryzen 5 5600X';
		product10.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product10.price = 299;
		product10.quantity = 50;
		product10.category = cat3;
		await AppDataSource.manager.save(product10);

		const product11 = new Product();
		product11.name = 'AMD Ryzen 7 5800X';
		product11.description = 'AMD Ryzen 7 5800X';
		product11.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product11.price = 449;
		product11.quantity = 50;
		product11.category = cat3;
		await AppDataSource.manager.save(product11);

		const product12 = new Product();
		product12.name = 'AMD Ryzen 9 5900X';
		product12.description = 'AMD Ryzen 9 5900X';
		product12.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product12.price = 549;
		product12.quantity = 50;
		product12.category = cat3;
		await AppDataSource.manager.save(product12);

		const product13 = new Product();
		product13.name = 'AMD Ryzen 9 5950X';
		product13.description = 'AMD Ryzen 9 5950X';
		product13.image = 'https://m.media-amazon.com/images/I/51GUexhiieL.jpg';
		product13.price = 799;
		product13.quantity = 50;
		product13.category = cat3;

		await AppDataSource.manager.save(product13);

		const product14 = new Product();
		product14.name = 'G.Skill Trident Z Neo 32GB';
		product14.description = 'G.Skill Trident Z Neo 32GB';
		product14.image = 'https://m.media-amazon.com/images/I/71w2mY6QwSL.jpg';
		product14.price = 199;
		product14.quantity = 0;
		product14.category = cat4;
		await AppDataSource.manager.save(product14);

		const product15 = new Product();
		product15.name = 'G.Skill Trident Z Neo 64GB';
		product15.description = 'G.Skill Trident Z Neo 64GB';
		product15.image = 'https://m.media-amazon.com/images/I/71w2mY6QwSL.jpg';
		product15.price = 399;
		product15.quantity = 50;
		product15.category = cat4;
		await AppDataSource.manager.save(product15);

		const product16 = new Product();
		product16.name = 'Corsair Vengeance LPX 32GB';
		product16.description = 'Corsair Vengeance LPX 32GB';
		product16.image =
			'https://www.1fodiscount.com/ressources/site/img/product/kit-barrettes-memoire-32go-2x16go-dimm-ddr4-corsair-vengeance-lpx-pc4-25600-3200-mhz-noir_141304__480.webp';
		product16.price = 199;
		product16.quantity = 50;
		product16.category = cat4;
		await AppDataSource.manager.save(product16);

		const product17 = new Product();
		product17.name = 'Corsair Vengeance LPX 64GB';
		product17.description = 'Corsair Vengeance LPX 64GB';
		product17.image = 'https://m.media-amazon.com/images/I/71w2mY6QwSL.jpg';
		product17.price = 399;
		product17.quantity = 50;
		product17.category = cat4;
		await AppDataSource.manager.save(product17);

		const products = await AppDataSource.manager.find(Product);
		console.log('Loaded products: ', products);

		// ============== PRODUCTS SUB CATEGORIES ==============
		console.log('Loading products sub categories from the database...');
		const productSubCategory1 = new ProductSubCategory();
		productSubCategory1.product = product1;
		productSubCategory1.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategory1);

		const productSubCategory2 = new ProductSubCategory();
		productSubCategory2.product = product2;
		productSubCategory2.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategory2);

		const productSubCategory3 = new ProductSubCategory();
		productSubCategory3.product = product3;
		productSubCategory3.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategory3);

		const productSubCategory4 = new ProductSubCategory();
		productSubCategory4.product = product4;
		productSubCategory4.subCategory = sub_cat1;
		await AppDataSource.manager.save(productSubCategory4);

		const productSubCategory5 = new ProductSubCategory();
		productSubCategory5.product = product5;
		productSubCategory5.subCategory = sub_cat1;
		await AppDataSource.manager.save(productSubCategory5);

		const productSubCategoryCM1 = new ProductSubCategory();
		productSubCategoryCM1.product = product6;
		productSubCategoryCM1.subCategory = sub_cat1;
		await AppDataSource.manager.save(productSubCategoryCM1);

		const productSubCategoryCM2 = new ProductSubCategory();
		productSubCategoryCM2.product = product6;
		productSubCategoryCM2.subCategory = sub_cat11;
		await AppDataSource.manager.save(productSubCategoryCM2);

		const productSubCategoryCM3 = new ProductSubCategory();
		productSubCategoryCM3.product = product7;
		productSubCategoryCM3.subCategory = sub_cat1;
		await AppDataSource.manager.save(productSubCategoryCM3);

		const productSubCategoryCM4 = new ProductSubCategory();
		productSubCategoryCM4.product = product7;
		productSubCategoryCM4.subCategory = sub_cat12;
		await AppDataSource.manager.save(productSubCategoryCM4);

		const productSubCategory8 = new ProductSubCategory();
		productSubCategory8.product = product8;
		productSubCategory8.subCategory = sub_cat1;
		await AppDataSource.manager.save(productSubCategory8);

		const productSubCategory9 = new ProductSubCategory();
		productSubCategory9.product = product9;
		productSubCategory9.subCategory = sub_cat1;
		await AppDataSource.manager.save(productSubCategory9);

		const productSubCategoryPROC1 = new ProductSubCategory();
		productSubCategoryPROC1.product = product10;
		productSubCategoryPROC1.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategoryPROC1);

		const productSubCategoryPROC2 = new ProductSubCategory();
		productSubCategoryPROC2.product = product10;
		productSubCategoryPROC2.subCategory = sub_cat12;
		await AppDataSource.manager.save(productSubCategoryPROC2);

		const productSubCategoryPROC3 = new ProductSubCategory();
		productSubCategoryPROC3.product = product11;
		productSubCategoryPROC3.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategoryPROC3);

		const productSubCategoryPROC4 = new ProductSubCategory();
		productSubCategoryPROC4.product = product11;
		productSubCategoryPROC4.subCategory = sub_cat11;
		await AppDataSource.manager.save(productSubCategoryPROC4);

		const productSubCategory12 = new ProductSubCategory();
		productSubCategory12.product = product12;
		productSubCategory12.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategory12);

		const productSubCategory13 = new ProductSubCategory();
		productSubCategory13.product = product13;
		productSubCategory13.subCategory = sub_cat4;
		await AppDataSource.manager.save(productSubCategory13);

		const productSubCategoryRAM1 = new ProductSubCategory();
		productSubCategoryRAM1.product = product14;
		productSubCategoryRAM1.subCategory = sub_cat5;
		await AppDataSource.manager.save(productSubCategoryRAM1);

		const productSubCategoryRAM2 = new ProductSubCategory();
		productSubCategoryRAM2.product = product14;
		productSubCategoryRAM2.subCategory = sub_cat8;
		await AppDataSource.manager.save(productSubCategoryRAM2);

		const productSubCategoryRAM3 = new ProductSubCategory();
		productSubCategoryRAM3.product = product15;
		productSubCategoryRAM3.subCategory = sub_cat5;
		await AppDataSource.manager.save(productSubCategoryRAM3);

		const productSubCategoryRAM4 = new ProductSubCategory();
		productSubCategoryRAM4.product = product15;
		productSubCategoryRAM4.subCategory = sub_cat7;
		await AppDataSource.manager.save(productSubCategoryRAM4);

		const productSubCategory16 = new ProductSubCategory();
		productSubCategory16.product = product16;
		productSubCategory16.subCategory = sub_cat5;
		await AppDataSource.manager.save(productSubCategory16);

		const productSubCategory17 = new ProductSubCategory();
		productSubCategory17.product = product17;
		productSubCategory17.subCategory = sub_cat6;
		await AppDataSource.manager.save(productSubCategory17);


		const productSubCategory19 = new ProductSubCategory();
		productSubCategory19.product = product2;
		productSubCategory19.subCategory = sub_cat13;
		await AppDataSource.manager.save(productSubCategory19);

		const productSubCategory20 = new ProductSubCategory();
		productSubCategory20.product = product1;
		productSubCategory20.subCategory = sub_cat13;
		await AppDataSource.manager.save(productSubCategory20);

		const productSubCategory21 = new ProductSubCategory();
		productSubCategory21.product = product4;
		productSubCategory21.subCategory = sub_cat14;
		await AppDataSource.manager.save(productSubCategory21);

		const productSubCategory22 = new ProductSubCategory();
		productSubCategory22.product = product7;
		productSubCategory22.subCategory = sub_cat15;
		await AppDataSource.manager.save(productSubCategory22);

		const productSubCategory23 = new ProductSubCategory();
		productSubCategory23.product = product8;
		productSubCategory23.subCategory = sub_cat16;
		await AppDataSource.manager.save(productSubCategory23);

		const productSubCategory24 = new ProductSubCategory();
		productSubCategory24.product = product9;
		productSubCategory24.subCategory = sub_cat16;
		await AppDataSource.manager.save(productSubCategory24);

		const productSubCategory25 = new ProductSubCategory();
		productSubCategory25.product = product9;
		productSubCategory25.subCategory = sub_cat55;
		await AppDataSource.manager.save(productSubCategory25);

		const productSubCategory26 = new ProductSubCategory();
		productSubCategory26.product = product6;
		productSubCategory26.subCategory = sub_cat55;
		await AppDataSource.manager.save(productSubCategory26);

		const productSubCategory27 = new ProductSubCategory();
		productSubCategory27.product = product7;
		productSubCategory27.subCategory = sub_cat66;
		await AppDataSource.manager.save(productSubCategory27);


		const productSubCategories = await AppDataSource.manager.find(
			ProductSubCategory
		);
		console.log('Loaded products sub categories: ', productSubCategories);

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
