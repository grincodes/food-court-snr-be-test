import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectionToken } from "../injectionToken";
import { AddonsRepo } from "../infra/repository/AddonsRepo";
import { CreateAddonDto } from "../dto/CreateAddonDto";
import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { Addon } from "../domain/Addon";
import { AddonMap } from "../mappers/AddonMapper";

@Injectable()
export class AddonService {
  @Inject(InjectionToken.ADD_ON_REPO)
  private readonly addonsRepo: AddonsRepo;

  async createAddOn(dto: CreateAddonDto) {
    try {
      const exists = await this.addonsRepo.exists({ name: dto.name });

      if (exists) {
        throw new ConflictException("Addon  already exists");
      }

      const addOnOrError = Addon.create(dto);

      if (addOnOrError.isFailure) {
        throw new BadRequestException(addOnOrError.errorValue());
      }

      const addOn = addOnOrError.getValue();

      const data = AddonMap.toPersistence(addOn);

      const res = await this.addonsRepo.save(data);

      return {
        id: res.id,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAddonById(id: bigint) {
    try {
      const res = await this.addonsRepo.findById(id);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedAddons(pageSize: number, currentPage: number) {
    try {
      const res = await this.addonsRepo.findPaginated(pageSize, currentPage);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async updateAddOn(id: bigint, dto: Partial<CreateAddonDto>) {
    try {
      const res = await this.addonsRepo.updateById(id, dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteAddon(id: bigint) {
    try {
      const res = await this.addonsRepo.deleteById(id);
      return {
        status: !!res,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getPriceFromIds(ids: bigint[]) {
    try {
      const res = await this.addonsRepo.getPriceFromIds(ids);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
