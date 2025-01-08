"use client";

import type {HttpTypes} from "@medusajs/types";

import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import {toast} from "@medusajs/ui";
import React from "react";

import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfilePassword: React.FC<MyInformationProps> = ({customer}) => {
  const [successState, setSuccessState] = React.useState(false);

  // TODO: Add support for password updates
  const updatePassword = async () => {
    toast.info("Cette fonctionnalité n'est pas encore disponible.");
  };

  const clearState = () => {
    setSuccessState(false);
  };

  return (
    <form
      action={updatePassword}
      className="w-full"
      onReset={() => clearState()}
    >
      <AccountInfo
        clearState={clearState}
        currentInfo={
          <Body font="sans">
            Le mot de passe n&apos;est pas affiché pour des raisons de sécurité.
          </Body>
        }
        data-testid="account-password-editor"
        errorMessage={undefined}
        isError={false}
        isSuccess={successState}
        label="Mot de passe"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            data-testid="old-password-input"
            name="old_password"
            placeholder="Ancien mot de passe"
            required
            type="password"
          />
          <Input
            data-testid="new-password-input"
            name="new_password"
            placeholder="Nouveau mot de passe"
            required
            type="password"
          />
          <Input
            data-testid="confirm-password-input"
            name="confirm_password"
            placeholder="Confirmez le mot de passe"
            required
            type="password"
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfilePassword;
