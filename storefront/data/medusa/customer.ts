import {cache} from "react";

import client from "./client";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export const getCustomer = cache(async function () {
  return await client.store.customer
    .retrieve({}, {...getCacheHeaders("customers"), ...getAuthHeaders()})
    .then(({customer}) => customer)
    .catch(() => null);
});
