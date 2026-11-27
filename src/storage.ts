// Generics sederhana: fungsi bekerja untuk tipe apa pun (T)
export function loadData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveData<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Generic dengan batasan: T harus punya properti id bertipe number
export function removeById<T extends { id: number }>(items: T[], id: number): T[] {
  return items.filter((item) => item.id !== id);
}
