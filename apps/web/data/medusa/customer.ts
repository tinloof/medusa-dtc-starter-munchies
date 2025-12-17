import { cache } from "react";

import medusa from "./client";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

export const getCustomer = cache(
	async () =>
		await medusa.store.customer
			.retrieve(
				{},
				{
					...(await getCacheHeaders("customers")),
					...(await getAuthHeaders()),
				},
			)
			.then(({ customer }) => customer)
			.catch(() => null),
);
