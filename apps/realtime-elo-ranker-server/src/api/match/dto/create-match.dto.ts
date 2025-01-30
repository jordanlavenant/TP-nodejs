import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  readonly winner: string;

  @IsNotEmpty()
  @IsInt()
  readonly loser: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly draw: boolean;
}
