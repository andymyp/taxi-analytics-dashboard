"use client";

import { useEffect, useState } from "react";
import Square, { SquareProps } from "./square";
import { yellowColor } from "@/lib/3d/constants";

interface BlinkingParkingSlotProps extends SquareProps {
  blinkDuration?: number;
}

export default function BlinkingParkingSlot({
  borderColor = yellowColor,
  blinkDuration = 1000,
  ...props
}: BlinkingParkingSlotProps) {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, blinkDuration);

    return () => {
      clearInterval(interval);
    };
  }, [blinkDuration]);

  if (isBlinking) return null;

  return <Square {...props} borderColor={borderColor} />;
}
