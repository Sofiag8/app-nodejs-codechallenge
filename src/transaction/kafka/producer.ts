import { Injectable } from '@nestjs/common';
import { KafkaClient, Producer } from 'kafka-node';
import { Transaction } from '../transaction.entity';

@Injectable()
export class KafkaProducer {
  private client: KafkaClient;
  private producer: Producer;
  // kafka: service name inside docker network and 29092 internal port for containers communication
  constructor() {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'kafka:29092',
    });
    this.producer = new Producer(this.client);
  }

  async sendTransaction(transaction: Transaction) {
    const payloads = [
      { topic: 'transactions', messages: JSON.stringify(transaction) },
    ];
    this.producer.send(payloads, (err, data) => {
      if (err) {
        console.error('Error sending transaction to Kafka:', err);
      } else {
        console.log('Transaction sent to Kafka:', data);
      }
    });
  }
}
