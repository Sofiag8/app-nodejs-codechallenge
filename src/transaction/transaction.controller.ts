import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() transactionData: Partial<Transaction>) {
    return this.transactionService.create(transactionData);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
