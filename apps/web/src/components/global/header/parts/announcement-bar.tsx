import { type PropsWithChildren, useState } from "react";
import { Icon } from "@/generated/Icon";
import { CLOSE } from "@/generated/icons";

export function AnnouncementBar({ children }: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full bg-secondary" id="announcement-bar">
      <div className="mx-auto flex w-full max-w-max-screen items-center justify-between bg-secondary px-m py-[7.5px] lg:px-xl">
        {children}
        <button
          aria-label="Close announcement"
          onClick={() => setIsVisible(false)}
          type="button"
        >
          <Icon className="size-3.5" href={CLOSE} />
        </button>
      </div>
    </div>
  );
}
