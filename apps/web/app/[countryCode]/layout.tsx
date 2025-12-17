import { Analytics } from "@vercel/analytics/react";
import { revalidatePath, updateTag } from "next/cache";
import { draftMode } from "next/headers";
import VisualEditing from "next-sanity/visual-editing/client-component";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import { CountryCodeProvider } from "@/components/context/country-code-context";
import { ExitPreview } from "@/components/exit-preview";
import type { PageProps } from "@/types";

type LayoutProps = PropsWithChildren<
	Omit<PageProps<"countryCode">, "searchParams">
>;

export default async function Layout(props: LayoutProps) {
	const params = await props.params;

	const { children } = props;

	const shouldEnableDraftModeToggle =
		process.env.NODE_ENV === "development" && (await draftMode()).isEnabled;
	return (
		<NuqsAdapter>
			<CountryCodeProvider countryCode={params.countryCode}>
				<body className="scrollbar-hide relative flex min-h-screen min-w-min-screen flex-col overflow-x-clip">
					{children}
					{(await draftMode()).isEnabled && (
						<VisualEditing
							refresh={async (payload) => {
								"use server";
								if (!(await draftMode()).isEnabled) {
									console.debug(
										"Skipped manual refresh because draft mode is not enabled",
									);
									return;
								}
								if (payload.source === "mutation") {
									if (payload.document.slug?.current) {
										const tag = `${payload.document._type}:${payload.document.slug.current}`;
										console.log("Revalidate slug", tag);
										updateTag(tag);
									}
									console.log("Revalidate tag", payload.document._type);
									updateTag(payload.document._type);
								}
								revalidatePath("/", "layout");
							}}
						/>
					)}
					{shouldEnableDraftModeToggle && (
						<ExitPreview enable={(await draftMode()).isEnabled} />
					)}
					<Analytics />
				</body>
			</CountryCodeProvider>
		</NuqsAdapter>
	);
}
