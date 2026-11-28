interface FooterProps {
  version: string;
  nama: string;
  nim: string;
}

export default function Footer({ version, nama, nim }: FooterProps) {
  return (
    <footer className="muted foot">
      {nama} · {nim} · v{version}
    </footer>
  );
}
