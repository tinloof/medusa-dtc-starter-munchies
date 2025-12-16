import {loadRedirects} from ".";

export type RedirectSetting = {
  destination: string;
  permanent?: boolean;
  source: string;
};

export function getRedirect(source: string) {
  const paths = getPathVariations(source);
  return loadRedirects(paths);
}

function getPathVariations(path: string): string[] {
  if (typeof path !== "string") return [];

  let slashless = path.trim();
  if (slashless.startsWith("/")) {
    slashless = slashless.slice(1);
  }
  if (slashless.endsWith("/")) {
    slashless = slashless.slice(0, -1);
  }

  return [
    slashless,
    // /slash-on-both-ends/
    `/${slashless}/`,
    // trailing/
    `${slashless}/`,
    // /leading
    `/${slashless}`,
  ];
}
