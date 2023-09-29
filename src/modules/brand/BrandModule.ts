import { Logger, Module } from "@nestjs/common";
import { Brands } from "./infra/entity/BrandsEntity";
import { BrandsRepo } from "./infra/repository/BrandsRepo";
import { InjectionToken } from "./injectionToken";
import { BrandController } from "./infra/http/BrandController";
import { BrandService } from "./application/BrandService";

const infrastructure = [
  {
    provide: InjectionToken.BRANDS_REPO,
    useFactory: () => {
      return new BrandsRepo(Brands);
    },
  },
];

@Module({
  controllers: [BrandController],
  providers: [Logger, ...infrastructure, BrandService],
})
export class BrandModule {}
