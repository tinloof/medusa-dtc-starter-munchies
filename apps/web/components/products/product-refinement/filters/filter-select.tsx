"use client";
import { cx } from "class-variance-authority";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import {
	type ComponentProps,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import Icon from "@/components/shared/icon";
import type Select from "@/components/shared/select";
import Body from "@/components/shared/typography/body";

import DropDown from "./drop-down";

export function useMultiFilter(name: string) {
	const [state, setState] = useQueryState(
		name,
		parseAsArrayOf(parseAsString).withOptions({ shallow: false }),
	);

	const setFilter = (value: string) => {
		setState((prev) => {
			if (prev?.includes(value)) {
				const values = prev.filter((item) => item !== value);
				return values.length > 0 ? values : null;
			}
			return prev ? [value, ...prev] : [value];
		});
	};

	return { filter: state, setFilter };
}

export default function FilterSelect(
	props: { name: string; placeholder: string } & Omit<
		ComponentProps<typeof Select>,
		"setOption" | "variant"
	>,
) {
	const { filter, setFilter } = useMultiFilter(props.name);

	const [isOpen, setOpen] = useState(false);
	const [showTopArrow, setShowTopArrow] = useState(false);
	const [showBottomArrow, setShowBottomArrow] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(() => {
		const container = scrollContainerRef.current;
		if (container) {
			setShowTopArrow(container.scrollTop > 0);
			setShowBottomArrow(
				container.scrollHeight - container.clientHeight >
					container.scrollTop + 1,
			);
		}
	}, []);

	useEffect(() => {
		handleScroll();
	}, [handleScroll]);

	const scrollBy = (amount: number) => {
		const container = scrollContainerRef.current;
		if (container) {
			container.scrollBy({ behavior: "smooth", top: amount });
		}
	};

	return (
		<DropDown isOpen={isOpen} placeholder={props.placeholder} setOpen={setOpen}>
			<div
				className="relative max-h-[320px] w-full overflow-y-auto rounded"
				onScroll={handleScroll}
				ref={scrollContainerRef}
			>
				<div className="sticky top-0">
					<div
						className={cx(
							"absolute left-0 top-0 flex w-full cursor-pointer items-center justify-center border-b-[1.5px] border-accent bg-background transition-all duration-300",
							{
								"-translate-y-full": !showTopArrow,
							},
						)}
						onClick={() => scrollBy(-250)}
					>
						<Icon className="size-6" name="AccordionBottom" />
					</div>
				</div>
				<div className="group flex w-full flex-col gap-2 p-xs">
					{props.options.map((option) => {
						const selected = filter?.includes(option.value);
						return (
							<button
								type="button"
								className="flex cursor-pointer items-center gap-2 rounded-lg px-s py-xs hover:bg-secondary disabled:pointer-events-none"
								key={option.value}
								onClick={() => setFilter(option.value)}
							>
								<div className="flex size-4! items-center justify-center rounded-[4px] border border-accent">
									<Icon
										className={cx(
											"size-3! shrink-0 transform opacity-0 transition-transform duration-300",
											{ "opacity-100": selected },
										)}
										height={24}
										name="Check"
										width={24}
									/>
								</div>
								<Body
									className="truncate text-nowrap text-left"
									font="sans"
									mobileSize="base"
								>
									{option.label}
								</Body>
							</button>
						);
					})}
				</div>
				<div className="sticky bottom-0 -mt-[25.5px] h-[25.5px] overflow-hidden">
					<div
						className={cx(
							"sticky bottom-0 left-0 flex w-full cursor-pointer items-center justify-center border-t-[1.5px] border-accent bg-background transition-all duration-300",
							{
								"translate-y-full": !showBottomArrow,
							},
						)}
						onClick={() => scrollBy(250)}
					>
						<Icon className="size-6" name="AccordionTop" />
					</div>
				</div>
			</div>
		</DropDown>
	);
}
