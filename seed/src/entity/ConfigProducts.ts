import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { Config } from './Config';

@Entity()
export class ConfigProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Config)
    config: Config;

    @ManyToOne(() => Product)
    product: Product;
}
