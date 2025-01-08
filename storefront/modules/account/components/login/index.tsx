import Input from "@/components/shared/input";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {login} from "@/lib/data/customer";
import {LOGIN_VIEW} from "@/modules/account/templates/login-template";
import ErrorMessage from "@/modules/checkout/components/error-message";
import {SubmitButton} from "@/modules/checkout/components/submit-button";
import {useActionState} from "react";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({setCurrentView}: Props) => {
  const [message, formAction] = useActionState(login, null);

  return (
    <div
      className="flex w-full max-w-md flex-col items-center"
      data-testid="login-page"
    >
      <Heading
        className="text-large-semi mb-6 uppercase"
        desktopSize="xl"
        mobileSize="base"
        tag="h1"
      >
        Bienvenue
      </Heading>
      <Body
        className="text-base-regular text-ui-fg-base mb-8 text-center"
        font="sans"
      >
        Connectez-vous pour une expérience de magasinage améliorée.
      </Body>
      <form action={formAction} className="w-full">
        <div className="flex w-full flex-col gap-y-2">
          <Input
            autoComplete="email"
            data-testid="email-input"
            name="email"
            placeholder="Email"
            required
            title="Entrez une adresse email valide."
            type="email"
          />
          <Input
            autoComplete="current-password"
            data-testid="password-input"
            name="password"
            placeholder="Mot de passe"
            required
            type="password"
          />
        </div>
        <ErrorMessage data-testid="login-error-message" error={message} />
        <SubmitButton className="mt-6 w-full" data-testid="sign-in-button">
          Se connecter
        </SubmitButton>
      </form>
      <Body
        className="text-ui-fg-base text-small-regular mt-6 text-center"
        font="sans"
      >
        Pas encore membre ?{" "}
        <button
          className="underline"
          data-testid="register-button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
        >
          Rejoignez-nous
        </button>
        .
      </Body>
    </div>
  );
};

export default Login;
