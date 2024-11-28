import axios from "@/lib/axios";
import { AppDispatch, AppState } from "@/redux";
import { AppAction } from "@/redux/app-slice";
import { AuthAction } from "@/redux/auth-slice";
import { toast } from "@/hooks/use-toast";
import { TAuth } from "@/types";
import { signIn, signOut } from "next-auth/react";

export const SignInAction = (formValues: TAuth) => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    try {
      dispatch(AppAction.setLoading(true));

      const { data } = await axios.post("/auth/sign-in", formValues);

      dispatch(
        AuthAction.signIn({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      );

      await signIn("credentials", {
        user: JSON.stringify(data.user),
        redirectTo: "/dashboard",
      });
    } catch (error: any) {
      if (error.response) {
        toast({ variant: "error", description: error.response.data.message });
      } else {
        toast({ variant: "error", description: error.message });
      }
    } finally {
      dispatch(AppAction.setLoading(false));
    }
  };
};

export const SignOutAction = () => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    try {
      dispatch(AppAction.setLoading(true));
      dispatch(AuthAction.signOut());
      await signOut({ redirectTo: "/" });
    } catch (error: any) {
      if (error.response) {
        toast({ variant: "error", description: error.response.data.message });
      } else {
        toast({ variant: "error", description: error.message });
      }
    } finally {
      dispatch(AppAction.setLoading(false));
    }
  };
};
