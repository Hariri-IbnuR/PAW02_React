# Daftar Tugas Kuliah

Aplikasi web sederhana (Vite + TypeScript) untuk mengelola tugas kuliah. Data disimpan di `localStorage` browser.

## Menjalankan

```bash
npm install          # pasang dependencies dari package.json
cp .env.example .env # buat file konfigurasi lokal
npm run dev          # jalankan server pengembangan (http://localhost:5173)
npm run build        # cek tipe (tsc) + build produksi ke folder dist/
npm run preview      # coba hasil build
```

## Membuat proyek serupa dari nol

```bash
npm create vite@latest tugas-kuliah -- --template vanilla-ts
cd tugas-kuliah && npm install
```

## npm: dependencies, devDependencies, semver

- `dependencies`: paket yang dibutuhkan aplikasi saat berjalan (`npm install <paket>`). Proyek ini tidak memerlukannya.
- `devDependencies`: paket alat bantu saat pengembangan/build (`npm install -D <paket>`), yaitu `vite` dan `typescript`.
- Semantic versioning `MAJOR.MINOR.PATCH`:
  - `^5.4.10` = boleh naik MINOR/PATCH (>=5.4.10 <6.0.0)
  - `~5.6.2` = hanya naik PATCH (>=5.6.2 <5.7.0)
  - `5.4.10` = versi persis
- `package-lock.json` mengunci versi persis; commit file ini ke Git.
- `scripts` dijalankan dengan `npm run <nama>`.

## Environment variables

- Vite hanya mengekspos variabel berawalan `VITE_` ke browser. Nilainya **tertanam di JavaScript hasil build dan bisa dilihat siapa saja**.
- Karena itu `.env` hanya berisi konfigurasi non-rahasia (`VITE_APP_NAME`, `VITE_APP_VERSION`).
- Password / API key **jangan** diberi awalan `VITE_` dan jangan dipakai di kode frontend; simpan di backend.
- `.env` sudah masuk `.gitignore` sehingga tidak ikut ke GitHub. `.env.example` yang di-commit sebagai contoh.
- Jika `.env` sempat ter-commit: hapus dari Git (`git rm --cached .env`) dan ganti semua kunci yang bocor.

## Contoh fitur TypeScript

| Konsep | Lokasi |
|---|---|
| Primitive (`string`, `number`, `boolean`) | `src/main.ts` (`APP_NAME`, `nextId`, `isFormOpen`) |
| Array | `tasks: Task[]`, `FILTERS: Filter[]` |
| Interface | `Task` di `src/types.ts` |
| Type alias & union | `TaskStatus`, `Filter`, `TaskInput` di `src/types.ts` |
| Generics | `loadData<T>`, `saveData<T>`, `removeById<T>` di `src/storage.ts` |
