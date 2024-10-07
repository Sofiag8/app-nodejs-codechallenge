import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { KafkaProducer } from './kafka/producer';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private kafkaProducer: KafkaProducer,
  ) {}

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      ...transactionData,
      transactionStatus: 'pending',
    });

    await this.transactionRepository.save(transaction);

    await this.kafkaProducer.sendTransaction(transaction);

    return transaction;
  }

  async findOne(transactionExternalId: string): Promise<Transaction> {
    return this.transactionRepository.findOne({
      where: { transactionExternalId },
    });
  }

  async update(transaction: Transaction): Promise<void> {
    await this.transactionRepository.save(transaction);
  }
}
