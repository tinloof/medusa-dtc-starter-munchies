import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import UnderlineLink from "@/modules/common/components/interactive-link";
import React from "react";

import {AccountNav} from "../components/account-nav";

interface AccountLayoutProps {
  children: React.ReactNode;
  customer: HttpTypes.StoreCustomer | null;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({children, customer}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="container mx-auto flex h-full max-w-5xl flex-1 flex-col">
        <div className="grid grid-cols-1 py-12 small:grid-cols-[240px_1fr]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col items-end justify-between gap-8 border-accent-40 py-12 small:flex-row small:border-t">
          <div>
            <Heading className="text-xl-semi mb-4" desktopSize="xl" tag="h3">
              Des questions ?
            </Heading>
            <Body className="txt-medium" desktopSize="lg" font="sans">
              Vous pouvez trouver des questions fréquemment posées et des
              réponses sur notre page FAQs.
            </Body>
          </div>
          <div>
            <UnderlineLink href="/faqs">FAQs</UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
