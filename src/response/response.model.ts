import { Table, Column, Model, DataType, Default, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Survey } from '../survey/survey.model';
import { Question } from '../question/question.model';
import { User } from '../user/user.model';

@Table
export class Response extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Survey)
  @Column(DataType.UUID)
  surveyId: string;

  @ForeignKey(() => Question)
  @Column(DataType.UUID)
  questionId: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @Column(DataType.TEXT)
  answer: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
