import medusa from "./client";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export async function getCustomer() {
  return await medusa.store.customer
    .retrieve(
      {},
      {...(await getCacheHeaders("customers")), ...(await getAuthHeaders())},
    )
    .then(({customer}) => customer)
    .catch(() => null);
}
