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
import { AddonService } from "../../application/AddonService";
import { CreateAddonDto } from "../../dto/CreateAddonDto";

@Controller("v1/add-on")
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Get("/")
  async getAllPaginatedAddons(@Query() data: any) {
    const res = await this.addonService.getAllPaginatedAddons(
      data.size,
      data.page
    );
    return res;
  }

  @Get("/:id")
  async getAddon(@Param("id") id: string) {
    const res = await this.addonService.getAddonById(BigInt(id));
    return res;
  }

  @Post("/")
  async createAddon(@Body() dto: CreateAddonDto) {
    const res = await this.addonService.createAddOn(dto);
    return res;
  }

  @Put("/:id")
  async patchAddon(
    @Param("id") id: string,
    @Body() dto: Partial<CreateAddonDto>
  ) {
    const res = await this.addonService.updateAddOn(BigInt(id), dto);
    return res;
  }

  @Delete("/:id")
  async deleteBrand(@Param("id") id: string) {
    const res = await this.addonService.deleteAddon(BigInt(id));
    return res;
  }
}
