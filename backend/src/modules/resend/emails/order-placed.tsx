import { OrderDTO } from "@medusajs/framework/types";
import OrderConfirmation from "src/api/store/email/_templates/order-confirmation";

type OrderPlacedEmailProps = {
  order: OrderDTO;
};

// function OrderPlacedEmailComponent({ order }: OrderPlacedEmailProps) {
//   const formatter = new Intl.NumberFormat([], {
//     style: "currency",
//     currencyDisplay: "narrowSymbol",
//     currency: order.currency_code,
//   });

//   const formatPrice = (price: BigNumberValue) => {
//     if (typeof price === "number") {
//       return formatter.format(price);
//     }

//     if (typeof price === "string") {
//       return formatter.format(parseFloat(price));
//     }

//     return price?.toString() || "";
//   };

//   return (
//     <Html>
//       <Heading>Thank you for your order</Heading>
//       {order.email}'s Items
//       <Container>
//         {order.items.map((item) => {
//           return (
//             <Section key={item.id} style={{ paddingTop: "40px", paddingBottom: "40px" }}>
//               <Row>
//                 <Column>
//                   <Img src={item.thumbnail} alt={item.product_title} style={{ float: "left" }} width="260px" />
//                 </Column>
//                 <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
//                   <Text style={{ fontWeight: "500" }}>{item.product_title}</Text>
//                   <Text>{item.variant_title}</Text>
//                   <Text>{formatPrice(item.total)}</Text>
//                 </Column>
//               </Row>
//             </Section>
//           );
//         })}
//       </Container>
//     </Html>
//   );
// }

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => <OrderConfirmation {...props} />;
