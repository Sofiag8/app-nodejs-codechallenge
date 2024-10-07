import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionExternalId: string;

  @Column()
  accountExternalIdDebit: string;

  @Column()
  accountExternalIdCredit: string;

  @Column()
  transferTypeId: number;

  @Column()
  value: number;

  @Column()
  transactionStatus: string;

  @CreateDateColumn()
  createdAt: Date;
}
