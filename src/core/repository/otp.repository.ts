import { Repository } from 'typeorm';
import { OtpEntity } from '../entity/otp.entity';

export type OtpRepository = Repository<OtpEntity>;
