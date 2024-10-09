import { Injectable } from '@nestjs/common';
import sequelize from '../db/config';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await sequelize.models.Users.findOne({
        where: { sessionId: createUserDto.sessionId },
      });
      if (user) {
        return 'User already exists';
      }
      return sequelize.models.Users.create({
        email: createUserDto.email,
        username: createUserDto.username,
        sessionId: createUserDto.sessionId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return await sequelize.models.Users.findAll();
  }

  async findOne(id: string) {
    return await sequelize.models.Users.findOne({ where: { sessionId: id } });
  }

  update(id: string, updateUserDto) {
    return sequelize.models.Users.update(updateUserDto, {
      where: {
        sessionId: id,
      },
    });
  }

  remove(id: string) {
    return sequelize.models.Users.destroy({
      where: {
        sessionId: id,
      },
    });
  }

  async findRecommendations(sessionId: string) {
    return await sequelize.models.Users.findOne({
      where: { sessionId: sessionId },
      attributes: ['recommendationsId', 'recommendationsDate'],
    });
  }
}
