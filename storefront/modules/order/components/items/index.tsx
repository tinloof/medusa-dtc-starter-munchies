import type {HttpTypes} from "@medusajs/types";

import Item from "../item";

type ItemsProps = {
  order: HttpTypes.StoreOrder;
};

const Items = ({order}: ItemsProps) => {
  return (
    <div className="flex flex-col gap-s">
      {order.items
        ?.sort((a, b) => {
          return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
        })
        .map((item) => (
          <>
            {/* <OrderItem
              currency_code={order.currency_code}
              key={item.id}
              {...item}
            /> */}
            <Item
              currencyCode={order.currency_code}
              item={item}
              key={item.id}
            />
          </>
        ))}
    </div>
  );
};

export default Items;
