"use client";

import type {HttpTypes} from "@medusajs/types";

import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import {addCustomerAddress, updateCustomerAddress} from "@/lib/data/customer";
import NativeSelect from "@/modules/common/components/native-select";
import React, {useActionState, useEffect, useMemo} from "react";

import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
  regions: HttpTypes.StoreRegion[];
};

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            label: country.display_name,
            value: country.iso_2,
          }));
        })
        .flat() || []
    );
  }, [regions]);

  const [successState, setSuccessState] = React.useState(false);

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing,
  );

  const initialState: Record<string, any> = {
    error: false,
    isDefaultBilling: true,
    isDefaultShipping: false,
    success: false,
  };

  if (billingAddress) {
    initialState.addressId = billingAddress.id;
  }

  const [state, formAction] = useActionState(
    billingAddress ? updateCustomerAddress : addCustomerAddress,
    initialState,
  );

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return "Aucune adresse de facturation.";
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.country_code,
      )?.label || billingAddress.country_code?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <Body font="sans">
          {billingAddress.first_name} {billingAddress.last_name}
        </Body>
        <Body font="sans">{billingAddress.company}</Body>
        <Body font="sans">
          {billingAddress.address_1}
          {billingAddress.address_2 ? `, ${billingAddress.address_2}` : ""}
        </Body>
        <Body font="sans">
          {billingAddress.postal_code}, {billingAddress.city}
        </Body>
        <Body font="sans">{country}</Body>
      </div>
    );
  }, [billingAddress, regionOptions]);

  return (
    <form action={formAction} className="w-full" onReset={() => clearState()}>
      <input name="addressId" type="hidden" value={billingAddress?.id} />
      <AccountInfo
        clearState={clearState}
        currentInfo={currentInfo}
        data-testid="account-billing-address-editor"
        isError={!!state.error}
        isSuccess={successState}
        label="Adresse de facturation"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              data-testid="billing-first-name-input"
              defaultValue={billingAddress?.first_name || undefined}
              name="first_name"
              placeholder="Prénom"
              required
            />
            <Input
              data-testid="billing-last-name-input"
              defaultValue={billingAddress?.last_name || undefined}
              name="last_name"
              placeholder="Nom"
              required
            />
          </div>
          <Input
            data-testid="billing-company-input"
            defaultValue={billingAddress?.company || undefined}
            name="company"
            placeholder="Entreprise"
          />
          <Input
            data-testid="billing-address-1-input"
            defaultValue={billingAddress?.address_1 || undefined}
            name="address_1"
            placeholder="Adresse"
            required
          />
          <Input
            data-testid="billing-address-2-input"
            defaultValue={billingAddress?.address_2 || undefined}
            name="address_2"
            placeholder="Appartement, suite, etc."
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              data-testid="billing-postcal-code-input"
              defaultValue={billingAddress?.postal_code || undefined}
              name="postal_code"
              placeholder="Code postal"
              required
            />
            <Input
              data-testid="billing-city-input"
              defaultValue={billingAddress?.city || undefined}
              name="city"
              placeholder="Ville"
              required
            />
          </div>
          <Input
            data-testid="billing-province-input"
            defaultValue={billingAddress?.province || undefined}
            name="province"
            placeholder="Province"
          />
          <NativeSelect
            data-testid="billing-country-code-select"
            defaultValue={billingAddress?.country_code || undefined}
            name="country_code"
            required
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value}>
                  {option?.label}
                </option>
              );
            })}
          </NativeSelect>
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileBillingAddress;
