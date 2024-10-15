import type {PageProps} from "@/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import OrderItem from "./_part/order-item";

// import {enrichLineItems} from "@/data/medusa/line-items";
// import {retrieveOrder} from "@/data/medusa/order";
// import {notFound} from "next/navigation";

export default async function OrderConfirmedPage({params}: PageProps<"id">) {
  console.log(params);
  // const order = await retrieveOrder(params.id);

  // if (!order) {
  //   return notFound();
  // }

  // const enrichedItems = await enrichLineItems(order.items, order.region_id!);

  // const enrichedOrder = {
  //   ...order,
  //   items: enrichedItems,
  // };

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-2xl px-s py-2xl lg:px-0 lg:py-8xl">
      <div className="flex flex-col gap-xs">
        <Heading
          className="mb-lg"
          desktopSize="2xl"
          font="serif"
          mobileSize="lg"
          tag="h1"
        >
          Thank you! Your order was placed successfully
        </Heading>

        <Body className="font-medium" desktopSize="xl" font="sans">
          We have sent the order confirmation details to john@doe.com
        </Body>

        <Body desktopSize="base" font="sans">
          Order date: Mon Sep 30 2024
        </Body>
        <Body desktopSize="base" font="sans">
          Order number: 1234
        </Body>
      </div>
      <div className="flex flex-col gap-s">
        <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h2">
          Summary
        </Heading>
        <div className="flex flex-col gap-s">
          <OrderItem
            price="100"
            quantity="2 x 200"
            title="Two chip chocolate chip cookie"
            variant="4-Pack"
          />
          <Separator />
          <SubLineItem title="Subtotal" value="$20.00" />
          <SubLineItem title="Taxes" value="$0.00" />
          <SubLineItem title="Shipping Address" value="$4.00" />
          <Separator />
          <div className="flex justify-between">
            <Heading desktopSize="base" font="sans" mobileSize="sm" tag="h4">
              Total
            </Heading>
            <Heading desktopSize="base" font="sans" mobileSize="sm" tag="h4">
              $200
            </Heading>
          </div>
          <Separator />
        </div>
      </div>
      <div className="flex flex-col gap-s">
        <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h2">
          Delivery
        </Heading>
        <div className="flex flex-col gap-xl lg:flex-row lg:gap-s">
          <div className="flex flex-1 flex-col gap-[6px]">
            <Body
              className="mb-[6px] font-semibold"
              desktopSize="base"
              font="sans"
            >
              Shipping Address
            </Body>
            <Body className="font-medium" desktopSize="base" font="sans">
              John Doe
            </Body>
            <Body className="font-medium" desktopSize="base" font="sans">
              Some Street 16
            </Body>
            <Body className="font-medium" desktopSize="base" font="sans">
              00000, London
            </Body>
          </div>
          <div className="flex flex-1 flex-col gap-[6px]">
            <Body
              className="mb-[6px] font-semibold"
              desktopSize="base"
              font="sans"
            >
              Contact
            </Body>
            <Body className="font-medium" desktopSize="base" font="sans">
              john@doe.com
            </Body>
          </div>

          <div className="flex flex-1 flex-col gap-[6px]">
            <Body
              className="mb-[6px] font-semibold"
              desktopSize="base"
              font="sans"
            >
              Method
            </Body>
            <Body className="font-medium" desktopSize="base" font="sans">
              FakeEx Standard ($8,00)
            </Body>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-px w-full bg-accent" />;
}

function SubLineItem({title, value}: {title: string; value: string}) {
  return (
    <div className="flex items-center justify-between gap-xl">
      <Body className="mb-[6px] font-semibold" desktopSize="base" font="sans">
        {title}
      </Body>
      <Body className="mb-[6px] font-semibold" desktopSize="base" font="sans">
        {value}
      </Body>
    </div>
  );
}
