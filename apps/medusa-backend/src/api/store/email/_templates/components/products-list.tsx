import type { ProductDTO } from "@medusajs/framework/types";
import { Column, Img, Row, Section, Text } from "@react-email/components";
import { CtaButton } from "./button";
import { bodySmall, titleSmall } from "./style";

export default function ProductsList({ products }: { products: ProductDTO[] }) {
  return (
    <Section className="mt-12">
      <Text className="" style={titleSmall}>
        Freshly baked
      </Text>
      <Section className="mt-2 mb-6">
        <Row>
          {products.map((product) => {
            const thumbnail = product.thumbnail || product.images?.[0]?.url;

            return (
              <Column
                className="align-top first:pr-2"
                id={product.id}
                key={product.id}
              >
                <Section className="w-full">
                  {thumbnail ? (
                    <Img
                      alt="Brand Your"
                      className="aspect-square h-auto w-full max-w-[279px] rounded-lg"
                      src={thumbnail}
                    />
                  ) : null}
                </Section>
                <Section className="mt-2">
                  <Text className="mt-2 text-center" style={bodySmall}>
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
