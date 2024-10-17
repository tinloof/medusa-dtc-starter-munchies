import medusa from "./client";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export async function getCustomer() {
  return await medusa.store.customer
    .retrieve({}, {...getCacheHeaders("customers"), ...getAuthHeaders()})
    .then(({customer}) => customer)
    .catch(() => null);
}
