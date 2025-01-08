"use client";

import type {HttpTypes} from "@medusajs/types";

import {Cta} from "@/components/shared/button";
import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import useToggleState from "@/hooks/use-toggle-state";
import {addCustomerAddress} from "@/lib/data/customer";
import CountrySelect from "@/modules/checkout/components/country-select";
import {SubmitButton} from "@/modules/checkout/components/submit-button";
import Modal from "@/modules/common/components/modal";
import {PlusIcon} from "lucide-react";
import {useActionState, useEffect, useState} from "react";

const AddAddress = ({
  addresses,
  region,
}: {
  addresses: HttpTypes.StoreCustomerAddress[];
  region: HttpTypes.StoreRegion;
}) => {
  const [successState, setSuccessState] = useState(false);
  const {close: closeModal, open, state} = useToggleState(false);

  const [formState, formAction] = useActionState(addCustomerAddress, {
    error: null,
    isDefaultShipping: addresses.length === 0,
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

  return (
    <>
      <button
        className="border-ui-border-base flex h-full min-h-[220px] w-full flex-col justify-between rounded-xl border border-accent p-5"
        data-testid="add-address-button"
        onClick={open}
      >
        <Body className="text-base-semi" desktopSize="xl" font="sans">
          Nouvelle adresse
        </Body>
        <PlusIcon className="size-10" />
      </button>

      <Modal close={close} data-testid="add-address-modal" isOpen={state}>
        <Modal.Title>
          <Heading className="mb-4" desktopSize="2xl" mobileSize="lg" tag="h2">
            Ajouter une adresse
          </Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  name="first_name"
                  placeholder="Prénom"
                  required
                />
                <Input
                  autoComplete="family-name"
                  data-testid="last-name-input"
                  name="last_name"
                  placeholder="Nom"
                  required
                />
              </div>
              <Input
                autoComplete="organization"
                data-testid="company-input"
                name="company"
                placeholder="Entreprise"
              />
              <Input
                autoComplete="address-line1"
                data-testid="address-1-input"
                name="address_1"
                placeholder="Adresse"
                required
              />
              <Input
                autoComplete="address-line2"
                data-testid="address-2-input"
                name="address_2"
                placeholder="Appartement, suite, etc."
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                  name="postal_code"
                  placeholder="Code postal"
                  required
                />
                <Input
                  autoComplete="locality"
                  data-testid="city-input"
                  name="city"
                  placeholder="Ville"
                  required
                />
              </div>
              <Input
                autoComplete="address-level1"
                data-testid="state-input"
                name="province"
                placeholder="Province"
              />
              <CountrySelect
                autoComplete="country"
                data-testid="country-select"
                name="country_code"
                region={region}
                required
              />
              <Input
                autoComplete="phone"
                data-testid="phone-input"
                name="phone"
                placeholder="Téléphone"
              />
            </div>
            {formState.error && (
              <div
                className="text-small-regular py-2 text-rose-500"
                data-testid="address-error"
              >
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

export default AddAddress;
