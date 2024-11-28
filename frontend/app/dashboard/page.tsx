"use client";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux";
import { AppAction } from "@/redux/app-slice";
import { AuthAction } from "@/redux/auth-slice";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    try {
      dispatch(AppAction.setLoading(true));
      dispatch(AuthAction.signOut());
      await signOut({ redirectTo: "/" });
    } catch (error) {
    } finally {
      dispatch(AppAction.setLoading(false));
    }
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Button onClick={() => handleSignOut()}>Sign Out</Button>
    </div>
  );
}
