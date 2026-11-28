import type { TaskStatus } from "../types";

interface BadgeProps {
  status: TaskStatus;
}

// Komponen reusable: label status tugas
export default function Badge({ status }: BadgeProps) {
  return <span className={`badge ${status === "Selesai" ? "ok" : "todo"}`}>{status}</span>;
}
