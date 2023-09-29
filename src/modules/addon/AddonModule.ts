import { Logger, Module } from "@nestjs/common";
import { InjectionToken } from "./injectionToken";
import { AddonsRepo } from "./infra/repository/AddonsRepo";
import { Addons } from "./infra/entity/AddonsEntity";
import { AddonController } from "./infra/http/AddonController";
import { AddonService } from "./application/AddonService";

const infrastructure = [
  {
    provide: InjectionToken.ADD_ON_REPO,
    useFactory: () => {
      return new AddonsRepo(Addons);
    },
  },
];

@Module({
  controllers: [AddonController],
  providers: [Logger, ...infrastructure, AddonService],
  exports:[AddonService]
})
export class AddonModule {}
