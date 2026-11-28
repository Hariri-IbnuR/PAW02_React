import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  totalCount: number; // jumlah seluruh tugas (sebelum filter/cari)
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, totalCount, onToggle, onEdit, onDelete }: TaskListProps) {
  // Conditional rendering: tampilan kosong vs daftar
  if (tasks.length === 0) {
    return (
      <ul className="list">
        <li className="empty">
          {totalCount > 0
            ? "Tidak ada tugas yang cocok dengan pencarian atau filter."
            : "Tambahkan tugas pertama lewat formulir di atas."}
        </li>
      </ul>
    );
  }

  // List rendering: map() + key
  return (
    <ul className="list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
