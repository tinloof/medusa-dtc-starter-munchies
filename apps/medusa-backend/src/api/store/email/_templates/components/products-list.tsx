import { ProductDTO } from "@medusajs/framework/types";
import { Column, Img, Row, Section, Text } from "@react-email/components";
import { CtaButton } from "./button";
import { bodySmall, titleSmall } from "./style";

export default function ProductsList({ products }: { products: ProductDTO[] }) {
  return (
    <Section className="mt-12">
      <Text style={titleSmall} className="">
        Freshly baked
      </Text>
      <Section className="mb-6 mt-2">
        <Row>
          {products.map((product) => {
            const thumbnail = product.thumbnail || product.images?.[0]?.url;

            return (
              <Column id={product.id} className="first:pr-2 align-top">
                <Section className="w-full">
                  {thumbnail && (
                    <Img
                      src={thumbnail}
                      alt="Brand Your"
                      className="w-full max-w-[279px] h-auto aspect-square rounded-lg"
                    />
                  )}
                </Section>
                <Section className="mt-2">
                  <Text style={bodySmall} className="mt-2 text-center">
                    {product.title}
                  </Text>
                </Section>
              </Column>
            );
          })}
        </Row>
      </Section>
      <CtaButton href="https://munchies-tinloof.vercel.app" label="Shop now" />
    </Section>
  );
}
