import { useState } from "react";
import { JADWAL, URUTAN_HARI } from "../data/jadwal";
import Button from "./Button";

export default function ScheduleTable() {
  const [visible, setVisible] = useState<boolean>(true);

  const rows = [...JADWAL].sort(
    (a, b) => URUTAN_HARI.indexOf(a.hari) - URUTAN_HARI.indexOf(b.hari) || a.jam.localeCompare(b.jam)
  );

  return (
    <section id="jadwal" className="schedule">
      <div className="section-head">
        <h2>Jadwal kuliah</h2>
        <Button small onClick={() => setVisible((v) => !v)} aria-expanded={visible}>
          {visible ? "Sembunyikan" : "Tampilkan"}
        </Button>
      </div>
      {visible && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama Matkul</th>
                <th>Ruang Kelas</th>
                <th>Jadwal Kuliah</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((j) => (
                <tr key={j.matkul}>
                  <td>{j.matkul}</td>
                  <td>{j.ruang}</td>
                  <td>
                    {j.hari} {j.jam}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
