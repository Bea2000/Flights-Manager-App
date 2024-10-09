import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './User';
import Flight from './Flight';

@Table({
  timestamps: true,
  tableName: 'Tickets',
  modelName: 'Tickets',
})
class Ticket extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Flight)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare flightId: number;

  @BelongsTo(() => Flight)
  declare flight: Flight;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;
}

export default Ticket;
