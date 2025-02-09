import { OrderDTO } from "@medusajs/framework/types";
import ShippingConfirmation from "src/api/store/email/_templates/shipping-confirmation";

type OrderShippedEmailProps = {
  order: OrderDTO;
};

// function OrderShippedEmailComponent({ order }: OrderShippedEmailProps) {
//   return (
//     <Html>
//       <Heading>Thank you for your order</Heading>
//       {/* {order.email}'s Items */}
//       {/* <Container>
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
//       </Container> */}
//     </Html>
//   );
// }

export const orderShippedEmail = (props: OrderShippedEmailProps) => <ShippingConfirmation />;
