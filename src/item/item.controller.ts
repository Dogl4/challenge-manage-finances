import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestExceptionFilter } from 'src/schema/ExceptionFilter';
import { createItemDto as IItem } from './dto/item.create.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class itemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get('/:id')
  @UseFilters(new BadRequestExceptionFilter())
  async getItemById(@Res() res: Response, @Param() { id }: { id: string }) {
    const item = await this.itemService.findById(id);
    return res.status(HttpStatus.ACCEPTED).json(item);
  }

  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  async createItem(@Res() res: Response, @Body() data: IItem) {
    const item: IItem = await this.itemService.createItem(data);
    return res.status(HttpStatus.CREATED).json(item);
  }

  @Put('/:id')
  @UseFilters(new BadRequestExceptionFilter())
  async upadateItemById(
    @Res() res: Response,
    @Param() { id }: { id: string },
    @Body() data: IItem,
  ) {
    const item = await this.itemService.updateItemById(id, data);
    if (!item) {
      throw new HttpException(
        { message: 'Transation not found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return res.status(HttpStatus.ACCEPTED).json(item);
  }
}
