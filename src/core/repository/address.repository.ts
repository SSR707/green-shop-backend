import { Repository } from 'typeorm';
import { AddressEntity } from '../entity/address.entity';

export type AddressRepository = Repository<AddressEntity>;
