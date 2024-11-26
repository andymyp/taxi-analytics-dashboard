"use client";

import { radians, randExp } from "@/lib/3d";
import { BUILDING_SETS } from "@/lib/3d/building-sets";
import { Fragment, useEffect, useState } from "react";
import { MathUtils } from "three";
import Building from "./building";
import { FLOOR_HEIGHT } from "@/lib/3d/constants";

interface Props {
  minHeight?: number;
  maxHeight?: number;
}

export default function BuildingSet({ minHeight = 2, maxHeight = 20 }: Props) {
  const [buildingSetIndex, setBuildingSetIndex] = useState<number>(0);
  const [floors, setFloors] = useState<number[]>([]);

  useEffect(() => {
    setBuildingSetIndex(MathUtils.randInt(0, BUILDING_SETS.length - 1));

    setFloors(
      BUILDING_SETS[buildingSetIndex].map(() => {
        const randHeight = randExp(minHeight, maxHeight, 7);
        return Math.floor(randHeight);
      })
    );
  }, []);

  return (
    <group>
      {BUILDING_SETS[buildingSetIndex].map(({ length, position, width }, i) => (
        <Fragment key={i}>
          <Building
            position={
              position.map((pos) => pos * 2) as [number, number, number]
            }
            size={[width * 2, length * 2]}
            floors={floors[i]}
          />

          <mesh
            position={[
              position[0] * 2,
              FLOOR_HEIGHT * (floors[i] - 1),
              position[2] * 2,
            ]}
            rotation={[radians(-90), 0, 0]}
          >
            <planeGeometry args={[width * 2, length * 2]} />
            <meshBasicMaterial color={"black"} transparent opacity={0.6} />
          </mesh>
        </Fragment>
      ))}
    </group>
  );
}
