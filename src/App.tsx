import { useMemo, useState } from "react";
import type { Filter, Task, TaskInput } from "./types";
import { loadData, saveData, removeById } from "./storage";
import { JADWAL } from "./data/jadwal";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import ScheduleTable from "./components/ScheduleTable";
import Footer from "./components/Footer";

const APP_NAME: string = import.meta.env.VITE_APP_NAME ?? "Daftar Tugas Kuliah";
const APP_VERSION: string = import.meta.env.VITE_APP_VERSION ?? "1.0.0";
const NAMA: string = import.meta.env.VITE_STUDENT_NAME ?? "Ibnu Rafiq Hariri";
const NIM: string = import.meta.env.VITE_STUDENT_NIM ?? "1247050068";
const STORAGE_KEY = "tugas-kuliah";
const FILTERS: Filter[] = ["Semua", "Belum Selesai", "Selesai"];

// Nama matkul unik dari jadwal, urut abjad
const MATKUL_LIST: string[] = [...new Set(JADWAL.map((j) => j.matkul))].sort((a, b) =>
  a.localeCompare(b, "id")
);

export default function App() {
  // ---- State ----
  const [tasks, setTasks] = useState<Task[]>(() => loadData<Task[]>(STORAGE_KEY, []));
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("Semua");
  const [search, setSearch] = useState<string>("");

  // Simpan ke localStorage setiap kali state tugas berubah
  const updateTasks = (next: Task[]) => {
    setTasks(next);
    saveData<Task[]>(STORAGE_KEY, next);
  };

  // ---- Event handler ----
  const handleSubmit = (input: TaskInput) => {
    if (editingId !== null) {
      updateTasks(tasks.map((t) => (t.id === editingId ? { ...t, ...input } : t)));
      setEditingId(null);
    } else {
      const nextId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
      updateTasks([...tasks, { id: nextId, status: "Belum Selesai", ...input }]);
    }
  };

  const handleToggle = (id: number) =>
    updateTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "Selesai" ? "Belum Selesai" : "Selesai" } : t
      )
    );

  const handleEdit = (id: number) => {
    setEditingId(id);
    document.getElementById("tugas")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleDelete = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    if (confirm(`Hapus tugas "${task.title}"?`)) {
      updateTasks(removeById<Task>(tasks, id));
      if (editingId === id) setEditingId(null);
    }
  };

  // ---- Data turunan ----
  const done = tasks.filter((t) => t.status === "Selesai").length;
  const summary = tasks.length ? `${done} dari ${tasks.length} tugas selesai` : "Belum ada tugas.";

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks
      .filter((t) => filter === "Semua" || t.status === filter)
      .filter((t) => !q || t.title.toLowerCase().includes(q) || t.course.toLowerCase().includes(q))
      .sort((a, b) => a.deadline.localeCompare(b.deadline));
  }, [tasks, filter, search]);

  const editingTask = tasks.find((t) => t.id === editingId) ?? null;

  return (
    <>
      <Navbar appName={APP_NAME} nama={NAMA} nim={NIM} />
      <main className="wrap">
        <Header title={APP_NAME} summary={summary} nama={NAMA} nim={NIM} />
        <TaskForm
          courses={MATKUL_LIST}
          editingTask={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => setEditingId(null)}
        />
        <FilterBar
          filters={FILTERS}
          active={filter}
          search={search}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
        />
        <TaskList
          tasks={shown}
          totalCount={tasks.length}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ScheduleTable />
        <Footer version={APP_VERSION} nama={NAMA} nim={NIM} />
      </main>
    </>
  );
}
