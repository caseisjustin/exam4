import { IsString, IsEnum, IsArray } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  surveyId: string;

  @IsString()
  questionText: string;

  @IsEnum(['multiple_choice', 'single_choice', 'open_ended'])
  type: string;

  @IsArray()
  options: string[];
}
