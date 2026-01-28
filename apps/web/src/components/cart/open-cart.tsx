import { OpenDialog } from "@/components/shared/side-dialog";
import { Body } from "@/components/shared/typography/body";
import { Icon } from "@/generated/Icon";
import { CART } from "@/generated/icons";
import { useCart } from "../context/cart";

export function OpenCart() {
  const { cart } = useCart();

  const count = (cart?.items?.length || 0).toFixed(0);

  return (
    <OpenDialog>
      <div className="relative h-10 w-10 p-2">
        <Icon href={CART} />
        <Body
          className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-background"
          font="sans"
          mobileSize="sm"
        >
          {count}
        </Body>
      </div>
    </OpenDialog>
  );
}
