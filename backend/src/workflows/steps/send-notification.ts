import { CreateNotificationDTO } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const sendNotificationStep = createStep(
  "send-notification",
  async (data: CreateNotificationDTO[], { container }) => {
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);

    const notification = await notificationModuleService.createNotifications(data);

    return new StepResponse(notification);
  }
);
