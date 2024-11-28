import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service';

export type YourNextDeliveryResponse = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:id')
  async getYourNextDelivery(
    @Param('id') id: string,
  ): Promise<YourNextDeliveryResponse> {
    return await this.commsService.getYourNextDelivery(id);
  }
}
