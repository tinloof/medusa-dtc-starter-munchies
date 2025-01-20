import type {IconProps} from "@/types/icon";

import React from "react";

const FastDelivery: React.FC<IconProps> = ({
  color = "currentColor",
  size = "16",
  ...attributes
}) => {
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M3.63462 7.35205H2.70508"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.56416 4.56348H2.70508"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16.6483 19.4365H3.63477"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16.9034 4.56348L15.9868 7.61888C15.8688 8.01207 15.5063 8.28164 15.0963 8.28164H12.2036C11.5808 8.28164 11.1346 7.68115 11.3131 7.08532L12.0697 4.56348"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.28125 12.9297H10.2612"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.055 15.718H7.21305C5.71835 15.718 4.64659 14.2772 5.07603 12.8457L7.08384 6.15299C7.36735 5.20951 8.23554 4.56348 9.22086 4.56348H19.0638C20.5585 4.56348 21.6302 6.00426 21.2008 7.43576L19.193 14.1284C18.9095 15.0719 18.0403 15.718 17.055 15.718Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default FastDelivery;
