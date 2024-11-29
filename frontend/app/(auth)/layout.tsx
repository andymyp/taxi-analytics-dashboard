import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const authSession = await auth();

  if (authSession) {
    return redirect("/dashboard", RedirectType.replace);
  }

  return <main className="flex antialiased w-full h-screen">{children}</main>;
}
