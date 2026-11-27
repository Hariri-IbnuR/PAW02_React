// Type alias + union type: status hanya boleh salah satu dari dua nilai ini
export type TaskStatus = "Belum Selesai" | "Selesai";

// Union type lain: filter = semua status ditambah opsi "Semua"
export type Filter = "Semua" | TaskStatus;

// Interface: bentuk data sebuah tugas (primitive types: number, string)
export interface Task {
  id: number;
  title: string;
  course: string;
  deadline: string; // format YYYY-MM-DD
  status: TaskStatus;
}

// Data dari form (belum punya id & status)
export type TaskInput = Omit<Task, "id" | "status">;
