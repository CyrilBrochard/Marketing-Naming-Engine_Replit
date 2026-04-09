import { useState, useMemo, useRef, useEffect } from "react";
import {
  BRANDS, DELIVERY_TYPES, INITIATIVES, TOUCHPOINTS, OBJECTIVES, CHANNELS,
  REGIONS, COUNTRIES, LANGUAGES, SEGMENTS, PLANS, PRODUCTS, VERSIONS, TESTS,
  STEPS, CAMPAIGN_TYPES, getCountryRegion, getFullTerm,
} from "@/data/nomenclature";
import type { NomenclatureOption } from "@/data/nomenclature";

type FormMode = "journey" | "oneshot";
type ResultTab = "campaignName" | "campaignCode" | "assetAcronyms" | "assetFull";

type JourneyForm = {
  brand: string; deliveryType: string; initiative: string; touchpoint: string;
  objective: string; channel: string; regions: string[]; countries: string[];
  languages: string[]; segment: string; plan: string; version: string; test: string; step: string;
};

type OneShotForm = {
  brand: string; deliveryType: string; campaignPeriod: string; campaignType: string;
  campaignName: string; objective: string; channel: string; regions: string[];
  countries: string[]; languages: string[]; segment: string; product: string;
  version: string; test: string; step: string;
};

type GeneratedResults = {
  campaignName: string;
  campaignCode: string;
  assetAcronyms: string[];
  assetFull: string[];
};

function getFullTerm2(value: string, options: NomenclatureOption[]): string {
  return getFullTerm(value, options);
}

function computeResults(journey: JourneyForm | null, oneshot: OneShotForm | null, mode: FormMode): GeneratedResults | null {
  if (mode === "journey" && journey) {
    const { brand, deliveryType, initiative, objective, channel, touchpoint, regions, countries, languages, segment, plan, version, test, step } = journey;
    if (!brand || !deliveryType || !initiative || !objective || !channel) return null;

    const campaignName = [brand, deliveryType, initiative, objective].filter(Boolean).join("_");
    const campaignCode = [
      getFullTerm2(brand, BRANDS),
      getFullTerm2(deliveryType, DELIVERY_TYPES),
      getFullTerm2(initiative, INITIATIVES),
      getFullTerm2(objective, OBJECTIVES),
    ].filter(Boolean).join("_");

    const effCountries = countries.length > 0 ? countries : [];
    const effLanguages = languages.length > 0 ? languages : [];

    const assetAcronyms: string[] = [];
    const assetFull: string[] = [];

    if (effCountries.length > 0 && effLanguages.length > 0) {
      for (const country of effCountries) {
        for (const lang of effLanguages) {
          const region = getCountryRegion(country) || (regions[0] ?? "");
          const acronymParts = [brand, deliveryType, initiative, touchpoint, objective, channel, region, country, lang, segment, plan, version, test, step].filter(Boolean);
          assetAcronyms.push(acronymParts.join("_"));
          const fullParts = [
            getFullTerm2(brand, BRANDS), getFullTerm2(deliveryType, DELIVERY_TYPES),
            getFullTerm2(initiative, INITIATIVES),
            touchpoint ? getFullTerm2(touchpoint, TOUCHPOINTS) : "",
            getFullTerm2(objective, OBJECTIVES), getFullTerm2(channel, CHANNELS),
            getFullTerm2(region, REGIONS), getFullTerm2(country, COUNTRIES),
            getFullTerm2(lang, LANGUAGES),
            segment ? getFullTerm2(segment, SEGMENTS) : "",
            plan ? getFullTerm2(plan, PLANS) : "",
            version ? getFullTerm2(version, VERSIONS) : "",
            test ? getFullTerm2(test, TESTS) : "",
            step ? getFullTerm2(step, STEPS) : "",
          ].filter(Boolean);
          assetFull.push(fullParts.join("_"));
        }
      }
    }
    return { campaignName, campaignCode, assetAcronyms, assetFull };
  }

  if (mode === "oneshot" && oneshot) {
    const { brand, deliveryType, campaignPeriod, campaignType, campaignName: cName, objective, channel, countries, languages, regions, segment, product, version, test, step } = oneshot;
    if (!brand || !deliveryType || !objective || !channel) return null;

    const campaignName = [brand, deliveryType, cName, objective].filter(Boolean).join("_");
    const campaignCode = [
      getFullTerm2(brand, BRANDS),
      getFullTerm2(deliveryType, DELIVERY_TYPES),
      cName,
      getFullTerm2(objective, OBJECTIVES),
    ].filter(Boolean).join("_");

    const effCountries = countries.length > 0 ? countries : [];
    const effLanguages = languages.length > 0 ? languages : [];

    const assetAcronyms: string[] = [];
    const assetFull: string[] = [];

    if (effCountries.length > 0 && effLanguages.length > 0) {
      for (const country of effCountries) {
        for (const lang of effLanguages) {
          const region = getCountryRegion(country) || (regions[0] ?? "");
          const acronymParts = [brand, deliveryType, campaignPeriod, campaignType, cName, objective, channel, region, country, lang, segment, product, version, test, step].filter(Boolean);
          assetAcronyms.push(acronymParts.join("_"));
          const fullParts = [
            getFullTerm2(brand, BRANDS), getFullTerm2(deliveryType, DELIVERY_TYPES),
            campaignPeriod,
            campaignType ? getFullTerm2(campaignType, CAMPAIGN_TYPES) : "",
            cName,
            getFullTerm2(objective, OBJECTIVES), getFullTerm2(channel, CHANNELS),
            getFullTerm2(region, REGIONS), getFullTerm2(country, COUNTRIES),
            getFullTerm2(lang, LANGUAGES),
            segment ? getFullTerm2(segment, SEGMENTS) : "",
            product ? getFullTerm2(product, PRODUCTS) : "",
            version ? getFullTerm2(version, VERSIONS) : "",
            test ? getFullTerm2(test, TESTS) : "",
            step ? getFullTerm2(step, STEPS) : "",
          ].filter(Boolean);
          assetFull.push(fullParts.join("_"));
        }
      }
    }
    return { campaignName, campaignCode, assetAcronyms, assetFull };
  }
  return null;
}

