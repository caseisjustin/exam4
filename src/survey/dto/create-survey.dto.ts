import { IsString, IsDate, IsEnum } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['active', 'inactive', 'draft'])
  status: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
