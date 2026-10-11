import { asset } from "@/lib/asset";
import { DownloadIcon } from "./Icons";

type Props = { label?: string; variant?: "solid" | "ghost"; size?: "sm"; icon?: boolean; style?: React.CSSProperties };

export default function ResumeButton({ label = "Download resume", variant = "solid", size, icon = true, style }: Props) {
  const cls = ["btn", variant === "ghost" ? "ghost" : "", size ?? ""].filter(Boolean).join(" ");
  return (
    <a className={cls} href={asset("/Natalia_Shiny_Resume.pdf")} download="Natalia_Shiny_Resume.pdf" style={style}>
      {icon && <DownloadIcon />}
      {label}
    </a>
  );
}
