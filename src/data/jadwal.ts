export type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

export interface JadwalKuliah {
  matkul: string;
  ruang: string;
  hari: Hari;
  jam: string;
}

export const URUTAN_HARI: Hari[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

export const JADWAL: JadwalKuliah[] = [
  { matkul: "Manajemen Basis Data", ruang: "R 4.09", hari: "Senin", jam: "07:00-09:30" },
  { matkul: "Jaringan Komputer", ruang: "R 4.10", hari: "Kamis", jam: "07:00-09:30" },
  { matkul: "Pengembangan Aplikasi Web", ruang: "Gedung R.3.9", hari: "Jumat", jam: "09:30-12:00" },
  { matkul: "Interaksi Manusia dan Komputer", ruang: "R 4.01", hari: "Rabu", jam: "09:30-12:00" },
  { matkul: "Intelegensia Buatan", ruang: "R 4.10", hari: "Selasa", jam: "12:40-15:10" },
  { matkul: "Manajemen Proyek Perangkat Lunak", ruang: "R 4.01", hari: "Senin", jam: "09:30-12:00" },
  { matkul: "Pengembangan Aplikasi Mobile", ruang: "R 4.12", hari: "Kamis", jam: "12:40-15:10" },
];