function SelectField({ label, value, onChange, options, required, description, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  options: NomenclatureOption[]; required?: boolean; description?: string; disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {label}{required && <span className="text-indigo-500 ml-1">*</span>}
      </label>
      {description && <p className="text-[11px] text-gray-400">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all appearance-none cursor-pointer hover:border-gray-300 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <option value="">— Choisir —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function TextField({ label, value, onChange, required, placeholder, description, maxLength }: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; description?: string; maxLength?: number;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "");
    onChange(val);
  };
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {label}{required && <span className="text-indigo-500 ml-1">*</span>}
      </label>
      {description && <p className="text-[11px] text-gray-400">{description}</p>}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={maxLength || 20}
          placeholder={placeholder || ""}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all hover:border-gray-300 shadow-xs"
        />
        {maxLength && value.length > 0 && (
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono ${value.length > maxLength * 0.8 ? "text-amber-500" : "text-gray-300"}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

function MultiSelectField({ label, values, onChange, options, required, description, emptyMessage }: {
  label: string; values: string[]; onChange: (v: string[]) => void;
  options: NomenclatureOption[]; required?: boolean; description?: string; emptyMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val: string) => {
    onChange(values.includes(val) ? values.filter((v) => v !== val) : [...values, val]);
  };

  const disabled = options.length === 0;

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {label}{required && <span className="text-indigo-500 ml-1">*</span>}
      </label>
      {description && <p className="text-[11px] text-gray-400">{description}</p>}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={`w-full flex items-center justify-between bg-white border rounded-lg px-3 py-2.5 text-sm text-left transition-all focus:outline-none shadow-xs ${
            disabled ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : open ? "border-indigo-400 ring-2 ring-indigo-100 text-gray-800"
            : "border-gray-200 text-gray-800 hover:border-gray-300 cursor-pointer"
          }`}
        >
          <span className="truncate">
            {disabled ? (emptyMessage || "— Sélectionner une région —")
              : values.length === 0 ? "— Choisir (multi-sélection) —"
              : values.join(", ")}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`ml-2 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""} text-gray-400`}>
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="max-h-52 overflow-y-auto">
              {options.map((opt) => {
                const checked = values.includes(opt.value);
                return (
                  <button key={opt.value} type="button" onClick={() => toggle(opt.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-indigo-50 transition-colors ${checked ? "text-indigo-700 bg-indigo-50/50" : "text-gray-700"}`}
                  >
                    <span className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${checked ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`}>
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {values.length > 0 && (
              <div className="border-t border-gray-100 px-3 py-2">
                <button type="button" onClick={() => onChange([])} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  Tout désélectionner
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {values.map((v) => (
            <span key={v} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              {v}
              <button type="button" onClick={() => toggle(v)} className="hover:text-indigo-900 transition-colors leading-none ml-0.5">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="sm:col-span-2 flex items-center gap-3 mt-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

function ResultCard({ name, onCopy, copied, limit, showFull }: {
  name: string; onCopy: () => void; copied: boolean; limit: number; showFull?: boolean;
}) {
  const isOver = name.length > limit;
  return (
    <div className={`group flex items-start gap-3 p-3 rounded-xl border transition-all ${isOver ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/30"}`}>
      <p className={`font-mono text-xs break-all leading-relaxed flex-1 ${isOver ? "text-amber-700" : "text-gray-700"}`}>{name}</p>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <button
          onClick={onCopy}
          className={`text-[11px] px-2 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
            copied ? "bg-emerald-100 text-emerald-700" : "bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 opacity-0 group-hover:opacity-100"
          }`}
        >
          {copied ? "Copié !" : "Copier"}
        </button>
        <span className={`text-[10px] font-mono ${isOver ? "text-amber-500 font-bold" : "text-gray-300"}`}>
          {name.length}/{limit}{isOver ? " !" : ""}
        </span>
      </div>
    </div>
  );
}

export default function Generator() {
  const [mode, setMode] = useState<FormMode>("journey");
  const [activeTab, setActiveTab] = useState<ResultTab>("campaignName");
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const [journey, setJourney] = useState<JourneyForm>({
    brand: "", deliveryType: "", initiative: "", touchpoint: "", objective: "",
    channel: "", regions: [], countries: [], languages: [],
    segment: "", plan: "", version: "", test: "", step: "",
  });

  const [oneshot, setOneshot] = useState<OneShotForm>({
    brand: "", deliveryType: "OS", campaignPeriod: "", campaignType: "",
    campaignName: "", objective: "", channel: "", regions: [], countries: [],
    languages: [], segment: "", product: "", version: "", test: "", step: "",
  });

  const setJ = (key: keyof JourneyForm) => (val: string) => setJourney((p) => ({ ...p, [key]: val }));
  const setO = (key: keyof OneShotForm) => (val: string) => setOneshot((p) => ({ ...p, [key]: val }));

  const setJMulti = (key: "regions" | "countries" | "languages") => (vals: string[]) => {
    if (key === "regions") {
      setJourney((p) => ({
        ...p, regions: vals,
        countries: p.countries.filter((c) => { const e = COUNTRIES.find((x) => x.value === c); return e && e.regions.some((r) => vals.includes(r)); }),
        languages: p.languages.filter((l) => { const e = LANGUAGES.find((x) => x.value === l); return e && e.regions.some((r) => vals.includes(r)); }),
      }));
    } else {
      setJourney((p) => ({ ...p, [key]: vals }));
    }
  };

  const setOMulti = (key: "regions" | "countries" | "languages") => (vals: string[]) => {
    if (key === "regions") {
      setOneshot((p) => ({
        ...p, regions: vals,
        countries: p.countries.filter((c) => { const e = COUNTRIES.find((x) => x.value === c); return e && e.regions.some((r) => vals.includes(r)); }),
        languages: p.languages.filter((l) => { const e = LANGUAGES.find((x) => x.value === l); return e && e.regions.some((r) => vals.includes(r)); }),
      }));
    } else {
      setOneshot((p) => ({ ...p, [key]: vals }));
    }
  };

  const filteredCountriesJ = useMemo(() => journey.regions.length === 0 ? COUNTRIES : COUNTRIES.filter((c) => c.regions.some((r) => journey.regions.includes(r))), [journey.regions]);
  const filteredLanguagesJ = useMemo(() => journey.regions.length === 0 ? LANGUAGES : LANGUAGES.filter((l) => l.regions.some((r) => journey.regions.includes(r))), [journey.regions]);
  const filteredCountriesO = useMemo(() => oneshot.regions.length === 0 ? COUNTRIES : COUNTRIES.filter((c) => c.regions.some((r) => oneshot.regions.includes(r))), [oneshot.regions]);
  const filteredLanguagesO = useMemo(() => oneshot.regions.length === 0 ? LANGUAGES : LANGUAGES.filter((l) => l.regions.some((r) => oneshot.regions.includes(r))), [oneshot.regions]);

  const results = useMemo(() => computeResults(
    mode === "journey" ? journey : null,
    mode === "oneshot" ? oneshot : null,
    mode
  ), [journey, oneshot, mode]);

  const tabLimits: Record<ResultTab, number> = { campaignName: 50, campaignCode: 128, assetAcronyms: 100, assetFull: 9999 };

  const getTabNames = (tab: ResultTab): string[] => {
    if (!results) return [];
    if (tab === "campaignName") return results.campaignName ? [results.campaignName] : [];
    if (tab === "campaignCode") return results.campaignCode ? [results.campaignCode] : [];
    if (tab === "assetAcronyms") return results.assetAcronyms;
    return results.assetFull;
  };

  const activeNames = getTabNames(activeTab);

  const handleCopy = (name: string, key: string) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopiedIdx(key);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const handleCopyAll = () => {
    const all = activeNames.join("\n");
    navigator.clipboard.writeText(all).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const tabConfig: { key: ResultTab; label: string; sublabel: string }[] = [
    { key: "campaignName", label: "Campaign Name", sublabel: "≤50 car." },
    { key: "campaignCode", label: "Campaign Code", sublabel: "≤128 car." },
    { key: "assetAcronyms", label: "Asset Name", sublabel: "Acronymes ≤100" },
    { key: "assetFull", label: "Asset Name", sublabel: "Complet" },
  ];

  const combos = mode === "journey"
    ? journey.countries.length * journey.languages.length
    : oneshot.countries.length * oneshot.languages.length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top nav */}
      <div className="border-b border-gray-100 bg-white shadow-xs">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-none">CRM Naming Generator</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">Nomenclature standardisée pour les assets CRM</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ─── FORM PANEL ─── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Mode tabs */}
            <div className="bg-gray-100 rounded-xl p-1 flex gap-1">
              {[
                { key: "journey" as FormMode, label: "Journey / CRM Automatisé" },
                { key: "oneshot" as FormMode, label: "One Shot / Campagne" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    mode === key ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Format banner */}
            <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-xs">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">Format {mode === "journey" ? "Journey" : "One Shot"}</p>
              <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                {mode === "journey"
                  ? "BRAND _ TYPE _ INITIATIVE _ [TOUCHPOINT] _ OBJECTIVE _ CHANNEL _ REGION _ COUNTRY _ LANGUE _ [SEGMENT] _ [PLAN] _ [VERSION] _ [TEST] _ [STEP]"
                  : "BRAND _ TYPE _ [PERIOD] _ [CAMP.TYPE] _ [CAMP.NAME] _ OBJECTIVE _ CHANNEL _ REGION _ COUNTRY _ LANGUE _ [SEGMENT] _ [PRODUCT] _ [VERSION] _ [TEST] _ [STEP]"}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
              {mode === "journey" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SectionDivider label="Dimensions obligatoires" />
                  <SelectField label="Brand" value={journey.brand} onChange={setJ("brand")} options={BRANDS} required description="Marque" />
                  <SelectField label="Delivery Type" value={journey.deliveryType} onChange={setJ("deliveryType")} options={DELIVERY_TYPES.filter((d) => d.value !== "OS")} required description="Type d'envoi" />
                  <SelectField label="Initiative" value={journey.initiative} onChange={setJ("initiative")} options={INITIATIVES} required description="Programme CRM" />
                  <SelectField label="Objective" value={journey.objective} onChange={setJ("objective")} options={OBJECTIVES} required description="Objectif marketing" />
                  <SelectField label="Channel" value={journey.channel} onChange={setJ("channel")} options={CHANNELS} required description="Canal de communication" />

                  <SectionDivider label="Géographie — filtrage dynamique" />
                  <div className="sm:col-span-2">
                    <MultiSelectField label="Region" values={journey.regions} onChange={setJMulti("regions")} options={REGIONS} required description="Filtre les pays et langues disponibles" />
                  </div>
                  <MultiSelectField label="Country" values={journey.countries} onChange={setJMulti("countries")} options={filteredCountriesJ} required description={journey.regions.length > 0 ? `Filtré sur : ${journey.regions.join(", ")}` : "Sélectionner une région"} emptyMessage="— Sélectionner une région d'abord —" />
                  <MultiSelectField label="Langue" values={journey.languages} onChange={setJMulti("languages")} options={filteredLanguagesJ} required description={journey.regions.length > 0 ? `Filtré sur : ${journey.regions.join(", ")}` : "Sélectionner une région"} emptyMessage="— Sélectionner une région d'abord —" />

                  {combos > 1 && (
                    <div className="sm:col-span-2">
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                        </span>
                        <p className="text-xs text-indigo-700">
                          <span className="font-bold">{combos} asset names</span> seront générés ({journey.countries.length} pays × {journey.languages.length} langues)
                        </p>
                      </div>
                    </div>
                  )}

                  <SectionDivider label="Dimensions optionnelles" />
                  <SelectField label="Touchpoint" value={journey.touchpoint} onChange={setJ("touchpoint")} options={TOUCHPOINTS} description="Étape dans le journey" />
                  <SelectField label="Segment" value={journey.segment} onChange={setJ("segment")} options={SEGMENTS} description="Segment client" />
                  <SelectField label="Plan" value={journey.plan} onChange={setJ("plan")} options={PLANS} description="Type de plan" />
                  <SelectField label="Version" value={journey.version} onChange={setJ("version")} options={VERSIONS} description="Variante de contenu" />
                  <SelectField label="Test" value={journey.test} onChange={setJ("test")} options={TESTS} description="Variante A/B" />
                  <SelectField label="Step" value={journey.step} onChange={setJ("step")} options={STEPS} description="Étape du journey" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SectionDivider label="Dimensions obligatoires" />
                  <SelectField label="Brand" value={oneshot.brand} onChange={setO("brand")} options={BRANDS} required description="Marque" />
                  <SelectField label="Delivery Type" value={oneshot.deliveryType} onChange={setO("deliveryType")} options={DELIVERY_TYPES} required description="Type d'envoi" />
                  <SelectField label="Objective" value={oneshot.objective} onChange={setO("objective")} options={OBJECTIVES} required description="Objectif marketing" />
                  <SelectField label="Channel" value={oneshot.channel} onChange={setO("channel")} options={CHANNELS} required description="Canal de communication" />

                  <SectionDivider label="Géographie — filtrage dynamique" />
                  <div className="sm:col-span-2">
                    <MultiSelectField label="Region" values={oneshot.regions} onChange={setOMulti("regions")} options={REGIONS} required description="Filtre les pays et langues disponibles" />
                  </div>
                  <MultiSelectField label="Country" values={oneshot.countries} onChange={setOMulti("countries")} options={filteredCountriesO} required description={oneshot.regions.length > 0 ? `Filtré sur : ${oneshot.regions.join(", ")}` : "Sélectionner une région"} emptyMessage="— Sélectionner une région d'abord —" />
                  <MultiSelectField label="Langue" values={oneshot.languages} onChange={setOMulti("languages")} options={filteredLanguagesO} required description={oneshot.regions.length > 0 ? `Filtré sur : ${oneshot.regions.join(", ")}` : "Sélectionner une région"} emptyMessage="— Sélectionner une région d'abord —" />

                  {combos > 1 && (
                    <div className="sm:col-span-2">
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                        </span>
                        <p className="text-xs text-indigo-700">
                          <span className="font-bold">{combos} asset names</span> seront générés ({oneshot.countries.length} pays × {oneshot.languages.length} langues)
                        </p>
                      </div>
                    </div>
                  )}

                  <SectionDivider label="Dimensions optionnelles" />
                  <TextField label="Campaign Period" value={oneshot.campaignPeriod} onChange={setO("campaignPeriod")} description="Période de la campagne (ex: APR2026, Q2_2026)" placeholder="EX: APR2026" maxLength={12} />
                  <SelectField label="Campaign Type" value={oneshot.campaignType} onChange={setO("campaignType")} options={CAMPAIGN_TYPES} description="Type de campagne" />
                  <div className="sm:col-span-2">
                    <TextField label="Campaign Name" value={oneshot.campaignName} onChange={setO("campaignName")} description="Nom court de la campagne (ex: BLACKFRIDAY)" placeholder="EX: BLACKFRIDAY" maxLength={25} />
                  </div>
                  <SelectField label="Segment" value={oneshot.segment} onChange={setO("segment")} options={SEGMENTS} description="Segment client" />
                  <SelectField label="Product" value={oneshot.product} onChange={setO("product")} options={PRODUCTS} description="Produit concerné" />
                  <SelectField label="Version" value={oneshot.version} onChange={setO("version")} options={VERSIONS} description="Variante de contenu" />
                  <SelectField label="Test" value={oneshot.test} onChange={setO("test")} options={TESTS} description="Variante A/B" />
                  <SelectField label="Step" value={oneshot.step} onChange={setO("step")} options={STEPS} description="Étape de la campagne" />
                </div>
              )}
            </div>
          </div>

          {/* ─── RESULTS PANEL ─── */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">

              {/* Result type tabs */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="grid grid-cols-4 border-b border-gray-100">
                  {tabConfig.map(({ key, label, sublabel }) => {
                    const names = getTabNames(key);
                    const hasContent = names.length > 0;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex flex-col items-center py-3 px-1 text-center transition-all border-b-2 ${
                          activeTab === key
                            ? "border-indigo-600 bg-indigo-50/50"
                            : "border-transparent hover:bg-gray-50"
                        }`}
                      >
                        <span className={`text-[10px] font-bold leading-tight ${activeTab === key ? "text-indigo-700" : "text-gray-600"}`}>{label}</span>
                        <span className={`text-[9px] mt-0.5 ${activeTab === key ? "text-indigo-400" : "text-gray-400"}`}>{sublabel}</span>
                        {hasContent && (
                          <span className={`mt-1 w-1.5 h-1.5 rounded-full ${activeTab === key ? "bg-indigo-600" : "bg-gray-300"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4">
                  {results ? (
                    activeNames.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[11px] text-gray-400">
                            {activeNames.length === 1 ? "1 résultat" : `${activeNames.length} résultats`}
                          </p>
                          <button
                            onClick={handleCopyAll}
                            className={`text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all ${
                              copiedAll ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                            }`}
                          >
                            {copiedAll ? "Copié !" : "Tout copier"}
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
                          {activeNames.map((name, i) => (
                            <ResultCard
                              key={i}
                              name={name}
                              onCopy={() => handleCopy(name, `${activeTab}-${i}`)}
                              copied={copiedIdx === `${activeTab}-${i}`}
                              limit={tabLimits[activeTab]}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-400">
                          {activeTab === "assetAcronyms" || activeTab === "assetFull"
                            ? "Sélectionnez des pays et langues\npour générer les asset names"
                            : "En cours de génération…"}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Remplissez le formulaire</p>
                      <p className="text-xs text-gray-400">Les 4 types de noms apparaîtront ici</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset */}
              {results && (
                <button
                  onClick={() => {
                    if (mode === "journey") setJourney({ brand: "", deliveryType: "", initiative: "", touchpoint: "", objective: "", channel: "", regions: [], countries: [], languages: [], segment: "", plan: "", version: "", test: "", step: "" });
                    else setOneshot({ brand: "", deliveryType: "OS", campaignPeriod: "", campaignType: "", campaignName: "", objective: "", channel: "", regions: [], countries: [], languages: [], segment: "", product: "", version: "", test: "", step: "" });
                  }}
                  className="w-full py-2 rounded-xl text-sm text-gray-400 hover:text-gray-600 hover:bg-white hover:shadow-xs border border-transparent hover:border-gray-100 transition-all"
                >
                  Réinitialiser le formulaire
                </button>
              )}

              {/* Reference examples */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Exemples de référence</p>
                <div className="space-y-2">
                  {["VK_AUT_MCL_100_ONB_EM_NA_CA_EN_B2B_FY26", "SP_OS_CO_PRM_IA_NA_US_EN_WIBYCBI_AP_2026"].map((ex) => (
                    <button key={ex} onClick={() => navigator.clipboard.writeText(ex)}
                      className="w-full text-left font-mono text-[11px] text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors border border-gray-100 hover:border-indigo-200 break-all"
                      title="Cliquer pour copier"
                    >{ex}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
