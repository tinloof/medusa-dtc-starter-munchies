import { cache } from "react";

import medusa from "./client";

export const getCustomer = cache(
  async () =>
    await medusa.store.customer
      .retrieve()
      .then(({ customer }) => customer)
      .catch(() => null)
);
