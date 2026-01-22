"use client";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        logout();
        router.push("/login");
      }}
    >
      Logout
    </button>
  );
}
