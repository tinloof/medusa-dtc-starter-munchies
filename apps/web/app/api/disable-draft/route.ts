import type {NextRequest} from "next/server";

import {draftMode} from "next/headers";
import {NextResponse} from "next/server";

const ROOT_PATH = "/" as const;

export async function GET(request: NextRequest) {
  const {origin, searchParams} = new URL(request.nextUrl);
  const slug = searchParams.get("currentSlug") ?? ROOT_PATH;
  (await draftMode()).disable();

  return NextResponse.redirect(new URL(slug, origin));
}
