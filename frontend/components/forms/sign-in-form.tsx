"use client";

import { z } from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";
import { SignInAction } from "@/actions/auth-action";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function SignInForm() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (formValues) => {
    await dispatch(SignInAction(formValues, router));
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    toast({
      variant: "error",
      description: Object.values(errors)[0].message,
    });
  };

  return (
    <form
      className="flex flex-col h-full w-full gap-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Input
        {...register("email")}
        placeholder="Enter email"
        type="text"
        className="w-full"
        name="email"
        autoFocus
      />
      <div className="relative w-full">
        <Input
          {...register("password")}
          placeholder="Enter password"
          className="w-full"
          name="password"
          type={showPassword ? "text" : "password"}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      <Button
        type="submit"
        size="lg"
        className="uppercase w-full"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting && (
          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
        )}
        Sign In
      </Button>
    </form>
  );
}
