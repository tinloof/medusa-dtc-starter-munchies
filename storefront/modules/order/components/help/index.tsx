import Heading from "@/components/shared/typography/heading";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

const Help = () => {
  return (
    <div className="mt-6">
      <Heading
        className="text-base-semi"
        desktopSize="base"
        font="sans"
        mobileSize="base"
        tag="h3"
      >
        Besoin d&apos;aide ?
      </Heading>
      <div className="text-base-regular my-2">
        <ul className="flex flex-col gap-y-2">
          <li>
            <LocalizedClientLink href="/contact">Contact</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              Retours & Échanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
