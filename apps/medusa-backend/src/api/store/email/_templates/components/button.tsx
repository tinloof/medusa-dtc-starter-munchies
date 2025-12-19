import { Button } from "@react-email/components";
import { arial_font } from "./style";

export function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      className="mx-auto my-6 w-full rounded-full border-[1.5px] border-black py-[6px] text-center text-[32px] text-accent leading-[150%]"
      href={href}
      style={{
        border: "1.5px solid",
        ...arial_font,
      }}
    >
      {label}
    </Button>
  );
}
