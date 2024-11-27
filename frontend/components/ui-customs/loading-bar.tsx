"use client";

import { useEffect } from "react";
import {
  AppProgressBar,
  startProgress,
  stopProgress,
} from "next-nprogress-bar";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";

export default function LoadingBar() {
  const isLoading = useSelector((state: AppState) => state.app.isLoading);

  useEffect(() => {
    if (isLoading) {
      startProgress();
    } else {
      stopProgress();
    }
  }, [isLoading]);

  return (
    <AppProgressBar
      height="5px"
      color="hsl(47.9, 95.8%, 53.1%)"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
