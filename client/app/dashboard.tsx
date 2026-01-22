"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/tasks")
      .then((res) => setTasks(res.data.data))
      .catch(() => router.push("/login"));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {tasks.map((t: any) => (
        <div key={t.id}>{t.title}</div>
      ))}
    </div>
  );
}
    