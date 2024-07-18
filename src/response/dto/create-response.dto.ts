import { IsString, IsUUID } from 'class-validator';

export class CreateResponseDto {
  @IsUUID()
  surveyId: string;

  @IsUUID()
  questionId: string;

  @IsUUID()
  userId: string;

  @IsString()
  answer: string;
}
