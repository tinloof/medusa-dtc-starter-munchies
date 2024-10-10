import type {Header} from "@/types/sanity.generated";

import Cart from "./cart";

export default async function Header(props: Header) {
  console.log(props);

  return (
    <header className="sticky top-0 z-40 flex h-[4.5rem] items-center bg-background">
      <div className="mx-auto flex w-full max-w-max-screen justify-between gap-2xl px-m lg:px-xl">
        <div>
          <img alt="Mubchies logo" src="/images/logo.svg" />
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </header>
  );
}
