import Icon from "@/components/shared/icon";

export default function Loading() {
  return (
    <div className="text-ui-fg-base flex h-full w-full items-center justify-center">
      <Icon className="size-10 animate-spin-loading" name="LoadingAccent" />
    </div>
  );
}
