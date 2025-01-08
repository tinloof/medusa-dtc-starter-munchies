import type {Metadata} from "next";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {retrieveCustomer} from "@/lib/data/customer";
import {getRegion} from "@/lib/data/regions";
import AddressBook from "@/modules/account/components/address-book";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
  description: "Consultez vos adresses",
  title: "Adresses",
};

export default async function Addresses(props: {
  params: Promise<{countryCode: string}>;
}) {
  const params = await props.params;
  const {countryCode} = params;
  const customer = await retrieveCustomer();
  const region = await getRegion(countryCode);

  if (!customer || !region) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <Heading className="text-2xl-semi" tag="h1">
          Addresses de Livraison
        </Heading>
        <Body className="text-base-regular" desktopSize="lg" font="sans">
          Consultez et mettez à jour vos adresses de livraison. Vous avez la
          possibilité d&apos;en ajouter autant que nécessaire. Une fois
          enregistrées, ces adresses seront accessibles lors du processus de
          paiement.
        </Body>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  );
}
