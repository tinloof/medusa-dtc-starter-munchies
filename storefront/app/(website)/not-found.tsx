import {Link} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {loadNotFound} from "@/data/sanity";

export default async function NotFound() {
  const data = await loadNotFound();
  return (
    <main className="flex-1">
      <section className="mx-auto h-[calc(100vh-50px)] max-h-[650px] w-full max-w-max-screen p-m lg:p-xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border border-accent">
          <Heading desktopSize="5xl" font="display" mobileSize="3xl" tag="h1">
            404
          </Heading>
          <Body
            className="font-semibold"
            desktopSize="xl"
            font="sans"
            mobileSize="lg"
          >
            {data?.text}
          </Body>
          <Link
            className="mt-2xl"
            href={data?.cta?.link}
            size="lg"
            variant="outline"
          >
            {data?.cta?.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
