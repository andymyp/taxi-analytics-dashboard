import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const shimmerVariants = {
  initial: {
    backgroundPosition: "-468px 0",
  },
  animate: {
    backgroundPosition: ["468px 0", "-468px 0"],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

const MotionCard = motion.create(Card);

interface Props {
  index: number;
  cardVariants: any;
}

export default function CounterCardSkeleton({ index, cardVariants }: Props) {
  return (
    <MotionCard
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent>
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="h-8 w-32 rounded-md bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent bg-[length:468px_468px]"
        />
        <Skeleton className="h-3 w-20 mt-2" />
      </CardContent>
    </MotionCard>
  );
}
