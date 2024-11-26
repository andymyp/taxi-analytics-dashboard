"use client";

import { FLOOR_HEIGHT } from "@/lib/3d/constants";
import Square, { SquareProps } from "./square";

interface BuildingProps extends SquareProps {
  floors?: number;
}

export default function Building({
  position,
  size,
  floors = 3,
}: BuildingProps) {
  return (
    <>
      {Array.from({ length: floors }, (_, index) => (
        <Square
          key={index}
          position={[
            position[0],
            position[1] + index * FLOOR_HEIGHT,
            position[2],
          ]}
          size={size}
          borderColor="white"
        />
      ))}
    </>
  );
}
