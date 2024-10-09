import { IsString } from 'class-validator';

export class UpdateRequestDto {
  @IsString()
  state: string;

  @IsString()
  request_id: string;
}
