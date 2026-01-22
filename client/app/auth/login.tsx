    "use client";
import { useState } from "react";
import { loginApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const submit = async () => {
    const res = await loginApi({ email, password });
    login(res.data.accessToken);
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
