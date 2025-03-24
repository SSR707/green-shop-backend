import { Repository } from 'typeorm';
import { CartItemEntity } from '../entity';

export type CartItemRepository = Repository<CartItemEntity>;
