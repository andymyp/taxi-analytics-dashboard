"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { radians } from "@/lib/3d";
import {
  roadColor,
  WORLD_DURATION,
  WORLD_END,
  WORLD_START,
  yellowColor,
} from "@/lib/3d/constants";
import Spawner from "./spawner";
import * as THREE from "three";
import Taxi from "./taxi";
import BuildingSet from "./building-set";

interface Props {
  camera?: React.ReactNode;
  children?: React.ReactNode;
  orbitControls?: boolean;
  hideAllComments?: boolean;
}

export default function TaxiScene({
  children,
  camera,
  orbitControls = true,
  hideAllComments = false,
}: Props) {
  return (
    <Canvas
      style={{
        background:
          "linear-gradient(to top right, hsl(0, 0%, 8%), hsl(52, 0%, 18%))",
      }}
    >
      {camera || (
        <PerspectiveCamera
          makeDefault
          fov={60}
          near={0.1}
          far={400}
          position={[1, 100, -1]}
          rotation={[radians(60), 0, 0]}
        />
      )}

      {children}

      {orbitControls ? (
        <OrbitControls
          minPolarAngle={radians(0)}
          maxPolarAngle={radians(30)}
          minDistance={30}
          maxDistance={180}
        />
      ) : null}

      {/* Road */}

      <Plane
        args={[350, 24]}
        position={[0, -0.2, 0]}
        rotation={[radians(-90), 0, 0]}
      >
        <meshBasicMaterial color={roadColor} />
      </Plane>

      {/* Taxis */}

      <Spawner
        spawnInterval={8.2}
        duration={WORLD_DURATION - 6}
        startPosition={new THREE.Vector3(WORLD_START, 0, -10)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -10)}
      >
        <Taxi
          forward={false}
          color={yellowColor}
          searching
          comment={!hideAllComments && true}
        />
      </Spawner>
      <Spawner
        spawnInterval={4.3}
        duration={WORLD_DURATION - 12}
        startPosition={new THREE.Vector3(WORLD_START, 0, -6)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -6)}
      >
        <Taxi forward={false} />
      </Spawner>
      <Spawner
        spawnInterval={7.4}
        duration={WORLD_DURATION - 18}
        startPosition={new THREE.Vector3(WORLD_START, 0, -2)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -2)}
      >
        <Taxi forward={false} />
      </Spawner>

      <Spawner
        spawnInterval={9.8}
        duration={WORLD_DURATION - 18}
        endPosition={new THREE.Vector3(WORLD_START, 0, 2)}
        startPosition={new THREE.Vector3(WORLD_END, 0, 2)}
      >
        <Taxi />
      </Spawner>
      <Spawner
        spawnInterval={7}
        duration={WORLD_DURATION - 12}
        endPosition={new THREE.Vector3(WORLD_START, 0, 6)}
        startPosition={new THREE.Vector3(WORLD_END, 0, 6)}
      >
        <Taxi />
      </Spawner>

      {/* My Taxi */}
      <group position={new THREE.Vector3(0, 0, 10)}>
        <Taxi
          color={yellowColor}
          searching
          comment={!hideAllComments && true}
        />
      </group>

      {/* Buildings Left */}
      <Spawner
        spawnInterval={3.6}
        duration={WORLD_DURATION}
        startPosition={new THREE.Vector3(WORLD_START, 0, 76)}
        endPosition={new THREE.Vector3(WORLD_END, 0, 76)}
      >
        <BuildingSet />
      </Spawner>

      {/* Buildings Right */}
      <Spawner
        spawnInterval={3.6}
        duration={WORLD_DURATION}
        startPosition={new THREE.Vector3(WORLD_START, 0, -76)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -76)}
      >
        <BuildingSet />
      </Spawner>
    </Canvas>
  );
}
