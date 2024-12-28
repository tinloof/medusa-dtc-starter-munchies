import { ProductDTO } from "@medusajs/framework/types";
import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import ProductsList from "./components/products-list";
import { title } from "./components/style";

export default function Welcome({ products }: { products: ProductDTO[] }) {
  return (
    <Layout preview="Welcome to Muattar Store!">
      <Section className="w-full px-5 my-20" align="left">
        <Img
          src="https://muattar-store.vercel.app/images/logo.svg"
          className="rounded-lg mb-8 w-full max-w-[560px]"
        />
        <Heading className="pb-3" style={title}>
          Get Ready for a Touch of Elegance! ✨
        </Heading>
        <EmailBody
          paragraphs={[
            "Welcome to the Muattar Store family – your ultimate destination for luxurious and artistic crochet outfits! We’re thrilled to have you here and can’t wait to elevate your wardrobe with our meticulously handcrafted designs.",
            "What’s Special at Muattar Store?",
            ". Elegance in Every Stitch: Each piece is a work of art, crafted with love and precision to add charm and sophistication to your style",
            ". Exclusive Designs: Be the first to explore our limited-edition collections and seasonal favorites.",
            ". Style Rewards: Join our community to enjoy perks and stay updated on the latest trends.",
            "Let’s make your crochet fashion dreams come true!",
          ]}
          signature
        />
        <ProductsList products={products} />
      </Section>
    </Layout>
  );
}
