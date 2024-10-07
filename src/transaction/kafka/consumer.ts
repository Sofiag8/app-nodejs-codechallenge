import { Injectable } from '@nestjs/common';
import { KafkaClient, Consumer } from 'kafka-node';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class KafkaConsumer {
  private client: KafkaClient;
  private consumer: Consumer;

  constructor(private transactionService: TransactionService) {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'kafka:29092',
    });
    this.consumer = new Consumer(
      this.client,
      [{ topic: 'transactions', partition: 0 }],
      { autoCommit: true },
    );

    this.consumer.on('message', async (message) => {
      const transactionData = JSON.parse(
        message.value as string,
      ) as Transaction;

      Logger.log(`Message received from kafka: ${message.value}`);
      if (transactionData.value > 1000) {
        transactionData.transactionStatus = 'rejected';
      } else {
        transactionData.transactionStatus = 'approved';
      }

      await this.transactionService.update(transactionData);
      Logger.log(
        `Transaction ${transactionData.transactionExternalId} updated to ${transactionData.transactionStatus}`,
      );
    });
  }
}
