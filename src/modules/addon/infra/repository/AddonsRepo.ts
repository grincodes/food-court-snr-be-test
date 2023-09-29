import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Addons } from "../entity/AddonsEntity";

export class AddonsRepo extends AbstractRepo<Addons> {
  async getPriceFromIds(ids: any[]) {
    const res = await Addons.query().select("id", "amount").whereIn("id", ids);
    return res;
  }
}
