import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import {
  CreateRequestDto,
  CreateGroupRequestDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRecommendationsDto } from './dto/create-recommendations.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('/recommendations')
  getRecommendationsStatus() {
    return this.requestsService.getRecommendationsStatus();
  }

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Post('/groups')
  createGroup(@Body() createRequestDto: CreateGroupRequestDto) {
    return this.requestsService.createGroup(createRequestDto);
  }

  @Get('/ip')
  getIp() {
    return this.requestsService.getIp();
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }
  @Put()
  update_state(@Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update_state(updateRequestDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }

  @Post('/recommendations/:id')
  createRecommendations(
    @Body() createRecommendationsDto: CreateRecommendationsDto,
    @Param('id') id: string,
  ) {
    return this.requestsService.createRecommendations(
      createRecommendationsDto,
      id,
    );
  }

  @Get('/recommendations/:id')
  getRecommendationStatus(@Param('id') id: string) {
    return this.requestsService.getRecommendationStatus(id);
  }
}
