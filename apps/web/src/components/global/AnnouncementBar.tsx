"use client";

import { useState } from "react";
import Body from "@/components/shared/typography/Body";

interface AnnouncementBarProps {
  showAnnouncement?: boolean;
  announcementText?: any[];
}

export default function AnnouncementBar({
  showAnnouncement,
  announcementText,
}: AnnouncementBarProps) {
  const [isActive, setIsActive] = useState(true);

  if (!isActive || !showAnnouncement || !announcementText) {
    return null;
  }

  // Extract plain text from portable text blocks
  const textContent = announcementText
    .map((block) =>
      block._type === "block"
        ? block.children?.map((child: any) => child.text).join("")
        : ""
    )
    .join("");

  return (
    <div className="w-full bg-secondary">
      <div className="mx-auto flex w-full max-w-max-screen items-center justify-between bg-secondary px-m py-[7.5px] lg:px-xl">
        <Body desktopSize="sm" font="sans" mobileSize="xs">
          {textContent}
        </Body>
        <button onClick={() => setIsActive(false)} type="button" aria-label="Close announcement">
          <svg
            className="size-3.5"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
