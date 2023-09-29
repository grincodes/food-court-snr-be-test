import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectionToken } from "../injectionToken";
import { BrandsRepo } from "../infra/repository/BrandsRepo";
import { CreateBrandDto } from "../dto/CreateBrandDto";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { handleErrorCatch } from "src/libs/common/helpers/utils";

@Injectable()
export class BrandService {
  @Inject(InjectionToken.BRANDS_REPO)
  private readonly brandsRepo: BrandsRepo;

  async createBrand(dto: CreateBrandDto) {
    try {
      const exists = await this.brandsRepo.exists({ name: dto.name });

      if (exists) {
        throw new ConflictException("Brand name already exists");
      }
      const id = new UniqueEntityID();
      dto.id = id.toValue() as bigint;

     
      const res = await this.brandsRepo.save(dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getBrandById(id: bigint) {
    try {
      const brand = await this.brandsRepo.findById(id);
      return brand;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedBrand(pageSize: number, currentPage: number) {
    try {
      const brands = await this.brandsRepo.findPaginated(pageSize, currentPage);
      return brands;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async updateBrand(id: bigint, dto: Partial<CreateBrandDto>) {
    try {
      const res = await this.brandsRepo.updateById(id, dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteBrand(id: bigint) {
    try {
      const res = await this.brandsRepo.deleteById(id);
      return {
        status: !!res
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
