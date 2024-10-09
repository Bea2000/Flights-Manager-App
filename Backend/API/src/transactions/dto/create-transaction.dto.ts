import { IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  buy_order: string;

  @IsString()
  session_id: string;

  @IsNumber()
  amount: number;

  @IsString()
  return_url: string;
}
