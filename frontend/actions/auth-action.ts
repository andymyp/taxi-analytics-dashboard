import axios from "@/lib/axios";
import { AppDispatch, AppState } from "@/redux";
import { AppAction } from "@/redux/app-slice";
import { AuthAction } from "@/redux/auth-slice";
import { toast } from "@/hooks/use-toast";
import { TAuth } from "@/types";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignInAction = (
  formValues: TAuth,
  router: ReturnType<typeof useRouter>
) => {
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

      const response = await signIn("credentials", {
        user: JSON.stringify(data.user),
        redirect: false,
      });

      if (response?.ok) {
        toast({ variant: "success", description: `Welcome ${data.user.name}` });
        router.replace("/dashboard");
      }
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

export const SignOutAction = (router: ReturnType<typeof useRouter>) => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    try {
      dispatch(AppAction.setLoading(true));

      const response = await signOut({ redirect: false });

      if (response) {
        dispatch(AppAction.resetState());
        dispatch(AuthAction.signOut());

        router.replace("/");
      }
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
