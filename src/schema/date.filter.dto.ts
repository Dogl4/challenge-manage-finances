import { IsNotEmpty } from 'class-validator';
import { IsOnlyDate } from './IsOnlyDate';

export class dateFilterDto {
  @IsNotEmpty()
  @IsOnlyDate()
  dateInit: string;

  @IsNotEmpty()
  @IsOnlyDate()
  dateEnd: string;
}
