import {clx} from "@medusajs/ui";

const Divider = ({className}: {className?: string}) => (
  <div
    className={clx("mt-1 h-px w-full border-b border-accent-40", className)}
  />
);

export default Divider;
