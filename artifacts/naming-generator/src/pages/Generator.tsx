import { useState, useMemo, useRef, useEffect } from "react";
import {
  BRANDS,
  DELIVERY_TYPES,
  INITIATIVES,
  TOUCHPOINTS,
  OBJECTIVES,
  CHANNELS,
  REGIONS,
  COUNTRIES,
  LANGUAGES,
  SEGMENTS,
  PLANS,
  VERSIONS,
  TESTS,
  STEPS,
  FISCAL_YEARS,
  CAMPAIGN_TYPES,
  getCountryRegion,
} from "@/data/nomenclature";
import type { NomenclatureOption } from "@/data/nomenclature";

type FormMode = "journey" | "oneshot";

type JourneyForm = {
  brand: string;
  deliveryType: string;
  initiative: string;
  touchpoint: string;
  objective: string;
  channel: string;
  regions: string[];
  countries: string[];
  languages: string[];
  segment: string;
  plan: string;
  version: string;
  test: string;
  step: string;
};

type OneShotForm = {
  brand: string;
  deliveryType: string;
  campaignType: string;
  campaignName: string;
  objective: string;
  channel: string;
  region: string;
  country: string;
  language: string;
  segment: string;
  plan: string;
  fiscalYear: string;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  placeholder,
  description,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: NomenclatureOption[];
  required?: boolean;
  placeholder?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
        {required && <span className="text-blue-400 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-slate-500 mb-0.5">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:border-slate-600"
      >
        <option value="">{placeholder || "— Choisir —"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  placeholder,
  description,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  description?: string;
  maxLength?: number;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "");
    onChange(val);
  };
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
        {required && <span className="text-blue-400 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-slate-500 mb-0.5">{description}</p>}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={maxLength || 20}
        placeholder={placeholder || ""}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-slate-600"
      />
    </div>
  );
}

