import Filters from "./filters";
import Sort from "./sort";

export default function Refinement() {
  return (
    <div className="flex items-center justify-between">
      <Filters />
      <Sort />
    </div>
  );
}
