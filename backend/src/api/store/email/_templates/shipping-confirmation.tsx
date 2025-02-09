import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import { title } from "./components/style";

export default function ShippingConfirmation() {
  return (
    <Layout preview="Votre commande a été expédiée!">
      <Section className="w-full max-w-[565px] mb-16 px-5" align="left">
        <Img
          className="max-w-[291px]"
          src="null___https://cdn.sanity.io/images/1wtf7iqx/production/e04b80a29759293982d74afcde82a169505a3aaa-1166x112.png"
        />
        <Heading className="mb-3 mt-16" style={title}>
          Votre commande est en route!
        </Heading>
        <EmailBody
          paragraphs={[
            "Bonne nouvelle! Votre commande [Numéro de commande] a été expédiée et est en chemin vers vous.",
            "Si vous avez des questions concernant votre livraison, n'hésitez pas à nous contacter à [Courriel du service client] ou au [Numéro de téléphone du service client]. Il nous fera plaisir de vous aider!",
            "Nous espérons que vous êtes aussi enthousiaste que nous à l'idée de recevoir votre achat. Merci d'avoir magasiné chez Lakikabio !",
          ]}
          signature
        />
      </Section>
    </Layout>
  );
}
