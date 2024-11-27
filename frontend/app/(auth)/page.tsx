import TaxiScene from "@/components/3d/taxi-scene";
import RotatingCamera from "@/components/3d/camera-rotating";
import SignInForm from "@/components/forms/sign-in-form";

export default function SignInPage() {
  return (
    <div className="relative w-full h-screen">
      <TaxiScene
        orbitControls={false}
        camera={<RotatingCamera />}
        hideAllComments
      />
      <div className="flex flex-col w-full sm:w-80 justify-center items-center absolute top-0 bottom-0 left-0 bg-black/40 backdrop-blur-sm">
        <div className="w-full mx-auto p-8 text-white">
          <div className="flex items-center text-2xl mb-6">
            <img src="/logo.png" alt="logo" className="w-16 mr-4" />
            <div className="flex flex-col">
              <h1>Sign In</h1>
              <p className="text-sm">Taxi Analytics</p>
            </div>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
