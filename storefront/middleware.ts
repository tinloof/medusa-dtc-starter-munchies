import type {NextRequest} from "next/server";

import {vercelStegaCleanAll} from "@sanity/client/stega";
import {NextResponse} from "next/server";

import {getRedirect} from "./data/sanity/redirects";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const redirect = (await getRedirect(pathname)) as any;
  const cleanRedirect = vercelStegaCleanAll(redirect);

  if (cleanRedirect) {
    return NextResponse.redirect(
      new URL(cleanRedirect.destination, request.url),
      {
        status: cleanRedirect.permanent ? 301 : 302,
      },
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manage|blocks|cms|favicons|fonts|images|sections|studio-docs).*)",
  ],
};
