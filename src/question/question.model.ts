import { Table, Column, Model, DataType, Default, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Survey } from '../survey/survey.model';

@Table
export class Question extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Survey)
  @Column(DataType.UUID)
  surveyId: string;

  @Column
  questionText: string;

  @Column(DataType.ENUM('multiple_choice', 'single_choice', 'open_ended'))
  type: string;

  @Column(DataType.ARRAY(DataType.STRING))
  options: string[];

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
