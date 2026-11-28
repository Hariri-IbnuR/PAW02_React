import type { ButtonHTMLAttributes } from "react";

// Komponen reusable: tombol dengan varian & ukuran lewat props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger";
  small?: boolean;
}

export default function Button({
  variant = "default",
  small = false,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = ["btn", variant !== "default" ? variant : "", small ? "sm" : "", className]
    .filter(Boolean)
    .join(" ");
  return <button type={type} className={cls} {...rest} />;
}
