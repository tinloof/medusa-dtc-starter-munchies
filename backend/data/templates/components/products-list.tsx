import { Column, Row, Section, Text } from "@react-email/components";
import React from "react";
import { CtaButton } from "./button";
import { BodySmall, TitleSmall } from "./style";

export default function ProductsList() {
  return (
    <Section className="mt-12">
      <Text style={TitleSmall} className="">
        Freshly baked
      </Text>
      <Section className="mb-6 mt-2">
        <Row>
          <Column className=" pr-2 align-top">
            <Section className="w-full">
              {/* <Img
                src={`${baseUrl}/static/emails/product.png`}
                alt="Brand Your"
                className="w-full max-w-[279px]"
              /> */}
              <Section className="w-full h-auto aspect-square bg-accent rounded-lg">
                s
              </Section>
            </Section>
            <Section className="mt-2">
              <Text style={BodySmall} className="mt-2  text-center">
                Two chip chocolate chip
              </Text>
              <Text style={BodySmall} className="mt-1  text-center">
                from $29.00
              </Text>
            </Section>
          </Column>
          <Column className=" pr-2 align-top">
            <Section className="w-full">
              {/* <Img
                src={`${baseUrl}/static/emails/product.png`}
                alt="Brand Your"
                className="w-full max-w-[279px]"
              /> */}
              <Section className="w-full h-auto aspect-square bg-accent rounded-lg">
                s
              </Section>
            </Section>
            <Section className="mt-2">
              <Text style={BodySmall} className="  text-center">
                Two chip chocolate chip
              </Text>
              <Text style={BodySmall} className="pt-1  text-center">
                from $29.00
              </Text>
            </Section>
          </Column>
        </Row>
      </Section>
      <CtaButton href={"/"} label="Shop now" />
    </Section>
  );
}
