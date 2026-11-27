import "./style.css";
import type { Task, Filter, TaskInput } from "./types";
import { loadData, saveData, removeById } from "./storage";

// ---- Konfigurasi dari .env (primitive: string) ----
const APP_NAME: string = import.meta.env.VITE_APP_NAME ?? "Daftar Tugas Kuliah";
const APP_VERSION: string = import.meta.env.VITE_APP_VERSION ?? "1.0.0";
const STORAGE_KEY = "tugas-kuliah";
const FILTERS: Filter[] = ["Semua", "Belum Selesai", "Selesai"]; // Array

// ---- State ----
let tasks: Task[] = loadData<Task[]>(STORAGE_KEY, []);
let nextId: number = Math.max(0, ...tasks.map((t) => t.id)) + 1; // number
let editingId: number | null = null;
let filter: Filter = "Semua";
let isFormOpen: boolean = false; // boolean

// ---- Template ----
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <main class="wrap">
    <header class="top">
      <h1>${APP_NAME}</h1>
      <p class="muted" id="summary"></p>
    </header>

    <form id="form" class="panel" autocomplete="off">
      <h2 id="form-title">Tambah tugas</h2>
      <label>Judul tugas
        <input name="title" required maxlength="80" placeholder="Contoh: Laporan praktikum 3" />
      </label>
      <div class="row">
        <label>Mata kuliah
          <input name="course" required maxlength="50" placeholder="Contoh: Basis Data" />
        </label>
        <label>Tenggat
          <input name="deadline" type="date" required />
        </label>
      </div>
      <div class="actions">
        <button type="submit" class="btn primary" id="submit-btn">Tambah tugas</button>
        <button type="button" class="btn" id="cancel-btn" hidden>Batal</button>
      </div>
    </form>

    <nav class="filters" id="filters" aria-label="Filter status"></nav>
    <ul class="list" id="list"></ul>

    <footer class="muted foot">v${APP_VERSION}</footer>
  </main>
`;

const $ = <T extends HTMLElement>(sel: string): T => app.querySelector<T>(sel)!;
const form = $<HTMLFormElement>("#form");
const listEl = $<HTMLUListElement>("#list");
const filtersEl = $<HTMLElement>("#filters");
const cancelBtn = $<HTMLButtonElement>("#cancel-btn");

// ---- Helper ----
const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const fmtDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

function persist(): void {
  saveData<Task[]>(STORAGE_KEY, tasks);
  render();
}

function resetForm(): void {
  editingId = null;
  isFormOpen = false;
  form.reset();
  $("#form-title").textContent = "Tambah tugas";
  $("#submit-btn").textContent = "Tambah tugas";
  cancelBtn.hidden = true;
}

// ---- Render ----
function render(): void {
  const done = tasks.filter((t) => t.status === "Selesai").length;
  $("#summary").textContent = tasks.length
    ? `${done} dari ${tasks.length} tugas selesai`
    : "Belum ada tugas.";

  filtersEl.innerHTML = FILTERS.map(
    (f) => `<button class="chip ${f === filter ? "on" : ""}" data-filter="${f}">${f}</button>`
  ).join("");

  const shown = tasks
    .filter((t) => filter === "Semua" || t.status === filter)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  if (shown.length === 0) {
    listEl.innerHTML = `<li class="empty">${
      tasks.length ? "Tidak ada tugas dengan status ini." : "Tambahkan tugas pertama lewat formulir di atas."
    }</li>`;
    return;
  }

  listEl.innerHTML = shown
    .map(
      (t) => `
    <li class="task ${t.status === "Selesai" ? "done" : ""}">
      <div class="info">
        <strong>${esc(t.title)}</strong>
        <span class="muted">${esc(t.course)} · Tenggat ${fmtDate(t.deadline)}</span>
      </div>
      <span class="badge ${t.status === "Selesai" ? "ok" : "todo"}">${t.status}</span>
      <div class="btns">
        <button class="btn sm" data-action="toggle" data-id="${t.id}">
          ${t.status === "Selesai" ? "Tandai belum" : "Tandai selesai"}
        </button>
        <button class="btn sm" data-action="edit" data-id="${t.id}">Edit</button>
        <button class="btn sm danger" data-action="delete" data-id="${t.id}">Hapus</button>
      </div>
    </li>`
    )
    .join("");
}

// ---- Event ----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const input: TaskInput = {
    title: String(data.get("title")).trim(),
    course: String(data.get("course")).trim(),
    deadline: String(data.get("deadline")),
  };

  if (editingId !== null) {
    tasks = tasks.map((t) => (t.id === editingId ? { ...t, ...input } : t));
  } else {
    tasks.push({ id: nextId++, status: "Belum Selesai", ...input });
  }
  resetForm();
  persist();
});

cancelBtn.addEventListener("click", resetForm);

filtersEl.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-filter]");
  if (!btn) return;
  filter = btn.dataset.filter as Filter;
  render();
});

listEl.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-action]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  switch (btn.dataset.action) {
    case "toggle":
      task.status = task.status === "Selesai" ? "Belum Selesai" : "Selesai";
      persist();
      break;
    case "edit":
      editingId = id;
      isFormOpen = true;
      (form.elements.namedItem("title") as HTMLInputElement).value = task.title;
      (form.elements.namedItem("course") as HTMLInputElement).value = task.course;
      (form.elements.namedItem("deadline") as HTMLInputElement).value = task.deadline;
      $("#form-title").textContent = "Edit tugas";
      $("#submit-btn").textContent = "Simpan perubahan";
      cancelBtn.hidden = !isFormOpen;
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      break;
    case "delete":
      if (confirm(`Hapus tugas "${task.title}"?`)) {
        tasks = removeById<Task>(tasks, id);
        if (editingId === id) resetForm();
        persist();
      }
      break;
  }
});

render();
