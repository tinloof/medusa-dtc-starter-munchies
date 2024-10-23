import { ProductDTO } from "@medusajs/framework/types";
import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import ProductsList from "./components/products-list";
import { title } from "./components/style";

export default function Welcome({ products }: { products: ProductDTO[] }) {
  return (
    <Layout preview="Welcome to Munchies!">
      <Section className="w-full px-5 my-20" align="left">
        <Img
          src="https://cdn.sanity.io/images/1wtf7iqx/production/0ebbdf446bb2d4e4287c722fb82fe385d13d6dea-2400x1260.png"
          className="rounded-lg mb-8 w-full max-w-[560px]"
        />
        <Heading className="pb-3" style={title}>
          Get ready for some sweet! 🍪
        </Heading>
        <EmailBody
          paragraphs={[
            "Welcome to the Munchies family – your new go-to spot for the most delicious, freshly baked cookies!  We’re thrilled to have you here and can’t wait to satisfy your sweet tooth with our mouthwatering treats.",
            "What’s Baking at Munchies?",
            ". Freshly Baked Goodness: All our cookies are made fresh, with love, using the finest ingredients.",
            ". Exclusive Offers: Be the first to know about our seasonal specials and flash cookie sales",
            ". Cookie Lover Perks: Sign up for rewards, and get cookies on your birthday!",
            "Let’s make your cookie dreams come true!",
          ]}
          signature
        />
        <ProductsList products={products} />
      </Section>
    </Layout>
  );
}
