import {AddonsItem} from "@/components/shared/addons-item";
import CarouselSection from "@/components/shared/carousel-section";
import Heading from "@/components/shared/typography/heading";
import {getProductsByIds} from "@/data/medusa/products";

type Props = {ids: string[]; region_id: string};

export default async function CartAddons({ids, region_id}: Props) {
  const {products} = await getProductsByIds(ids, region_id);

  const slides = products.map((item) => (
    <div className="w-[380px]" key={item.id}>
      <AddonsItem variant="cart" {...item} />
    </div>
  ));

  return (
    <div>
      <CarouselSection
        showButtons
        slides={slides}
        title={
          <Heading font="serif" mobileSize="lg" tag="h3">
            You might also like
          </Heading>
        }
        variant="cart"
      />
    </div>
  );
}
