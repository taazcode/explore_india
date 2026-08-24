import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import type { Language } from "../data/translations";

const languages: { value: Language; label: string; native: string }[] = [
  { value: "English", label: "English", native: "English" },
  { value: "Hindi", label: "Hindi", native: "हिन्दी" },
  { value: "Bengali", label: "Bengali", native: "বাংলা" },
  { value: "Assamese", label: "Assamese", native: "অসমীয়া" },
  { value: "Rajasthani", label: "Rajasthani", native: "राजस्थानी" },
];

export default function LanguageSelector() {
  const { language, setLanguage, translating } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find((item) => item.value === language) ?? languages[0];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="language-selector" ref={ref}>
      <button
        type="button"
        className={`language-trigger ${open ? "open" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe2 size={15} className={translating ? "language-spin" : ""} />
        <span>{current.native}</span>
        <ChevronDown size={14} className="language-chevron" />
      </button>

      {open && (
        <div className="language-menu" role="menu">
          {languages.map((item) => (
            <button
              type="button"
              role="menuitem"
              key={item.value}
              className={item.value === language ? "selected" : ""}
              onClick={() => {
                setLanguage(item.value);
                setOpen(false);
              }}
            >
              <span>
                <strong>{item.native}</strong>
                <small>{item.label}</small>
              </span>
              {item.value === language && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
