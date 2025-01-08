"use server";

import type {HttpTypes} from "@medusajs/types";

import {sdk} from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";

import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  setAuthToken,
} from "./cookies";

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const headers = {
      ...(await getAuthHeaders()),
    };

    const next = {
      ...(await getCacheOptions("customers")),
    };

    return await sdk.client
      .fetch<{customer: HttpTypes.StoreCustomer}>(`/store/customers/me`, {
        cache: "force-cache",
        headers,
        method: "GET",
        next,
        query: {
          fields: "*orders",
        },
      })
      .then(({customer}) => customer)
      .catch(() => null);
  };

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({customer}) => customer)
    .catch(medusaError);

  const cacheTag = await getCacheTag("customers");
  revalidateTag(cacheTag);

  return updateRes;
};

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  };

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    });

    await setAuthToken(token as string);

    const headers = {
      ...(await getAuthHeaders()),
    };

    const {customer: createdCustomer} = await sdk.store.customer.create(
      customerForm,
      {},
      headers,
    );

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    });

    await setAuthToken(loginToken as string);

    const customerCacheTag = await getCacheTag("customers");
    revalidateTag(customerCacheTag);

    await transferCart();

    return createdCustomer;
  } catch (error: any) {
    if (error?.status === 401) {
      return "Un problème est survenu lors de la création de votre compte. Veuillez réessayer plus tard.";
    } else {
      return "Une erreur s'est produite. Veuillez réessayer plus tard.";
    }
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await sdk.auth
      .login("customer", "emailpass", {email, password})
      .then(async (token) => {
        await setAuthToken(token as string);
        const customerCacheTag = await getCacheTag("customers");
        revalidateTag(customerCacheTag);
      });
  } catch (error: any) {
    if (error?.status === 401) {
      return "Email ou mot de passe incorrect";
    } else {
      return "Une erreur s'est produite. Veuillez réessayer plus tard.";
    }
  }

  try {
    await transferCart();
  } catch (error: any) {
    return `Erreur lors du transfert du panier: ${error.toString()}`;
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout();
  removeAuthToken();
  revalidateTag("auth");
  revalidateTag("customer");
  redirect(`/${countryCode}/account`);
}

export async function transferCart() {
  const cartId = await getCartId();

  if (!cartId) {
    return;
  }

  const headers = await getAuthHeaders();

  await sdk.store.cart.transferCart(cartId, {}, headers);

  revalidateTag("cart");
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData,
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false;
  const isDefaultShipping =
    (currentState.isDefaultShipping as boolean) || false;

  const address = {
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    company: formData.get("company") as string,
    country_code: formData.get("country_code") as string,
    first_name: formData.get("first_name") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
  };

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({customer}) => {
      const customerCacheTag = await getCacheTag("customers");
      revalidateTag(customerCacheTag);
      return {error: null, success: true};
    })
    .catch((err) => {
      return {error: err.toString(), success: false};
    });
};

export const deleteCustomerAddress = async (
  addressId: string,
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers");
      revalidateTag(customerCacheTag);
      return {error: null, success: true};
    })
    .catch((err) => {
      return {error: err.toString(), success: false};
    });
};

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData,
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string);

  if (!addressId) {
    return {error: "Address ID is required", success: false};
  }

  const address = {
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    company: formData.get("company") as string,
    country_code: formData.get("country_code") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
  } as HttpTypes.StoreUpdateCustomerAddress;

  const phone = formData.get("phone") as string;

  if (phone) {
    address.phone = phone;
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers");
      revalidateTag(customerCacheTag);
      return {error: null, success: true};
    })
    .catch((err) => {
      return {error: err.toString(), success: false};
    });
};
