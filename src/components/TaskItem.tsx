import type { Task } from "../types";
import Badge from "./Badge";
import Button from "./Button";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const fmtDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const done = task.status === "Selesai";
  return (
    <li className={`task ${done ? "done" : ""}`}>
      <div className="info">
        <strong>{task.title}</strong>
        <span className="muted">
          {task.course} · Tenggat {fmtDate(task.deadline)}
        </span>
      </div>
      <Badge status={task.status} />
      <div className="btns">
        <Button small onClick={() => onToggle(task.id)}>
          {done ? "Tandai belum" : "Tandai selesai"}
        </Button>
        <Button small onClick={() => onEdit(task.id)}>
          Edit
        </Button>
        <Button small variant="danger" onClick={() => onDelete(task.id)}>
          Hapus
        </Button>
      </div>
    </li>
  );
}
