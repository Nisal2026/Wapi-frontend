import ForceLightTheme from "@/src/components/auth/ForceLightTheme";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ForceLightTheme />
      {children}
    </>
  );
}
