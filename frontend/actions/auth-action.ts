import axios from "@/lib/axios";
import { AppDispatch, AppState } from "@/redux";
import { AppAction } from "@/redux/app-slice";
import { AuthAction } from "@/redux/auth-slice";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TAuth } from "@/types";

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

      await signIn("credentials", {
        user: JSON.stringify(data.user),
        redirect: false,
      });

      toast({ variant: "success", description: `Welcome ${data.user.name}` });
      return router.push("/dashboard");
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
