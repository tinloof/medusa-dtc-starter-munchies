import type {Metadata} from "next";

import LoginTemplate from "@/modules/account/templates/login-template";

export const metadata: Metadata = {
  description:
    "Connectez-vous à votre compte Lakikabio pour accéder à vos commandes, gérer vos informations et bien plus encore.",
  keywords: "Lakikabio, Connexion, Accès au compte, Identifiez-vous",
  title: "Connexion",
};

export default function Login() {
  return <LoginTemplate />;
}
