import LocalizedLink from "@/components/shared/localized-link";
import {Text} from "@medusajs/ui";
import {ArrowUpRightIcon} from "lucide-react";

type InteractiveLinkProps = {
  children?: React.ReactNode;
  href: string;
  onClick?: () => void;
};

const InteractiveLink = ({
  children,
  href,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedLink
      className="group flex items-center gap-x-1"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-ui-fg-interactive">{children}</Text>
      <ArrowUpRightIcon
        className="duration-150 ease-in-out group-hover:rotate-45"
        // color="var(--fg-interactive)"
      />
    </LocalizedLink>
  );
};

export default InteractiveLink;
