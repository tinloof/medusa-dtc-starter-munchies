import Filters from "./filters";

type RefinementProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function Refinement(props: RefinementProps) {
  return (
    <div className="flex items-center justify-between">
      <Filters searchParams={props.searchParams} />
    </div>
  );
}
