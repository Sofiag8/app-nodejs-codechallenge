import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { KafkaProducer } from './kafka/producer';
import { KafkaConsumer } from './kafka/consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService, KafkaProducer, KafkaConsumer],
})
export class TransactionModule {}
