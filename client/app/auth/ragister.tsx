"use client";

import { useState } from "react";
import { registerApi } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (!email || !password) {
      alert("Email aur password required hai");
      return;
    }

    try {
      setLoading(true);
      await registerApi({ email, password });
      alert("Registration successful. Login karo.");
      router.push("/login");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={submit} disabled={loading}>
        {loading ? "Creating..." : "Register"}
      </button>
    </div>
  );
}
