"use client";

import {resetOnboardingState} from "@/lib/data/onboarding";
import {Button, Container, Text} from "@medusajs/ui";

const OnboardingCta = ({orderId}: {orderId: string}) => {
  return (
    <Container className="bg-ui-bg-subtle h-full w-full max-w-4xl">
      <div className="center flex flex-col gap-y-4 p-4 md:items-center">
        <Text className="text-ui-fg-base text-xl">
          Your test order was successfully created! 🎉
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          You can now complete setting up your store in the admin.
        </Text>
        <Button
          className="w-fit"
          onClick={() => resetOnboardingState(orderId)}
          size="xlarge"
        >
          Complete setup in admin
        </Button>
      </div>
    </Container>
  );
};

export default OnboardingCta;
