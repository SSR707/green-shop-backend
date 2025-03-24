import { Repository } from 'typeorm';
import { CartEntity } from '../entity';

export type CartRepository = Repository<CartEntity>;
