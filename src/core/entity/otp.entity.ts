import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('otp')
export class OtpEntity extends BaseEntity {
  @Column({ type: 'int', name: 'otp_code', nullable: true })
  otp_code: number;

  @Column({ type: 'varchar', name: 'email', nullable: true })
  email: string

  @Column({ type: 'timestamptz', name: 'expired_at', nullable: true })
  expired_at: Date
}
