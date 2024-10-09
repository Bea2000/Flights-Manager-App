import { IsString, IsBoolean } from 'class-validator';

export class ValidateTransactionDto {
  @IsBoolean()
  valid: boolean;

  @IsString()
  request_id: string;
}
