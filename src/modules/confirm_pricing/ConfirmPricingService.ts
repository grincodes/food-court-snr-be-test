import { Injectable } from "@nestjs/common";
import { MealService } from "../meal/application/MealService";
import { AddonService } from "../addon/application/AddonService";
import { handleErrorCatch } from "src/libs/common/helpers/utils";

interface PayloadIds {
  mealIds: bigint[];
  addonIds: bigint[];
}

interface FetchPrice {
  id;
  amount;
}

interface Prices {
  mealPrices: FetchPrice[];
  addonPrices: FetchPrice[];
}

@Injectable()
export class ConfirmPricingService {
  constructor(
    private mealService: MealService,
    private addonService: AddonService
  ) {}

  extractIdsFromPayload(meals: Record<string, any>[]): PayloadIds {
    try {
      const mealIds = [];
      const addonIds = [];

      meals.forEach((item) => {
        mealIds.push(BigInt(item.id)); // Add meal ID to the mealIds array
        item.addons.forEach((addon) => {
          addonIds.push(BigInt(addon.id)); // Add addon IDs to the addonIds array
        });
      });

      return {
        mealIds,
        addonIds,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async fetchPrices(dto: PayloadIds) {
    try {
      let mealPrices;
      let addonPrices;

      mealPrices = dto.mealIds.length
        ? await this.mealService.getPriceFromIds(dto.mealIds)
        : [];
      addonPrices = dto.addonIds.length
        ? await this.addonService.getPriceFromIds(dto.addonIds)
        : [];

      return {
        mealPrices,
        addonPrices,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async compareAndGenerateReport(
    meals: Record<string, any>[],
    fetchedPrices: Prices
  ) {
    try {
      const mealsWithDifferentPrices = [];
      const addonsWithDifferentPrices = [];

      const mealsNotFound = [];
      const addonsNotFound = [];

      if (meals.length && !fetchedPrices.mealPrices.length) {
        // meals not found
        mealsNotFound.push(...meals);
      }

      if (meals.length && fetchedPrices.mealPrices.length) {
        meals.forEach((meal) => {
          //not found cases

          const mealPrice = fetchedPrices.mealPrices.find(
            (price) => price.id == meal.id
          );

          if (!mealPrice) {
            mealsNotFound.push(meal);
          }

          if (mealPrice && mealPrice.amount !== meal.amount) {
            mealsWithDifferentPrices.push(meal);
          }

          if (meal.addons.length && fetchedPrices.addonPrices.length) {
            meal.addons.forEach((addon) => {
              const addonPrice = fetchedPrices.addonPrices.find(
                (price) => price.id == addon.id
              );

              if (!addonPrice) {
                addonsNotFound.push(addon);
              }

              if (addonPrice && addonPrice.amount !== addon.amount) {
                addonsWithDifferentPrices.push(addon);
              }
            });
          } else {
            addonsWithDifferentPrices.push(...meal.addons);
          }
        });
      }

      return {
        mealsWithDifferentPrices,
        addonsWithDifferentPrices,
        mealsNotFound,
        addonsNotFound,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async validatePriceFromPayload(meals: Record<string, any>[]) {
    try {
      const payloadIds = this.extractIdsFromPayload(meals);
    
      const prices = await this.fetchPrices(payloadIds);


      const report = this.compareAndGenerateReport(meals, prices);

      return report;
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
