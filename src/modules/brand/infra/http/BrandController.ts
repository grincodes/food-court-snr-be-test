import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { BrandService } from "../../application/BrandService";
import { CreateBrandDto } from "../../dto/CreateBrandDto";

@Controller("v1/brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get("/")
  async getAllPaginatedBrands(@Query() data: any) {
    const res = await this.brandService.getAllPaginatedBrand(
      data.size,
      data.page
    );
    return res;
  }

  @Get("/:id")
  async getBrand(@Param("id") id: string) {
    const res = await this.brandService.getBrandById(BigInt(id));
    return res;
  }

  @Post("/")
  async createBrand(@Body() dto: CreateBrandDto) {
    const res = await this.brandService.createBrand(dto);
    return res;
  }

  @Put("/:id")
  async patchBrand(
    @Param("id") id: string,
    @Body() dto: Partial<CreateBrandDto>
  ) {
    const res = await this.brandService.updateBrand(BigInt(id), dto);
    return res;
  }

  @Delete("/:id")
  async deleteBrand(@Param("id") id: string) {
    const res = await this.brandService.deleteBrand(BigInt(id));
    return res;
  }
}
