"use client";

import Input from "@/components/shared/input";
import LocalizedLink from "@/components/shared/localized-link";
import Heading from "@/components/shared/typography/heading";
import {signup} from "@/lib/data/customer";
import {LOGIN_VIEW} from "@/modules/account/templates/login-template";
import ErrorMessage from "@/modules/checkout/components/error-message";
import {SubmitButton} from "@/modules/checkout/components/submit-button";
// import LocalizedLink from "@/modules/common/components/localized-client-link";
import {useActionState} from "react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({setCurrentView}: Props) => {
  const [message, formAction] = useActionState(signup, null);

  return (
    <div
      className="flex max-w-md flex-col items-center"
      data-testid="register-page"
    >
      <Heading
        className="text-large-semi mb-6 uppercase"
        desktopSize="xl"
        mobileSize="base"
        tag="h1"
      >
        Créer un compte
      </Heading>
      <p className="text-base-regular text-ui-fg-base mb-4 text-center">
        Créez votre compte Lakikabio et accédez à une expérience de magasinage
        améliorée.
      </p>
      <form action={formAction} className="flex w-full flex-col">
        <div className="flex w-full flex-col gap-y-2">
          <Input
            autoComplete="given-name"
            data-testid="first-name-input"
            name="first_name"
            placeholder="Prénom"
            required
          />
          <Input
            autoComplete="family-name"
            data-testid="last-name-input"
            name="last_name"
            placeholder="Nom"
            required
          />
          <Input
            autoComplete="email"
            data-testid="email-input"
            name="email"
            placeholder="Email"
            required
            type="email"
          />
          <Input
            autoComplete="tel"
            data-testid="phone-input"
            name="phone"
            placeholder="Téléphone"
            type="tel"
          />
          <Input
            autoComplete="new-password"
            data-testid="password-input"
            name="password"
            placeholder="Mot de passe"
            required
            type="password"
          />
        </div>
        <ErrorMessage data-testid="register-error" error={message as string} />
        <span className="text-ui-fg-base text-small-regular mt-6 text-center">
          En créant un compte, vous acceptez la{" "}
          <LocalizedLink className="underline" href="/privacy-policy">
            Politique de confidentialité
          </LocalizedLink>{" "}
          et les{" "}
          <LocalizedLink className="underline" href="/terms-of-use">
            Conditions d&apos;utilisation
          </LocalizedLink>{" "}
          de Lakikabio.
        </span>
        <SubmitButton className="mt-6 w-full" data-testid="register-button">
          Rejoindre
        </SubmitButton>
      </form>
      <span className="text-ui-fg-base text-small-regular mt-6 text-center">
        Déjà membre ?{" "}
        <button
          className="underline"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
        >
          Connectez-vous
        </button>
        .
      </span>
    </div>
  );
};

export default Register;
