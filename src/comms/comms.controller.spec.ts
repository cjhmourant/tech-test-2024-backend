import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { CommsController } from './comms.controller';
import { UserDatabaseService } from '../data/userData.service';

describe('CommsController', () => {
  let commsController: CommsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [CommsService, UserDatabaseService],
    }).compile();

    commsController = app.get<CommsController>(CommsController);
  });

  describe('getYourNextDelivery endpoint', () => {
    it('should return correctly for a customer with two active cats', async () => {
      expect(
        await commsController.getYourNextDelivery(
          'ff535484-6880-4653-b06e-89983ecf4ed5',
        ),
      ).toStrictEqual({
        title: 'Your next delivery for Dorian and Ocie',
        message:
          "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
        totalPrice: 134,
        freeGift: true,
      });
    });
  });
});
