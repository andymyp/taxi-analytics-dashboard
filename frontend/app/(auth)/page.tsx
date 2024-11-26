import RotatingCamera from "@/components/3d/camera-rotating";
import TaxiScene from "@/components/3d/taxi-scene";

export default function SignInPage() {
  return (
    <div className="relative w-full h-screen">
      <TaxiScene
        orbitControls={false}
        camera={<RotatingCamera />}
        hideAllComments={true}
      />
    </div>
  );
}
