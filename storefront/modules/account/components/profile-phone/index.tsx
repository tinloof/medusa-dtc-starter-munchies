"use client";

import type {HttpTypes} from "@medusajs/types";

import Input from "@/components/shared/input";
import {updateCustomer} from "@/lib/data/customer";
import React, {useActionState, useEffect} from "react";

import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfileEmail: React.FC<MyInformationProps> = ({customer}) => {
  const [successState, setSuccessState] = React.useState(false);

  const updateCustomerPhone = async (
    _currentState: Record<string, unknown>,
    formData: FormData,
  ) => {
    const customer = {
      phone: formData.get("phone") as string,
    };

    try {
      await updateCustomer(customer);
      return {error: null, success: true};
    } catch (error: any) {
      return {error: error.toString(), success: false};
    }
  };

  const [state, formAction] = useActionState(updateCustomerPhone, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        clearState={clearState}
        currentInfo={`${customer.phone}`}
        data-testid="account-phone-editor"
        errorMessage={state.error}
        isError={!!state.error}
        isSuccess={successState}
        label="Téléphone"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            autoComplete="phone"
            data-testid="phone-input"
            defaultValue={customer.phone ?? ""}
            name="phone"
            placeholder="Téléphone"
            required
            type="phone"
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileEmail;