function MultiSelectField({
  label,
  values,
  onChange,
  options,
  required,
  description,
  emptyMessage,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  options: NomenclatureOption[];
  required?: boolean;
  description?: string;
  emptyMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  const disabled = options.length === 0;

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
        {required && <span className="text-blue-400 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-slate-500 mb-0.5">{description}</p>}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={`w-full flex items-center justify-between bg-slate-800 border rounded-lg px-3 py-2.5 text-sm text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled
              ? "border-slate-800 text-slate-600 cursor-not-allowed"
              : open
              ? "border-blue-500 text-slate-100"
              : "border-slate-700 text-slate-100 hover:border-slate-600 cursor-pointer"
          }`}
        >
          <span className="truncate">
            {disabled
              ? emptyMessage || "— Sélectionner une région d'abord —"
              : values.length === 0
              ? "— Choisir (multi) —"
              : values.join(", ")}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`ml-2 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""} ${disabled ? "text-slate-700" : "text-slate-400"}`}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
            <div className="max-h-52 overflow-y-auto">
              {options.map((opt) => {
                const checked = values.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-slate-700 transition-colors ${
                      checked ? "text-blue-300" : "text-slate-200"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${
                        checked ? "bg-blue-600 border-blue-600" : "border-slate-600"
                      }`}
                    >
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
              <div className="border-t border-slate-700 px-3 py-2">
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
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
            <span
              key={v}
              className="inline-flex items-center gap-1 bg-blue-900/40 text-blue-300 border border-blue-800/50 rounded px-2 py-0.5 text-xs font-mono"
            >
              {v}
              <button
                type="button"
                onClick={() => toggle(v)}
                className="hover:text-blue-100 transition-colors leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Generator() {
  const [mode, setMode] = useState<FormMode>("journey");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const [journey, setJourney] = useState<JourneyForm>({
    brand: "",
    deliveryType: "",
    initiative: "",
    touchpoint: "",
    objective: "",
    channel: "",
    regions: [],
    countries: [],
    languages: [],
    segment: "",
    plan: "",
    version: "",
    test: "",
    step: "",
  });

  const [oneshot, setOneshot] = useState<OneShotForm>({
    brand: "",
    deliveryType: "OS",
    campaignType: "",
    campaignName: "",
    objective: "",
    channel: "",
    region: "",
    country: "",
    language: "",
    segment: "",
    plan: "",
    fiscalYear: "",
  });

  const setJ = (key: keyof JourneyForm) => (val: string) =>
    setJourney((prev) => ({ ...prev, [key]: val }));

  const setJMulti = (key: "regions" | "countries" | "languages") => (vals: string[]) => {
    if (key === "regions") {
      setJourney((prev) => {
        const newCountries = prev.countries.filter((c) => {
          const entry = COUNTRIES.find((e) => e.value === c);
          return entry && entry.regions.some((r) => vals.includes(r));
        });
        const newLanguages = prev.languages.filter((l) => {
          const entry = LANGUAGES.find((e) => e.value === l);
          return entry && entry.regions.some((r) => vals.includes(r));
        });
        return { ...prev, regions: vals, countries: newCountries, languages: newLanguages };
      });
    } else {
      setJourney((prev) => ({ ...prev, [key]: vals }));
    }
  };

  const setO = (key: keyof OneShotForm) => (val: string) =>
    setOneshot((prev) => ({ ...prev, [key]: val }));

  const filteredCountries = useMemo(() => {
    if (journey.regions.length === 0) return COUNTRIES;
    return COUNTRIES.filter((c) => c.regions.some((r) => journey.regions.includes(r)));
  }, [journey.regions]);

  const filteredLanguages = useMemo(() => {
    if (journey.regions.length === 0) return LANGUAGES;
    return LANGUAGES.filter((l) => l.regions.some((r) => journey.regions.includes(r)));
  }, [journey.regions]);

  const generatedNames = useMemo(() => {
    if (mode !== "journey") return [];
    const base = [
      journey.brand,
      journey.deliveryType,
      journey.initiative,
      journey.touchpoint,
      journey.objective,
      journey.channel,
    ];
    if (base.some((v) => !v)) return [];

    const effCountries = journey.countries.length > 0 ? journey.countries : [""];
    const effLanguages = journey.languages.length > 0 ? journey.languages : [""];

    const names: string[] = [];
    for (const country of effCountries) {
      for (const lang of effLanguages) {
        const region = country ? getCountryRegion(country) : (journey.regions[0] || "");
        const parts = [
          journey.brand,
          journey.deliveryType,
          journey.initiative,
          journey.touchpoint,
          journey.objective,
          journey.channel,
          region,
          country,
          lang,
          journey.segment,
          journey.plan,
          journey.version,
          journey.test,
          journey.step,
        ].filter(Boolean);
        names.push(parts.join("_"));
      }
    }
    return names;
  }, [journey]);

  const oneshotParts = useMemo(() => {
    return [
      { value: oneshot.brand, dim: "BRAND" },
      { value: oneshot.deliveryType, dim: "TYPE" },
      { value: oneshot.campaignType, dim: "CAMP.TYPE" },
      { value: oneshot.campaignName, dim: "CAMP.NAME" },
      { value: oneshot.objective, dim: "OBJECTIVE" },
      { value: oneshot.channel, dim: "CHANNEL" },
      { value: oneshot.region, dim: "REGION" },
      { value: oneshot.country, dim: "COUNTRY" },
      { value: oneshot.language, dim: "LANGUE" },
      { value: oneshot.segment, dim: "SEGMENT" },
      { value: oneshot.plan, dim: "PLAN" },
      { value: oneshot.fiscalYear, dim: "FISCAL YEAR" },
    ].filter((p) => p.value !== "");
  }, [oneshot]);

  const oneshotName = oneshotParts.map((p) => p.value).join("_");

  const handleCopy = (name: string, idx: number) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const handleCopyAll = () => {
    const all = mode === "journey" ? generatedNames : [oneshotName];
    navigator.clipboard.writeText(all.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const handleReset = () => {
    if (mode === "journey") {
      setJourney({
        brand: "",
        deliveryType: "",
        initiative: "",
        touchpoint: "",
        objective: "",
        channel: "",
        regions: [],
        countries: [],
        languages: [],
        segment: "",
        plan: "",
        version: "",
        test: "",
        step: "",
      });
    } else {
      setOneshot({
        brand: "",
        deliveryType: "OS",
        campaignType: "",
        campaignName: "",
        objective: "",
        channel: "",
        region: "",
        country: "",
        language: "",
        segment: "",
        plan: "",
        fiscalYear: "",
      });
    }
  };

  const journeyMissingRequired =
    !journey.brand ||
    !journey.deliveryType ||
    !journey.initiative ||
    !journey.objective ||
    !journey.channel;

  const hasResults =
    mode === "journey" ? generatedNames.length > 0 : oneshotName.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">CRM Naming Generator</h1>
          </div>
          <p className="text-slate-400 text-sm ml-11">
            Générez des noms d'assets CRM conformes à la nomenclature standardisée
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setMode("journey")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              mode === "journey"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            Journey / CRM Automatisé
          </button>
          <button
            onClick={() => setMode("oneshot")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              mode === "oneshot"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            One Shot / Campagne
          </button>
        </div>

        {/* Format reference */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">
            Format {mode === "journey" ? "Journey" : "One Shot"}
          </p>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            {mode === "journey"
              ? "BRAND _ DELIVERY_TYPE _ INITIATIVE _ [TOUCHPOINT] _ OBJECTIVE _ CHANNEL _ REGION _ COUNTRY _ LANGUE _ [SEGMENT] _ [PLAN] _ [VERSION] _ [TEST] _ [STEP]"
              : "BRAND _ DELIVERY_TYPE _ [CAMPAIGNTYPE] _ [CAMPAIGNNAME] _ OBJECTIVE _ CHANNEL _ REGION _ COUNTRY _ LANGUE _ [SEGMENT] _ [PLAN] _ [FISCAL_YEAR]"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              {mode === "journey" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions obligatoires
                    </p>
                  </div>

                  <SelectField label="Brand" value={journey.brand} onChange={setJ("brand")} options={BRANDS} required description="Marque concernée" />
                  <SelectField label="Delivery Type" value={journey.deliveryType} onChange={setJ("deliveryType")} options={DELIVERY_TYPES.filter((d) => d.value !== "OS")} required description="Type d'envoi" />
                  <SelectField label="Initiative" value={journey.initiative} onChange={setJ("initiative")} options={INITIATIVES} required description="Programme CRM global" />
                  <SelectField label="Objective" value={journey.objective} onChange={setJ("objective")} options={OBJECTIVES} required description="Objectif marketing du message" />
                  <SelectField label="Channel" value={journey.channel} onChange={setJ("channel")} options={CHANNELS} required description="Canal de communication" />

                  <div className="sm:col-span-2 mt-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Géographie — multi-sélection &amp; filtrage dynamique
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <MultiSelectField
                      label="Region"
                      values={journey.regions}
                      onChange={setJMulti("regions")}
                      options={REGIONS}
                      required
                      description="Zones géographiques — filtre dynamiquement Country et Langue"
                    />
                  </div>

                  <MultiSelectField
                    label="Country"
                    values={journey.countries}
                    onChange={setJMulti("countries")}
                    options={filteredCountries}
                    required
                    description={journey.regions.length > 0 ? `Filtrés sur : ${journey.regions.join(", ")}` : "Sélectionner une région d'abord"}
                    emptyMessage="— Sélectionner une région d'abord —"
                  />

                  <MultiSelectField
                    label="Langue"
                    values={journey.languages}
                    onChange={setJMulti("languages")}
                    options={filteredLanguages}
                    required
                    description={journey.regions.length > 0 ? `Filtrées sur : ${journey.regions.join(", ")}` : "Sélectionner une région d'abord"}
                    emptyMessage="— Sélectionner une région d'abord —"
                  />

                  {journey.countries.length > 0 && journey.languages.length > 0 && (
                    <div className="sm:col-span-2">
                      <div className="bg-blue-950/40 border border-blue-800/30 rounded-lg px-4 py-2.5 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400 flex-shrink-0">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4M12 16h.01" />
                        </svg>
                        <p className="text-xs text-blue-300">
                          <span className="font-semibold">{journey.countries.length * journey.languages.length} noms</span>{" "}
                          seront générés ({journey.countries.length} pays x {journey.languages.length} langues)
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-2 mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions optionnelles
                    </p>
                  </div>

                  <SelectField label="Touchpoint" value={journey.touchpoint} onChange={setJ("touchpoint")} options={TOUCHPOINTS} description="Numéro d'étape dans le journey" />
                  <SelectField label="Segment" value={journey.segment} onChange={setJ("segment")} options={SEGMENTS} description="Segment client" />
                  <SelectField label="Plan" value={journey.plan} onChange={setJ("plan")} options={PLANS} description="Type de plan ou produit" />
                  <SelectField label="Version" value={journey.version} onChange={setJ("version")} options={VERSIONS} description="Variante de contenu" />
                  <SelectField label="Test" value={journey.test} onChange={setJ("test")} options={TESTS} description="Variante A/B test" />
                  <SelectField label="Step" value={journey.step} onChange={setJ("step")} options={STEPS} description="Étape dans le journey" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions obligatoires
                    </p>
                  </div>
                  <SelectField label="Brand" value={oneshot.brand} onChange={setO("brand")} options={BRANDS} required description="Marque concernée" />
                  <SelectField label="Delivery Type" value={oneshot.deliveryType} onChange={setO("deliveryType")} options={DELIVERY_TYPES} required description="Type d'envoi (OS = One Shot)" />
                  <SelectField label="Campaign Type" value={oneshot.campaignType} onChange={setO("campaignType")} options={CAMPAIGN_TYPES} description="Type de campagne" />
                  <TextField label="Campaign Name" value={oneshot.campaignName} onChange={setO("campaignName")} description="Nom court de la campagne (ex: WIBYCBI)" placeholder="EX: BLACKFRIDAY" maxLength={20} />
                  <SelectField label="Objective" value={oneshot.objective} onChange={setO("objective")} options={OBJECTIVES} required description="Objectif marketing" />
                  <SelectField label="Channel" value={oneshot.channel} onChange={setO("channel")} options={CHANNELS} required description="Canal de communication" />
                  <SelectField label="Region" value={oneshot.region} onChange={setO("region")} options={REGIONS} required description="Zone géographique" />
                  <SelectField label="Country" value={oneshot.country} onChange={setO("country")} options={COUNTRIES} required description="Pays cible" />
                  <SelectField label="Langue" value={oneshot.language} onChange={setO("language")} options={LANGUAGES} required description="Langue du contenu" />
                  <div className="sm:col-span-2 mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions optionnelles
                    </p>
                  </div>
                  <SelectField label="Segment" value={oneshot.segment} onChange={setO("segment")} options={SEGMENTS} description="Segment client" />
                  <SelectField label="Plan" value={oneshot.plan} onChange={setO("plan")} options={PLANS} description="Type de plan ou produit" />
                  <SelectField label="Fiscal Year" value={oneshot.fiscalYear} onChange={setO("fiscalYear")} options={FISCAL_YEARS} description="Année fiscale (reporting)" />
                </div>
              )}
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    {mode === "journey" && generatedNames.length > 1
                      ? `${generatedNames.length} noms générés`
                      : "Nom généré"}
                  </p>
                  {hasResults && (
                    <button
                      onClick={handleCopyAll}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        copiedAll
                          ? "bg-green-600/20 text-green-400 border border-green-600/30"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                      }`}
                    >
                      {copiedAll ? "Copié !" : "Copier tout"}
                    </button>
                  )}
                </div>

                {hasResults ? (
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {(mode === "journey" ? generatedNames : [oneshotName]).map((name, i) => {
                      const isOver = name.length > 50;
                      return (
                        <div
                          key={i}
                          className={`group flex items-start gap-2 bg-slate-950 rounded-lg px-3 py-2.5 border transition-colors ${
                            isOver ? "border-orange-500/40 hover:border-orange-500/60" : "border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <span className={`font-mono text-xs break-all leading-relaxed flex-1 ${isOver ? "text-orange-300" : "text-blue-300"}`}>
                            {name}
                          </span>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleCopy(name, i)}
                              className={`text-xs px-2 py-1 rounded font-medium transition-all ${
                                copiedIdx === i
                                  ? "bg-green-600/20 text-green-400"
                                  : "bg-slate-800 text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              {copiedIdx === i ? "✓" : "Copier"}
                            </button>
                            <span className={`text-[10px] font-mono ${isOver ? "text-orange-500" : "text-slate-600"}`}>
                              {name.length}c{isOver ? " !" : ""}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">
                      {mode === "journey" && journeyMissingRequired
                        ? "Remplissez les champs obligatoires"
                        : "Sélectionnez des pays et langues\npour générer les noms"}
                    </p>
                  </div>
                )}
              </div>

              {hasResults && (
                <button
                  onClick={handleReset}
                  className="w-full py-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
                >
                  Réinitialiser
                </button>
              )}

              {/* Examples */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Exemples de noms valides
                </p>
                <div className="space-y-2">
                  {["VK_AUT_MCL_100_ONB_EM_NA_CA_EN_B2B_FY26", "SP_OS_CO_PRM_IA_NA_US_EN_WIBYCBI_AP_2026"].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => navigator.clipboard.writeText(ex)}
                      className="w-full text-left font-mono text-xs text-slate-400 bg-slate-950 hover:text-blue-300 px-3 py-2 rounded-lg transition-colors border border-slate-800 hover:border-slate-700 break-all"
                      title="Cliquer pour copier"
                    >
                      {ex}
                    </button>
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
