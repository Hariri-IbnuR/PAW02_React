import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Task, TaskInput } from "../types";
import Button from "./Button";

interface TaskFormProps {
  courses: string[];
  editingTask: Task | null;
  onSubmit: (input: TaskInput) => void;
  onCancel: () => void;
}

const EMPTY: TaskInput = { title: "", course: "", deadline: "" };

export default function TaskForm({ courses, editingTask, onSubmit, onCancel }: TaskFormProps) {
  const [values, setValues] = useState<TaskInput>(EMPTY);

  // Saat masuk mode edit, isi form dengan data tugas; saat selesai, kosongkan
  useEffect(() => {
    setValues(
      editingTask
        ? { title: editingTask.title, course: editingTask.course, deadline: editingTask.deadline }
        : EMPTY
    );
  }, [editingTask]);

  const isEditing = editingTask !== null;

  // Tugas lama dengan matkul yang tidak ada di jadwal tetap bisa diedit
  const options =
    values.course && !courses.includes(values.course) ? [...courses, values.course] : courses;

  const handleChange = (field: keyof TaskInput, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: values.title.trim(),
      course: values.course.trim(),
      deadline: values.deadline,
    });
    setValues(EMPTY);
  };

  return (
    <form id="tugas" className="panel" autoComplete="off" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit tugas" : "Tambah tugas"}</h2>
      <label>
        Judul tugas
        <input
          name="title"
          required
          maxLength={80}
          placeholder="Contoh: Laporan praktikum 3"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </label>
      <div className="row">
        <label>
          Mata kuliah
          <select
            name="course"
            required
            value={values.course}
            onChange={(e) => handleChange("course", e.target.value)}
          >
            <option value="" disabled>
              Pilih mata kuliah
            </option>
            {options.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tenggat
          <input
            name="deadline"
            type="date"
            required
            value={values.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
          />
        </label>
      </div>
      <div className="actions">
        <Button type="submit" variant="primary">
          {isEditing ? "Simpan perubahan" : "Tambah tugas"}
        </Button>
        {isEditing && <Button onClick={onCancel}>Batal</Button>}
      </div>
    </form>
  );
}
