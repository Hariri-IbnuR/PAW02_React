interface HeaderProps {
  title: string;
  summary: string;
  nama: string;
  nim: string;
}

export default function Header({ title, summary, nama, nim }: HeaderProps) {
  return (
    <header className="top">
      <h1>{title}</h1>
      <p className="student">
        {nama} &middot; NIM {nim}
      </p>
      <p className="muted">{summary}</p>
    </header>
  );
}
