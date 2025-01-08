import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import useToggleState from "@/hooks/use-toggle-state";
import {SubmitButton} from "@/modules/checkout/components/submit-button";
import {Disclosure} from "@headlessui/react";
import {Badge, clx} from "@medusajs/ui";
import {useEffect} from "react";
import {useFormStatus} from "react-dom";

type AccountInfoProps = {
  children?: React.ReactNode;
  clearState: () => void;
  currentInfo: React.ReactNode | string;
  "data-testid"?: string;
  errorMessage?: string;
  isError?: boolean;
  isSuccess?: boolean;
  label: string;
};

const AccountInfo = ({
  children,
  clearState,
  currentInfo,
  "data-testid": dataTestid,
  errorMessage = "Une erreur s'est produite. Veuillez réessayer plus tard.",
  isError,
  isSuccess,
  label,
}: AccountInfoProps) => {
  const {close, state, toggle} = useToggleState();

  const {pending} = useFormStatus();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  return (
    <div className="text-small-regular" data-testid={dataTestid}>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <Body
            className="text-ui-fg-base font-extralight uppercase"
            font="sans"
          >
            {label}
          </Body>
          <div className="flex flex-1 basis-0 items-center justify-end gap-x-4">
            {typeof currentInfo === "string" ? (
              <Body
                className="font-semibold"
                data-testid="current-info"
                desktopSize="lg"
                font="sans"
              >
                {currentInfo}
              </Body>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Cta
            className="w-[140px]"
            data-active={state}
            data-testid="edit-button"
            onClick={handleToggle}
            size="sm"
            type={state ? "reset" : "button"}
            variant="outline"
          >
            {state ? "Annuler" : "Modifier"}
          </Cta>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            },
          )}
          data-testid="success-message"
          static
        >
          <Badge className="my-4 p-2" color="green">
            <span>{label} mis à jour avec succès !</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          className={clx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            },
          )}
          data-testid="error-message"
          static
        >
          <Badge className="my-4 p-2" color="red">
            <span>{errorMessage}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          className={clx(
            "overflow-visible transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            },
          )}
          static
        >
          <div className="flex flex-col gap-y-2 py-4">
            <div>{children}</div>
            <div className="mt-2 flex items-center justify-end">
              <SubmitButton
                className="w-full sm:max-w-[200px]"
                data-testid="save-button"
                isLoading={pending}
                size="md"
              >
                Sauvegarder
              </SubmitButton>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default AccountInfo;
