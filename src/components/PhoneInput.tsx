"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";

type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

const PRIORITY_COUNTRIES: Country[] = [
  { code: "MX", name: "México", dial: "+52", flag: "🇲🇽" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Deutschland", dial: "+49", flag: "🇩🇪" },
  { code: "RU", name: "Россия", dial: "+7", flag: "🇷🇺" },
  { code: "BR", name: "Brasil", dial: "+55", flag: "🇧🇷" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "ES", name: "España", dial: "+34", flag: "🇪🇸" },
];

const OTHER_COUNTRIES: Country[] = [
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "BO", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", dial: "+53", flag: "🇨🇺" },
  { code: "CZ", name: "Czechia", dial: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "DO", name: "Dominican Republic", dial: "+1", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", dial: "+503", flag: "🇸🇻" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
  { code: "GT", name: "Guatemala", dial: "+502", flag: "🇬🇹" },
  { code: "HN", name: "Honduras", dial: "+504", flag: "🇭🇳" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", dial: "+505", flag: "🇳🇮" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "PA", name: "Panamá", dial: "+507", flag: "🇵🇦" },
  { code: "PY", name: "Paraguay", dial: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "PR", name: "Puerto Rico", dial: "+1", flag: "🇵🇷" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
  { code: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
];

const LOCALE_TO_COUNTRY: Record<string, string> = {
  es: "MX",
  en: "US",
  fr: "FR",
  ru: "RU",
  pt: "BR",
  de: "DE",
};

type PhoneInputProps = {
  label: string;
  value: string;
  onChange: (fullNumber: string) => void;
};

export function PhoneInput({ label, value, onChange }: PhoneInputProps) {
  const locale = useLocale();
  const defaultCode = LOCALE_TO_COUNTRY[locale] || "MX";
  const allCountries = [...PRIORITY_COUNTRIES, ...OTHER_COUNTRIES];

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => allCountries.find((c) => c.code === defaultCode) || PRIORITY_COUNTRIES[0]
  );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [localNumber, setLocalNumber] = useState(() => {
    if (value) {
      const match = allCountries.find((c) => value.startsWith(c.dial));
      if (match) return value.slice(match.dial.length).trim();
    }
    return value;
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const filteredPriority = useMemo(() => {
    if (!search) return PRIORITY_COUNTRIES;
    const q = search.toLowerCase();
    return PRIORITY_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  const filteredOther = useMemo(() => {
    if (!search) return OTHER_COUNTRIES;
    const q = search.toLowerCase();
    return OTHER_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  function selectCountry(country: Country) {
    setSelectedCountry(country);
    setOpen(false);
    setSearch("");
    onChange(localNumber ? `${country.dial} ${localNumber}` : "");
  }

  function handleNumberChange(num: string) {
    const cleaned = num.replace(/[^\d\s\-()]/g, "");
    setLocalNumber(cleaned);
    onChange(cleaned ? `${selectedCountry.dial} ${cleaned}` : "");
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="phone" className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-auto pt-1.5">
        <div className="flex rounded-xl border border-slate-200 bg-white shadow-sm transition-colors focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-full items-center gap-1 rounded-l-xl border-r border-slate-200 px-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <span className="text-lg leading-none">{selectedCountry.flag}</span>
              <span className="text-xs font-medium text-slate-500">
                {selectedCountry.dial}
              </span>
              <svg
                className={`h-3 w-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {open && (
              <div className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
                <div className="border-b border-slate-100 p-2">
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto overscroll-contain">
                  {filteredPriority.length > 0 && (
                    <>
                      {filteredPriority.map((country) => (
                        <CountryRow
                          key={country.code}
                          country={country}
                          selected={selectedCountry.code === country.code}
                          onSelect={selectCountry}
                        />
                      ))}
                      {filteredOther.length > 0 && (
                        <div className="border-t border-slate-100" />
                      )}
                    </>
                  )}
                  {filteredOther.map((country) => (
                    <CountryRow
                      key={country.code}
                      country={country}
                      selected={selectedCountry.code === country.code}
                      onSelect={selectCountry}
                    />
                  ))}
                  {filteredPriority.length === 0 && filteredOther.length === 0 && (
                    <p className="px-4 py-3 text-center text-sm text-slate-400">
                      No results
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <input
            type="tel"
            id="phone"
            value={localNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder="55 1234 5678"
            className="min-w-0 flex-1 rounded-r-xl bg-transparent px-3 py-3 text-sm text-slate-900 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function CountryRow({
  country,
  selected,
  onSelect,
}: {
  country: Country;
  selected: boolean;
  onSelect: (c: Country) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(country)}
      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
        selected
          ? "bg-primary-50 text-primary-700"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <span className="text-lg leading-none">{country.flag}</span>
      <span className="flex-1 truncate">{country.name}</span>
      <span className="shrink-0 text-xs text-slate-400">{country.dial}</span>
    </button>
  );
}
