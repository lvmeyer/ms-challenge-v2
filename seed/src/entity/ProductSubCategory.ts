import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './SubCategory';
import { Product } from './Product';

@Entity()
export class ProductSubCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => SubCategory)
    subCategory: SubCategory;
}
