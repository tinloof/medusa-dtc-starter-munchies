import Body from "@/components/shared/typography/body";

export default function ProgressBar() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative h-[6px] w-full overflow-hidden rounded-lg bg-secondary">
        <div className="absolute left-0 top-0 h-[6px] w-[25%] bg-accent" />
      </div>
      <Body font="sans" mobileSize="base">
        Free shipping for purchases of $35 or more
      </Body>
    </div>
  );
}
