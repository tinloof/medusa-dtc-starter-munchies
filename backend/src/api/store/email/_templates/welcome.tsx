import { ProductDTO } from "@medusajs/framework/types";
import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import ProductsList from "./components/products-list";
import { title } from "./components/style";

export default function Welcome({ products }: { products: ProductDTO[] }) {
  return (
    <Layout preview="Bienvenue dans l'univers africain !">
      <Section className="w-full px-5 my-20" align="left">
        <Img
          src="null___https://cdn.sanity.io/images/1wtf7iqx/production/0ebbdf446bb2d4e4287c722fb82fe385d13d6dea-2400x1260.png"
          className="rounded-lg mb-8 w-full max-w-[560px]"
        />
        <Heading className="pb-3" style={title}>
          Découvrez les saveurs authentiques d'Afrique !
        </Heading>
        <EmailBody
          paragraphs={[
            "Merci de rejoindre notre communauté ! Chez Lakika, nous sommes fiers de vous faire découvrir l’authenticité et la richesse des traditions ouest-africaines à travers des produits uniques.",
            "Ce qui vous attend chez Lakika :",
            ". Produits d’exception : Explorez des épices rares, légumineuses nutritives, huiles végétales précieuses et bien plus encore.",
            ". Offres exclusives : Accédez à des promotions uniques et soyez les premiers informés de nos nouveautés.",
            ". Un voyage culturel : Plongez dans l’histoire et les traditions culinaires du Mali et de toute l’Afrique de l’Ouest.",
          ]}
          signature
        />
        <ProductsList products={products} />
      </Section>
    </Layout>
  );
}
