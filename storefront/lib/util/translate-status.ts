import type {FulfillmentStatus, PaymentStatus} from "@medusajs/types";

const paymentStatusTranslations: Record<PaymentStatus, string> = {
  authorized: "Autorisé",
  awaiting: "En attente",
  canceled: "Annulé",
  captured: "Capturé",
  not_paid: "Non payé",
  partially_authorized: "Partiellement autorisé",
  partially_captured: "Partiellement capturé",
  partially_refunded: "Partiellement remboursé",
  refunded: "Remboursé",
  requires_action: "Action requise",
};

const fulfillmentStatusTranslations: Record<FulfillmentStatus, string> = {
  canceled: "Annulé",
  delivered: "Livré",
  fulfilled: "Traité",
  not_fulfilled: "Non traité",
  partially_delivered: "Partiellement livré",
  partially_fulfilled: "Partiellement traité",
  partially_shipped: "Partiellement expédié",
  shipped: "Expédié",
};

export const translatePaymentStatus = (status: PaymentStatus): string => {
  return paymentStatusTranslations[status] || "Inconnu";
};

export const translateFulfillmentStatus = (
  status: FulfillmentStatus,
): string => {
  return fulfillmentStatusTranslations[status] || "Inconnu";
};
