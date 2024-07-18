import { IsUUID, IsInt } from 'class-validator';

export class CreateResultDto {
  @IsUUID()
  surveyId: string;

  @IsUUID()
  userId: string;

  @IsInt()
  score: number;
}
