import type {PropsWithChildren} from "react";

export default function Layout({children}: PropsWithChildren) {
  return (
    <body className="relative flex min-h-screen min-w-min-screen flex-col overflow-x-clip">
      {children}
    </body>
  );
}
