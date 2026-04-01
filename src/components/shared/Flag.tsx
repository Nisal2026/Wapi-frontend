"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { FlagProps } from "@/src/types/shared";

export const Flag: React.FC<FlagProps> = ({ countryCode, className, size = 20 }) => {
  if (!countryCode) return null;

  const code = countryCode.toLowerCase();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      width={size}
      alt={`${countryCode} flag`}
      className={cn("inline-block align-middle rounded-xs object-cover overflow-hidden", className)}
      style={{
        aspectRatio: "4/3",
        minWidth: size,
        minHeight: Math.round(size * 0.75),
      }}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://flagcdn.com/w80/un.png`;
      }}
    />
  );
};
