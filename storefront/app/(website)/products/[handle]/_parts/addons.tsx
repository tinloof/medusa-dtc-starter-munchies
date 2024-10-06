import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import Image from "next/image";

export default function Addons() {
  const products = [
    {
      image: "/images/product-01.png",
      name: "Dark Chocolate Chocolate Chip",
      price: "$29.00",
    },
    {
      image: "/images/product-02.png",
      name: "Dark Chocolate Peanut Butter ",
      price: "$29.00",
    },
  ];
  return (
    <div className="flex flex-col gap-xs bg-secondary p-s">
      <Heading desktopSize="lg" mobileSize="base" tag={"h4"}>
        Taste our other flavors too
      </Heading>
      {products.map((product) => (
        <Product key={product.name} {...product} />
      ))}
    </div>
  );
}

function Product({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: string;
}) {
  return (
    <div className="flex w-full gap-xs">
      <Image alt={name} height={100} src={image} width={100} />
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-xs">
          <Body
            className="font-semibold"
            desktopSize="lg"
            font="sans"
            mobileSize="base"
          >
            {name}
          </Body>
          <Body desktopSize="base" font="sans" mobileSize="sm">
            {price}
          </Body>
        </div>
        <Cta className="self-end" size="md" variant="outline">
          Add +
        </Cta>
      </div>
    </div>
  );
}
