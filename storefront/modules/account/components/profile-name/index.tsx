"use client";

import type {HttpTypes} from "@medusajs/types";

import Input from "@/components/shared/input";
import {updateCustomer} from "@/lib/data/customer";
import React, {useActionState, useEffect} from "react";

import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfileName: React.FC<MyInformationProps> = ({customer}) => {
  const [successState, setSuccessState] = React.useState(false);

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData,
  ) => {
    const customer = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    };

    try {
      await updateCustomer(customer);
      return {error: null, success: true};
    } catch (error: any) {
      return {error: error.toString(), success: false};
    }
  };

  const [state, formAction] = useActionState(updateCustomerName, {
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
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        clearState={clearState}
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        data-testid="account-name-editor"
        isError={!!state?.error}
        isSuccess={successState}
        label="Nom"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            data-testid="first-name-input"
            defaultValue={customer.first_name ?? ""}
            name="first_name"
            placeholder="Prénom"
            required
          />
          <Input
            data-testid="last-name-input"
            defaultValue={customer.last_name ?? ""}
            name="last_name"
            placeholder="Nom"
            required
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileName;
