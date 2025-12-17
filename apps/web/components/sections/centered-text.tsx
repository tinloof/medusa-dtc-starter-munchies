import Body from "../shared/typography/body";
import type { ModularPageSection } from "./types";

export default function CenteredText(
	props: ModularPageSection<"section.centeredText">,
) {
	return (
		<section
			{...props.rootHtmlAttributes}
			className="full mx-auto max-w-max-screen p-m lg:p-xl"
		>
			<div className="rounded-lg border border-accent px-s py-[90px] lg:py-[108px]">
				<Body
					className="mx-auto max-w-[720px] text-balance text-center"
					desktopSize="6xl"
					font="serif"
					mobileSize="4xl"
				>
					{props.text}
				</Body>
			</div>
		</section>
	);
}
