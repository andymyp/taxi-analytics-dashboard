import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const authSession = await auth();

  if (!authSession) {
    return redirect("/");
  }

  return <main className="flex antialiased w-full h-screen">{children}</main>;
}
