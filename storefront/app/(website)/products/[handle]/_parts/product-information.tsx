import type {StoreProduct} from "@medusajs/types";

import Accordion from "@/components/shared/accordion";
import Body from "@/components/shared/body";
import {Cta} from "@/components/shared/button";
import Heading from "@/components/shared/heading";
import Select from "@/components/shared/select";

import Addons from "./addons";

type Props = Pick<StoreProduct, "title">;

export default function ProductInformation({title}: Props) {
  const items = [
    {
      content:
        "Introducing our Two Chip Chocolate Chip Cookie – a delicious twist on a timeless classic! This soft, chewy cookie is packed with both semi-sweet and milk chocolate chips, creating the perfect balance of rich and creamy chocolate in every bite. Made with real butter, pure vanilla, and a touch of brown sugar, it’s the ultimate treat for chocolate lovers who want the best of both worlds. One bite, and you’ll see why this double-chocolate delight is a crowd favorite!",
      id: "1",
      title: "Description",
    },
    {
      content:
        "If you are not satisfied with your purchase, you can return it within 30 days of the purchase date.",
      id: "2",
      title: "Ingredients",
    },
    {
      content:
        "Introducing our Two Chip Chocolate Chip Cookie – a delicious twist on a timeless classic! This soft, chewy cookie is packed with both semi-sweet and milk chocolate chips, creating the perfect balance of rich and creamy chocolate in every bite. Made with real butter, pure vanilla, and a touch of brown sugar, it’s the ultimate treat for chocolate lovers who want the best of both worlds. One bite, and you’ll see why this double-chocolate delight is a crowd favorite!",
      id: "3",
      title: "Shipping",
    },
  ];
  return (
    <div className="lg:y-s flex w-full max-w-[580px] flex-col gap-lg px-m pb-2xl pt-s">
      <Body className="-mb-1" desktopSize="base" font="sans" mobileSize="sm">
        Home / Our cookies / Two chip chocolate chip cookie
      </Body>
      <Heading desktopSize="5xl" mobileSize="2xl" tag="h1">
        {title}
      </Heading>
      <Body desktopSize="xl" font="sans" mobileSize="lg">
        from $20.00
      </Body>
      <Body desktopSize="lg" font="sans" mobileSize="base">
        Introducing our Two Chip Chocolate Chip Cookie – a delicious twist on a
        timeless classic! This soft, chewy cookie is packed with both semi-sweet
        and milk chocolate chips, creating the perfect balance of rich and
        creamy chocolate in every bite.
      </Body>
      <div className="mt-s flex flex-col gap-s">
        <Select />
        <Cta className="w-full" size="xl" variant="outline">
          Add to cart
        </Cta>
      </div>
      <Addons />
      <Accordion items={items} />
    </div>
  );
}
