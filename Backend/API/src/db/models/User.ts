import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Request from './Request';

@Table({
  timestamps: true,
  tableName: 'Users',
  modelName: 'Users',
})
class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare sessionId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'not set',
  })
  declare recommendationsDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'not set',
  })
  declare recommendationsId: string;

  @HasMany(() => Request)
  declare requests: Request[];
}

export default User;
