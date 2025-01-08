import Icon from "@/components/shared/icon";
import {ModalProvider, useModal} from "@/lib/context/modal-context";
import {Dialog, Transition} from "@headlessui/react";
import {clx} from "@medusajs/ui";
import React, {Fragment} from "react";

type ModalProps = {
  children: React.ReactNode;
  close: () => void;
  "data-testid"?: string;
  isOpen: boolean;
  search?: boolean;
  size?: "large" | "medium" | "small";
};

const Modal = ({
  children,
  close,
  "data-testid": dataTestId,
  isOpen,
  search = false,
  size = "medium",
}: ModalProps) => {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 h-screen bg-opacity-75 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-hidden">
          <div
            className={clx(
              "flex h-full min-h-full justify-center p-4 text-center",
              {
                "items-center": !search,
                "items-start": search,
              },
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clx(
                  "flex h-fit max-h-[75vh] w-full transform flex-col justify-start p-5 text-left align-middle transition-all",
                  {
                    "bg-transparent shadow-none": search,
                    "max-w-3xl": size === "large",
                    "max-w-md": size === "small",
                    "max-w-xl": size === "medium",
                    "rounded-xl border border-accent bg-background shadow-xl":
                      !search,
                  },
                )}
                data-testid={dataTestId}
              >
                <ModalProvider close={close}>{children}</ModalProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Title: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {close} = useModal();

  return (
    <Dialog.Title className="flex items-center justify-between">
      <div className="text-large-semi">{children}</div>
      <div>
        <button data-testid="close-modal-button" onClick={close}>
          <Icon className="h-9 w-9" name="Close" />
        </button>
      </div>
    </Dialog.Title>
  );
};

const Description: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Dialog.Description className="text-small-regular text-ui-fg-base flex h-full items-center justify-center pb-4 pt-2">
      {children}
    </Dialog.Description>
  );
};

const Body: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <div className="flex justify-center">{children}</div>;
};

const Footer: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex items-center justify-end gap-x-4">{children}</div>
  );
};

Modal.Title = Title;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
