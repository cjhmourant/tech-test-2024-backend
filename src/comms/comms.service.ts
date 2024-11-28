import { Injectable } from '@nestjs/common';
import { Cat, UserDatabaseService } from '../data/userData.service';

@Injectable()
export class CommsService {
  private readonly pouchSizeToPriceMap = new Map([
    ['A', 55.5],
    ['B', 59.5],
    ['C', 62.75],
    ['D', 66.0],
    ['E', 69.0],
    ['F', 71.25],
  ]);

  constructor(private readonly jsonDbService: UserDatabaseService) {}

  async getYourNextDelivery(id: string) {
    const user = await this.jsonDbService.findById(id);

    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }
    if (!user.cats || user.cats.length === 0) {
      throw new Error('User record has empty or undefined cats array');
    }

    const activeCats = this.getCatsWithActiveSubscription(user.cats);
    const templatedCatNames = this.getTemplatedCatNames(activeCats);
    const pouchesPriceTotal = this.getPouchesPriceTotal(activeCats);

    return {
      title: `Your next delivery for ${templatedCatNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${templatedCatNames}'s fresh food.`,
      totalPrice: pouchesPriceTotal,
      freeGift: pouchesPriceTotal > 120,
    };
  }

  private getCatsWithActiveSubscription(cats: Cat[]) {
    return cats.filter(({ subscriptionActive }) => subscriptionActive);
  }

  private getTemplatedCatNames(cats: Cat[]) {
    if (cats.length === 1) return cats.at(0)?.name;
    if (cats.length === 2) return `${cats.at(0)?.name} and ${cats.at(1)?.name}`;
    const catNames = cats
      .map(({ name }) => name)
      .slice(0, -2)
      .join(', ');
    return catNames.concat(`, ${cats.at(-2)?.name} and ${cats.at(-1)?.name}`);
  }

  private getPouchesPriceTotal(cats: Cat[]) {
    return cats.reduce((total, cat) => {
      const pouchPrice = this.pouchSizeToPriceMap.get(cat.pouchSize);
      if (!pouchPrice) {
        throw new Error(`Cat has invalid pouch size ${cat.pouchSize}`);
      } else {
        return total + pouchPrice;
      }
    }, 0);
  }
}
