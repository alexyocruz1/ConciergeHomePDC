"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BRAND_NAME } from "@/lib/site";

const languages = [
  { code: "es", flag: "🇲🇽", label: "Español", welcome: "Bienvenido" },
  { code: "en", flag: "🇺🇸", label: "English", welcome: "Welcome" },
  { code: "fr", flag: "🇫🇷", label: "Français", welcome: "Bienvenue" },
  { code: "ru", flag: "🇷🇺", label: "Русский", welcome: "Добро пожаловать" },
  { code: "pt", flag: "🇧🇷", label: "Português", welcome: "Bem-vindo" },
  { code: "de", flag: "🇩🇪", label: "Deutsch", welcome: "Willkommen" },
];

export default function WelcomePage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % languages.length);
        setFading(false);
      }, 400);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  function selectLanguage(code: string) {
    setEntered(true);
    setTimeout(() => {
      router.push(`/${code}`);
    }, 500);
  }

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        entered ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950" />

      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary-700/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm sm:h-20 sm:w-20">
          <span className="text-3xl font-bold text-white sm:text-4xl">C</span>
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary-300 sm:text-base">
          {BRAND_NAME}
        </p>

        <div className="mt-10 h-24 flex items-center justify-center sm:h-28">
          <h1
            className={`text-4xl font-extrabold tracking-tight text-white transition-all duration-400 sm:text-5xl lg:text-7xl ${
              fading
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {languages[activeIndex].welcome}
          </h1>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {languages.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-accent-400"
                  : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <p className="mt-10 text-base text-primary-200 sm:text-lg">
          {["Selecciona tu idioma", "Select your language"][
            activeIndex % 2 === 0 ? 0 : 1
          ]}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all hover:border-accent-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-accent-500/5 sm:px-6 sm:py-4"
            >
              <span className="text-2xl transition-transform group-hover:scale-110">
                {lang.flag}
              </span>
              <span className="text-sm font-medium text-white sm:text-base">
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
