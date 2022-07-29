import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestExceptionFilter } from 'src/schema/ExceptionFilter';
import { createItemDto as IItem } from '../schema/item.create.dto';
import { dateFilterDto as IDateFilter } from '../schema/date.filter.dto';
import { Item } from '../entity/item.entity';
import { ItemService } from '../services/item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(@Query() query: object): Promise<Item[] | object> {
    return this.itemService.findAll(query);
  }

  @Get('/balance')
  async getBalance(): Promise<Item[] | object> {
    return this.itemService.getBalance();
  }

  @Get('/:id')
  @UseFilters(new BadRequestExceptionFilter())
  async getItemById(@Res() res: Response, @Param() { id }: { id: string }) {
    const item = await this.itemService.findById(id);
    return res.status(HttpStatus.ACCEPTED).json(item);
  }

  @Get('filterByDate/:dateInit/to/:dateEnd')
  @UseFilters(new BadRequestExceptionFilter())
  async getByDate(
    @Res() res: Response,
    @Param() { dateInit, dateEnd }: IDateFilter,
    @Query() query: object,
  ) {
    const items = await this.itemService.filterByDate({
      dateInit,
      dateEnd,
      options: query,
    });
    return res.status(HttpStatus.ACCEPTED).json(items);
  }

  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  async createItem(@Res() res: Response, @Body() data: IItem) {
    const item: IItem = await this.itemService.createItem(data);
    return res.status(HttpStatus.CREATED).json(item);
  }

  @Put('/:id')
  @UseFilters(new BadRequestExceptionFilter())
  async updateItemById(
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

  @Delete('/:id')
  @UseFilters(new BadRequestExceptionFilter())
  async deleteItemById(@Res() res: Response, @Param() { id }: { id: string }) {
    await this.itemService.deleteItemById(id);
    return res.status(HttpStatus.NO_CONTENT).json({});
  }
}
