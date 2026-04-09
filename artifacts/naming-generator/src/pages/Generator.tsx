import { useState, useMemo } from "react";
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
  region: string;
  country: string;
  language: string;
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
      {description && (
        <p className="text-xs text-slate-500 mb-0.5">{description}</p>
      )}
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
      {description && (
        <p className="text-xs text-slate-500 mb-0.5">{description}</p>
      )}
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

function NameSegment({ value, dimName }: { value: string; dimName: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col items-center">
      <span className="text-blue-300 font-mono font-bold text-lg leading-none">
        {value}
      </span>
      <span className="text-slate-600 text-[9px] uppercase tracking-widest mt-0.5">
        {dimName}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-slate-500 font-mono font-bold text-xl leading-none self-start mt-0.5">
      _
    </span>
  );
}

export default function Generator() {
  const [mode, setMode] = useState<FormMode>("journey");
  const [copied, setCopied] = useState(false);

  const [journey, setJourney] = useState<JourneyForm>({
    brand: "",
    deliveryType: "",
    initiative: "",
    touchpoint: "",
    objective: "",
    channel: "",
    region: "",
    country: "",
    language: "",
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

  const setO = (key: keyof OneShotForm) => (val: string) =>
    setOneshot((prev) => ({ ...prev, [key]: val }));

  const journeyParts = useMemo(() => {
    const parts: { value: string; dim: string }[] = [
      { value: journey.brand, dim: "BRAND" },
      { value: journey.deliveryType, dim: "TYPE" },
      { value: journey.initiative, dim: "INITIATIVE" },
      { value: journey.touchpoint, dim: "TOUCHPOINT" },
      { value: journey.objective, dim: "OBJECTIVE" },
      { value: journey.channel, dim: "CHANNEL" },
      { value: journey.region, dim: "REGION" },
      { value: journey.country, dim: "COUNTRY" },
      { value: journey.language, dim: "LANGUE" },
      { value: journey.segment, dim: "SEGMENT" },
      { value: journey.plan, dim: "PLAN" },
      { value: journey.version, dim: "VERSION" },
      { value: journey.test, dim: "TEST" },
      { value: journey.step, dim: "STEP" },
    ].filter((p) => p.value !== "");
    return parts;
  }, [journey]);

  const oneshotParts = useMemo(() => {
    const parts: { value: string; dim: string }[] = [
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
    return parts;
  }, [oneshot]);

  const activeParts = mode === "journey" ? journeyParts : oneshotParts;
  const generatedName = activeParts.map((p) => p.value).join("_");

  const charCount = generatedName.length;
  const isOverLimit = charCount > 50;

  const requiredJourney: (keyof JourneyForm)[] = [
    "brand",
    "deliveryType",
    "initiative",
    "objective",
    "channel",
    "region",
    "country",
    "language",
  ];
  const requiredOneshot: (keyof OneShotForm)[] = [
    "brand",
    "deliveryType",
    "objective",
    "channel",
    "region",
    "country",
    "language",
  ];

  const missingJourney = requiredJourney.filter((k) => !journey[k]);
  const missingOneshot = requiredOneshot.filter((k) => !oneshot[k]);
  const isValid =
    generatedName.length > 0 &&
    (mode === "journey" ? missingJourney.length === 0 : missingOneshot.length === 0);

  const handleCopy = () => {
    if (!generatedName) return;
    navigator.clipboard.writeText(generatedName).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        region: "",
        country: "",
        language: "",
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              CRM Naming Generator
            </h1>
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
              ? "BRAND _ DELIVERY_TYPE _ INITIATIVE _ TOUCHPOINT _ OBJECTIVE _ CHANNEL _ REGION _ COUNTRY _ LANGUE _ SEGMENT _ PLAN _ VERSION _ TEST _ STEP"
              : "BRAND _ DELIVERY_TYPE _ CAMPAIGNTYPE _ CAMPAIGNNAME _ OBJECTIVE _ CHANNEL _ REGION _ COUNTRY _ LANGUE _ SEGMENT _ PLAN _ FISCAL_YEAR"}
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
                  <SelectField
                    label="Brand"
                    value={journey.brand}
                    onChange={setJ("brand")}
                    options={BRANDS}
                    required
                    description="Marque concernée"
                  />
                  <SelectField
                    label="Delivery Type"
                    value={journey.deliveryType}
                    onChange={setJ("deliveryType")}
                    options={DELIVERY_TYPES.filter((d) => d.value !== "OS")}
                    required
                    description="Type d'envoi"
                  />
                  <SelectField
                    label="Initiative"
                    value={journey.initiative}
                    onChange={setJ("initiative")}
                    options={INITIATIVES}
                    required
                    description="Programme CRM global"
                  />
                  <SelectField
                    label="Objective"
                    value={journey.objective}
                    onChange={setJ("objective")}
                    options={OBJECTIVES}
                    required
                    description="Objectif marketing du message"
                  />
                  <SelectField
                    label="Channel"
                    value={journey.channel}
                    onChange={setJ("channel")}
                    options={CHANNELS}
                    required
                    description="Canal de communication"
                  />
                  <SelectField
                    label="Region"
                    value={journey.region}
                    onChange={setJ("region")}
                    options={REGIONS}
                    required
                    description="Zone géographique"
                  />
                  <SelectField
                    label="Country"
                    value={journey.country}
                    onChange={setJ("country")}
                    options={COUNTRIES}
                    required
                    description="Pays cible"
                  />
                  <SelectField
                    label="Langue"
                    value={journey.language}
                    onChange={setJ("language")}
                    options={LANGUAGES}
                    required
                    description="Langue du contenu"
                  />

                  <div className="sm:col-span-2 mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions optionnelles
                    </p>
                  </div>
                  <SelectField
                    label="Touchpoint"
                    value={journey.touchpoint}
                    onChange={setJ("touchpoint")}
                    options={TOUCHPOINTS}
                    description="Numéro d'étape dans le journey"
                  />
                  <SelectField
                    label="Segment"
                    value={journey.segment}
                    onChange={setJ("segment")}
                    options={SEGMENTS}
                    description="Segment client"
                  />
                  <SelectField
                    label="Plan"
                    value={journey.plan}
                    onChange={setJ("plan")}
                    options={PLANS}
                    description="Type de plan ou produit"
                  />
                  <SelectField
                    label="Version"
                    value={journey.version}
                    onChange={setJ("version")}
                    options={VERSIONS}
                    description="Variante de contenu"
                  />
                  <SelectField
                    label="Test"
                    value={journey.test}
                    onChange={setJ("test")}
                    options={TESTS}
                    description="Variante A/B test"
                  />
                  <SelectField
                    label="Step"
                    value={journey.step}
                    onChange={setJ("step")}
                    options={STEPS}
                    description="Étape dans le journey"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions obligatoires
                    </p>
                  </div>
                  <SelectField
                    label="Brand"
                    value={oneshot.brand}
                    onChange={setO("brand")}
                    options={BRANDS}
                    required
                    description="Marque concernée"
                  />
                  <SelectField
                    label="Delivery Type"
                    value={oneshot.deliveryType}
                    onChange={setO("deliveryType")}
                    options={DELIVERY_TYPES}
                    required
                    description="Type d'envoi (OS = One Shot)"
                  />
                  <SelectField
                    label="Campaign Type"
                    value={oneshot.campaignType}
                    onChange={setO("campaignType")}
                    options={CAMPAIGN_TYPES}
                    description="Type de campagne"
                  />
                  <TextField
                    label="Campaign Name"
                    value={oneshot.campaignName}
                    onChange={setO("campaignName")}
                    description="Nom court de la campagne (ex: WIBYCBI)"
                    placeholder="EX: BLACKFRIDAY"
                    maxLength={20}
                  />
                  <SelectField
                    label="Objective"
                    value={oneshot.objective}
                    onChange={setO("objective")}
                    options={OBJECTIVES}
                    required
                    description="Objectif marketing"
                  />
                  <SelectField
                    label="Channel"
                    value={oneshot.channel}
                    onChange={setO("channel")}
                    options={CHANNELS}
                    required
                    description="Canal de communication"
                  />
                  <SelectField
                    label="Region"
                    value={oneshot.region}
                    onChange={setO("region")}
                    options={REGIONS}
                    required
                    description="Zone géographique"
                  />
                  <SelectField
                    label="Country"
                    value={oneshot.country}
                    onChange={setO("country")}
                    options={COUNTRIES}
                    required
                    description="Pays cible"
                  />
                  <SelectField
                    label="Langue"
                    value={oneshot.language}
                    onChange={setO("language")}
                    options={LANGUAGES}
                    required
                    description="Langue du contenu"
                  />

                  <div className="sm:col-span-2 mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                      Dimensions optionnelles
                    </p>
                  </div>
                  <SelectField
                    label="Segment"
                    value={oneshot.segment}
                    onChange={setO("segment")}
                    options={SEGMENTS}
                    description="Segment client"
                  />
                  <SelectField
                    label="Plan"
                    value={oneshot.plan}
                    onChange={setO("plan")}
                    options={PLANS}
                    description="Type de plan ou produit"
                  />
                  <SelectField
                    label="Fiscal Year"
                    value={oneshot.fiscalYear}
                    onChange={setO("fiscalYear")}
                    options={FISCAL_YEARS}
                    description="Année fiscale (reporting)"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">

              {/* Generated name */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Nom généré
                </p>

                {generatedName ? (
                  <>
                    {/* Visual breakdown */}
                    <div className="flex flex-wrap gap-x-1 gap-y-2 items-start mb-4 min-h-[3rem]">
                      {activeParts.map((part, i) => (
                        <div key={i} className="flex items-start gap-1">
                          {i > 0 && <Separator />}
                          <NameSegment value={part.value} dimName={part.dim} />
                        </div>
                      ))}
                    </div>

                    {/* Full string */}
                    <div
                      className={`bg-slate-950 rounded-lg px-3 py-3 font-mono text-sm break-all leading-relaxed mb-3 border ${
                        isOverLimit ? "border-orange-500/50 text-orange-300" : "border-slate-800 text-blue-300"
                      }`}
                    >
                      {generatedName}
                    </div>

                    {/* Char counter */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono ${isOverLimit ? "text-orange-400" : "text-slate-500"}`}>
                        {charCount} / 50 caractères
                        {isOverLimit && " — dépassement"}
                      </span>
                      {isOverLimit && (
                        <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded px-2 py-0.5">
                          Trop long
                        </span>
                      )}
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={handleCopy}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 hover:bg-blue-500 text-white"
                      }`}
                    >
                      {copied ? "Copié !" : "Copier le nom"}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">
                      Remplissez les champs<br />pour générer un nom
                    </p>
                  </div>
                )}
              </div>

              {/* Validation status */}
              {generatedName && !isValid && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Champs requis manquants
                  </p>
                  <div className="space-y-1">
                    {(mode === "journey" ? missingJourney : missingOneshot).map((k) => (
                      <div key={k} className="flex items-center gap-2 text-xs text-orange-400">
                        <span className="w-1 h-1 rounded-full bg-orange-400 inline-block" />
                        {k.charAt(0).toUpperCase() + k.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset */}
              {generatedName && (
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
                  {[
                    "VK_AUT_MCL_100_ONB_EM_NA_CA_EN_B2B_FY26",
                    "SP_OS_CO_PRM_IA_NA_US_EN_WIBYCBI_AP_2026",
                  ].map((ex) => (
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
