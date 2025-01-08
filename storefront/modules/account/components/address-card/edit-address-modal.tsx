"use client";

import type {HttpTypes} from "@medusajs/types";

import {Cta} from "@/components/shared/button";
import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import useToggleState from "@/hooks/use-toggle-state";
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@/lib/data/customer";
import CountrySelect from "@/modules/checkout/components/country-select";
import {SubmitButton} from "@/modules/checkout/components/submit-button";
import Modal from "@/modules/common/components/modal";
import {clx} from "@medusajs/ui";
import React, {useActionState, useEffect, useState} from "react";

type EditAddressProps = {
  address: HttpTypes.StoreCustomerAddress;
  isActive?: boolean;
  region: HttpTypes.StoreRegion;
};

const EditAddress: React.FC<EditAddressProps> = ({
  address,
  isActive = false,
  region,
}) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const {close: closeModal, open, state} = useToggleState(false);

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    addressId: address.id,
    error: null,
    success: false,
  });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  const removeAddress = async () => {
    setRemoving(true);
    await deleteCustomerAddress(address.id);
    setRemoving(false);
  };

  return (
    <>
      <div
        className={clx(
          "flex h-full min-h-[220px] w-full flex-col justify-between rounded-xl border border-accent-40 p-5 transition-colors",
          {
            "border-secondary": isActive,
          },
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading
            className="text-base-semi text-left"
            data-testid="address-name"
            desktopSize="base"
            font="sans"
            tag="h6"
          >
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Body
              className="txt-compact-small text-ui-fg-base"
              data-testid="address-company"
              font="sans"
              mobileSize="sm"
            >
              {address.company}
            </Body>
          )}
          <Body
            className="text-base-regular mt-2 flex flex-col text-left"
            font="sans"
            mobileSize="sm"
          >
            <Body data-testid="address-address" font="sans" mobileSize="sm">
              {address.address_1}
              {address.address_2 && (
                <Body font="sans" mobileSize="sm">
                  , {address.address_2}
                </Body>
              )}
            </Body>
            <Body data-testid="address-postal-city" font="sans" mobileSize="sm">
              {address.postal_code}, {address.city}
            </Body>
            <Body
              data-testid="address-province-country"
              font="sans"
              mobileSize="sm"
            >
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </Body>
          </Body>
        </div>
        <div className="mt-4 flex items-center gap-x-2">
          <Cta
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            data-testid="address-delete-button"
            loading={removing}
            onClick={removeAddress}
            size="sm"
            variant="outline"
          >
            {/* TODO: Add icon... */}
            {/* {removing ? <Spinner /> : <Trash />} */}
            Supprimer
          </Cta>
          <Cta
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            data-testid="address-edit-button"
            onClick={open}
            size="sm"
          >
            Modifier
          </Cta>
        </div>
      </div>

      <Modal close={close} data-testid="edit-address-modal" isOpen={state}>
        <Modal.Title>
          <Heading className="mb-2" desktopSize="2xl" mobileSize="lg" tag="h1">
            Modifier l&apos;adresse
          </Heading>
        </Modal.Title>
        <form action={formAction}>
          <input name="addressId" type="hidden" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  defaultValue={address.first_name || undefined}
                  name="first_name"
                  placeholder="First name"
                  required
                />
                <Input
                  autoComplete="family-name"
                  data-testid="last-name-input"
                  defaultValue={address.last_name || undefined}
                  name="last_name"
                  placeholder="Last name"
                  required
                />
              </div>
              <Input
                autoComplete="organization"
                data-testid="company-input"
                defaultValue={address.company || undefined}
                name="company"
                placeholder="Entreprise"
              />
              <Input
                autoComplete="address-line1"
                data-testid="address-1-input"
                defaultValue={address.address_1 || undefined}
                name="address_1"
                placeholder="Adresse"
                required
              />
              <Input
                autoComplete="address-line2"
                data-testid="address-2-input"
                defaultValue={address.address_2 || undefined}
                name="address_2"
                placeholder="Appartement, suite, etc."
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                  defaultValue={address.postal_code || undefined}
                  name="postal_code"
                  placeholder="Code postal"
                  required
                />
                <Input
                  autoComplete="locality"
                  data-testid="city-input"
                  defaultValue={address.city || undefined}
                  name="city"
                  placeholder="Ville"
                  required
                />
              </div>
              <Input
                autoComplete="address-level1"
                data-testid="state-input"
                defaultValue={address.province || undefined}
                name="province"
                placeholder="Province"
              />
              <CountrySelect
                autoComplete="country"
                data-testid="country-select"
                defaultValue={address.country_code || undefined}
                name="country_code"
                region={region}
                required
              />
              <Input
                autoComplete="phone"
                data-testid="phone-input"
                defaultValue={address.phone || undefined}
                name="phone"
                placeholder="Téléphone"
              />
            </div>
            {formState.error && (
              <div className="text-small-regular py-2 text-rose-500">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-6 flex gap-3">
              <Cta
                data-testid="cancel-button"
                onClick={close}
                size="md"
                type="reset"
                variant="outline"
              >
                Annuler
              </Cta>
              <SubmitButton data-testid="save-button" size="md">
                Sauvegarder
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditAddress;
