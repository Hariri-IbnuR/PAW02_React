interface NavbarProps {
  appName: string;
  nama: string;
  nim: string;
}

const LINKS = [
  { href: "#tugas", label: "Tugas" },
  { href: "#daftar", label: "Daftar" },
  { href: "#jadwal", label: "Jadwal" },
];

export default function Navbar({ appName, nama, nim }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <div className="navbar-inner">
        <span className="brand">{appName}</span>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <span className="identity">
          {nama} · {nim}
        </span>
      </div>
    </nav>
  );
}
