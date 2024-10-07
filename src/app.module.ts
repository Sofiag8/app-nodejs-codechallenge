import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        process.env.NODE_ENV === 'test'
          ? 'localhost'
          : process.env.DATABASE_HOST || 'postgres',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'postgres',
      entities: [Transaction],
      synchronize: true,
    }),
    TransactionModule,
  ],
})
export class AppModule {}
