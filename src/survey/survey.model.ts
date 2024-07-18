import { Table, Column, Model, DataType, Default, PrimaryKey } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class Survey extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column(DataType.ENUM('active', 'inactive', 'draft'))
  status: string;

  @Column(DataType.DATE)
  startDate: Date;

  @Column(DataType.DATE)
  endDate: Date;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
