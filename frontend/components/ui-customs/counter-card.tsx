"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "./animated-counter";
import { LucideIcon } from "lucide-react";
import CounterCardSkeleton from "./counter-card-skeleton";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const MotionCard = motion.create(Card);

interface Props {
  index: number;
  title: string;
  bgColor: string;
  color: string;
  icon: LucideIcon;
  decimals: number;
  description: string;
  value: string;
  prefix?: string;
  isCurrency?: boolean;
  isLoading?: boolean;
}

export default function CounterCard(card: Props) {
  if (card.isLoading) {
    return (
      <CounterCardSkeleton index={card.index} cardVariants={cardVariants} />
    );
  }

  return (
    <MotionCard
      custom={card.index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative rounded-xl overflow-hidden transition-colors hover:bg-muted/50 w-full"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <div className={`${card.bgColor} ${card.color} p-2 rounded-full`}>
          <card.icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter
            value={card.value}
            decimals={card.decimals}
            prefix={card.prefix}
            isCurrency={card.isCurrency}
          />
        </div>
        <p className="text-xs text-muted-foreground pt-1">{card.description}</p>
        <div
          className={`absolute bottom-0 left-0 h-1 w-full ${card.bgColor}`}
        />
      </CardContent>
    </MotionCard>
  );
}
