"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { formatCurrency, formatNumber } from "@/lib/format";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  value: string;
  decimals: number;
  duration?: number;
  prefix?: string;
  isCurrency?: boolean;
}

export default function AnimatedCounter({
  value,
  decimals = 0,
  duration = 2,
  prefix = "",
  isCurrency = false,
}: Props) {
  const [isStarted, setIsStarted] = useState(false);
  const elementRef = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(elementRef, {
    once: true,
    margin: isMobile ? "-10px" : "-100px",
  });

  useEffect(() => {
    if (isInView && !isStarted) {
      setIsStarted(true);
    }
  }, [isInView, isStarted]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {isStarted ? (
        <CountUp
          start={0}
          end={Number(value)}
          duration={duration}
          decimals={decimals}
          separator=","
          formattingFn={(n) => {
            if (isCurrency) {
              return formatCurrency(n, decimals);
            }

            return formatNumber(n, decimals);
          }}
        />
      ) : isCurrency ? (
        "$0"
      ) : (
        "0"
      )}
    </span>
  );
}
