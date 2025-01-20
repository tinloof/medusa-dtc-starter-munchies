"use client";

import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {createTransferRequest} from "@/lib/data/orders";
import {SubmitButton} from "@/modules/checkout/components/submit-button";
import {IconButton} from "@medusajs/ui";
import {CheckCircle2Icon, CircleXIcon} from "lucide-react";
import {useActionState, useEffect, useState} from "react";

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, formAction] = useActionState(createTransferRequest, {
    error: null,
    order: null,
    success: false,
  });

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true);
    }
  }, [state.success, state.order]);

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="grid w-full items-center gap-x-8 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Heading desktopSize="base" font="sans" mobileSize="lg" tag="h3">
            Transfert de commande
          </Heading>
          <Body className="text-base-regular" font="sans" mobileSize="sm">
            Vous ne trouvez pas la commande que vous cherchez ?
            <br /> Connectez une commande à votre compte.
          </Body>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end"
        >
          <div className="flex w-full flex-col gap-y-2">
            <Input
              className="w-full"
              name="order_id"
              placeholder="ID de commande"
            />
            <SubmitButton
              className="w-fit self-end whitespace-nowrap"
              size="sm"
              variant="outline"
            >
              Demander un transfert
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Body
          className="text-base-regular text-right text-rose-500"
          font="sans"
        >
          {state.error}
        </Body>
      )}
      {showSuccess && (
        <div className="shadow-borders-base flex w-full items-center justify-between self-stretch rounded-xl border border-accent bg-accent-40 p-4 shadow">
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <CheckCircle2Icon className="size-10 text-accent" />
            <div className="flex flex-col gap-y-1">
              <Body className="text-medium-pl" font="sans">
                Transfert pour la commande {state.order?.id} demandé
              </Body>
              <Body className="text-base-regular" font="sans">
                Courriel de demande de transfert envoyé à {state.order?.email}
              </Body>
            </div>
          </div>
          <IconButton
            className="h-fit"
            onClick={() => setShowSuccess(false)}
            variant="transparent"
          >
            <CircleXIcon className="size-6" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
