import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':sessionId')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('sessionId') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('check/:sessionId')
  async checkIfExists(@Param('sessionId') id: string) {
    return (await this.usersService.findOne(id)) !== null;
  }

  @Patch(':sessionId')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('sessionId') id: string, @Body() updateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':sessionId')
  remove(@Param('sessionId') id: string) {
    return this.usersService.remove(id);
  }

  @Get('/recommendations/:sessionId')
  async getRecommendations(@Param('sessionId') id: string) {
    return this.usersService.findRecommendations(id);
  }
}
