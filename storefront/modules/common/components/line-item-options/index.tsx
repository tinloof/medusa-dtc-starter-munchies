import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";

type LineItemOptionsProps = {
  "data-testid"?: string;
  "data-value"?: HttpTypes.StoreProductVariant;
  variant: HttpTypes.StoreProductVariant | undefined;
};

const LineItemOptions = ({
  "data-testid": dataTestid,
  "data-value": dataValue,
  variant,
}: LineItemOptionsProps) => {
  return (
    <Body
      // className="text-ui-fg-subtle inline-block w-full overflow-hidden text-ellipsis"
      className="overflow-hidden text-ellipsis font-medium"
      data-testid={dataTestid}
      data-value={dataValue}
      font="sans"
      mobileSize="sm"
    >
      {variant?.title}
    </Body>
  );
};

export default LineItemOptions;
