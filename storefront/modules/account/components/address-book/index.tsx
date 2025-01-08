import type {HttpTypes} from "@medusajs/types";

import React from "react";

import AddAddress from "../address-card/add-address";
import EditAddress from "../address-card/edit-address-modal";

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer;
  region: HttpTypes.StoreRegion;
};

const AddressBook: React.FC<AddressBookProps> = ({customer, region}) => {
  const {addresses} = customer;

  return (
    <div className="w-full">
      <div className="mt-4 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <AddAddress addresses={addresses} region={region} />
        {addresses.map((address) => {
          return (
            <EditAddress address={address} key={address.id} region={region} />
          );
        })}
      </div>
    </div>
  );
};

export default AddressBook;
