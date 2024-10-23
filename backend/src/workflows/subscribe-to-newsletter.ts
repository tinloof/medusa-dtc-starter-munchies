import { CreateCustomerDTO, MetadataType } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { emitEventStep } from "@medusajs/medusa/core-flows";

const subscribeCustomerToNewsletter = createStep(
  "subscribe-customer-to-newsletter",
  async (input: CreateCustomerDTO, { container }) => {
    const customerModuleService = container.resolve(Modules.CUSTOMER);

    let customer = await customerModuleService
      .listCustomers({ email: input.email }, { select: ["id", "metadata"] })
      .then((customers) => (customers.length > 0 ? customers[0] : null));

    const metadata: MetadataType = { newsletter: true };

    type NewsletterStepResponse = {
      id: string;
      compensate: "updated" | "created" | "nothing";
    };

    let response: NewsletterStepResponse;

    if (!customer) {
      customer = await customerModuleService.createCustomers({
        ...input,
        metadata: {
          ...input.metadata,
          ...metadata,
        },
      });

      response = {
        id: customer.id,
        compensate: "created",
      };
    } else if (customer.metadata?.newsletter) {
      response = {
        id: customer.id,
        compensate: "nothing",
      };
    } else {
      await customerModuleService.updateCustomers(customer.id, {
        metadata: { ...customer.metadata, ...metadata },
      });

      response = {
        id: customer.id,
        compensate: "updated",
      };
    }

    return new StepResponse(response);
  },
  async (input, { container }) => {
    const customerModuleService = container.resolve(Modules.CUSTOMER);

    if (input.compensate === "nothing") {
      return;
    }

    if (input.compensate === "created") {
      await customerModuleService.deleteCustomers(input.id);

      return;
    }

    if (input.compensate === "updated") {
      const customer = await customerModuleService.retrieveCustomer(input.id);

      await customerModuleService.updateCustomers(input.id, {
        metadata: {
          ...customer.metadata,
          newsletter: false,
        },
      });
    }
  },
);

export type WorkflowInput = CreateCustomerDTO;

const subscribeToNewsletterWorkflow = createWorkflow(
  "subscribe-to-newsletter",
  function (input: WorkflowInput) {
    const medusaCustomerResponse = subscribeCustomerToNewsletter(input);

    if (medusaCustomerResponse.compensate !== "nothing") {
      emitEventStep({
        eventName:
          medusaCustomerResponse.compensate === "created"
            ? "customer.created"
            : "customer.updated",
        data: {
          id: medusaCustomerResponse.id,
        },
      });
    }

    return new WorkflowResponse(medusaCustomerResponse.id);
  },
);

export default subscribeToNewsletterWorkflow;
