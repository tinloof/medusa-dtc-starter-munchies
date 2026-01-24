import type {
  DialogCloseProps,
  DialogContentProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog";

import { Close, Content, Portal, Trigger } from "@radix-ui/react-dialog";

export function OpenDialog(props: DialogTriggerProps) {
  return <Trigger {...props} />;
}

export function CloseDialog(props: DialogCloseProps) {
  return <Close {...props} />;
}

export function SideDialog({ style, ...passThrough }: DialogContentProps) {
  return (
    <Portal>
      <Content
        className="fixed top-0 right-0 z-9999 h-screen w-full max-w-107.5 transition-transform ease-in-out data-[state=closed]:animate-exitToRight data-[state=open]:animate-enterFromRight"
        style={{ ...style }}
        {...passThrough}
      />
    </Portal>
  );
}
