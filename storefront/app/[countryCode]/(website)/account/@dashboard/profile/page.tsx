import type {Metadata} from "next";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {retrieveCustomer} from "@/lib/data/customer";
import {listRegions} from "@/lib/data/regions";
import ProfilePhone from "@/modules/account//components/profile-phone";
import ProfileBillingAddress from "@/modules/account/components/profile-billing-address";
import ProfileEmail from "@/modules/account/components/profile-email";
import ProfileName from "@/modules/account/components/profile-name";
import Divider from "@/modules/common/components/divider";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
  description: "Consultez et modifiez votre profil Lakikabio",
  title: "Profil",
};

export default async function Profile() {
  const customer = await retrieveCustomer();
  const regions = await listRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <Heading className="text-2xl-semi" tag="h1">
          Profil
        </Heading>
        <Body className="text-base-regular" font="sans">
          Consultez et mettez à jour les informations de votre profil, y compris
          votre nom, votre email et votre numéro de téléphone. Vous pouvez
          également mettre à jour votre adresse de facturation ou changer votre
          mot de passe.
        </Body>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}
