import React, { useState, useMemo } from "react";
import { CheckCircle2, ChevronDown, Copy } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BRANDS = [
  { value: "VK", label: "VK – Vosker" },
  { value: "SP", label: "SP – Spypoint" },
];
const DELIVERY_TYPES = [
  { value: "AUT", label: "AUT – Journey (automatisé)" },
  { value: "OS", label: "OS – One Shot" },
  { value: "TRX", label: "TRX – Transactionnel" },
];
const INITIATIVES = [
  { value: "CACT", label: "CACT – Camera Activation" },
  { value: "IC", label: "IC – Insiders Club" },
  { value: "SUBR", label: "SUBR – Subscription" },
  { value: "MCL", label: "MCL – Multi-cam License" },
  { value: "CO", label: "CO – Custom" },
];
const OBJECTIVES = [
  { value: "ACQ", label: "ACQ – Acquisition" },
  { value: "ONB", label: "ONB – Onboarding" },
  { value: "UPG", label: "UPG – Upsell" },
  { value: "PRM", label: "PRM – Promo" },
  { value: "XSL", label: "XSL – Cross-sell" },
  { value: "REN", label: "REN – Renewal" },
  { value: "WIN", label: "WIN – Winback" },
];
const CHANNELS = [
  { value: "EM", label: "EM – Email" },
  { value: "SMS", label: "SMS – SMS" },
  { value: "PS", label: "PS – Push" },
  { value: "IA", label: "IA – In-App" },
];
const REGIONS = [
  { value: "NA", label: "NA – Amérique du Nord" },
  { value: "EMEA", label: "EMEA – Europe / Moyen-Orient" },
  { value: "LATAM", label: "LATAM – Amérique Latine" },
];
const COUNTRIES = [
  { value: "CA", label: "CA – Canada", regions: ["NA"] },
  { value: "US", label: "US – États-Unis", regions: ["NA"] },
  { value: "UK", label: "UK – Royaume-Uni", regions: ["EMEA"] },
  { value: "FR", label: "FR – France", regions: ["EMEA"] },
  { value: "MX", label: "MX – Mexique", regions: ["LATAM"] },
];
const LANGUAGES = [
  { value: "EN", label: "EN – Anglais", regions: ["NA", "EMEA"] },
  { value: "FR", label: "FR – Français", regions: ["NA", "EMEA"] },
  { value: "ES", label: "ES – Espagnol", regions: ["LATAM", "EMEA"] },
];
const TOUCHPOINTS = [
  { value: "100", label: "100 – Étape 1" },
  { value: "200", label: "200 – Étape 2" },
  { value: "300", label: "300 – Étape 3" },
];
const SEGMENTS = [
  { value: "B2B", label: "B2B" },
  { value: "B2C", label: "B2C" },
  { value: "PROS", label: "PROS – Professionals" },
];
const PLANS = [
  { value: "FY26", label: "FY26" },
  { value: "Q1", label: "Q1" },
  { value: "Q2", label: "Q2" },
];
const VERSIONS = [{ value: "V1", label: "V1" }, { value: "V2", label: "V2" }];
const TESTS = [{ value: "A", label: "A" }, { value: "B", label: "B" }];
const STEPS = [{ value: "ST1", label: "ST1" }, { value: "ST2", label: "ST2" }];

function FieldLabel({ label, desc, required }: { label: string; desc?: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {desc && <span className="text-[10px] text-gray-400">({desc})</span>}
    </div>
  );
}

function SingleSelect({
  label,
  desc,
  required,
  options,
  value,
  onChange,
  disabled
}: {
  label: string;
  desc?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className={cn("flex flex-col", disabled && "opacity-50 pointer-events-none")}>
      <FieldLabel label={label} desc={desc} required={required} />
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
        >
          <option value="" disabled>Sélectionner...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function MultiSelect({
  label,
  desc,
  required,
  options,
  values,
  onChange,
  disabled
}: {
  label: string;
  desc?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (vals: string[]) => void;
  disabled?: boolean;
}) {
  return (
    <div className={cn("flex flex-col", disabled && "opacity-50 pointer-events-none")}>
      <FieldLabel label={label} desc={desc} required={required} />
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const isSelected = values.includes(o.value);
          return (
            <button
              key={o.value}
              onClick={() => {
                if (isSelected) {
                  onChange(values.filter((v) => v !== o.value));
                } else {
                  onChange([...values, o.value]);
                }
              }}
              className={cn(
                "px-3 py-1 rounded-full text-[12px] font-medium border transition-colors",
                isSelected
                  ? "bg-indigo-100 border-indigo-200 text-indigo-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-indigo-50"
              )}
            >
              {o.label.split(' – ')[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.1em] mb-3 pl-3 border-l-[3px] border-indigo-300">
        {title}
      </h3>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5">
        {children}
      </div>
    </div>
  );
}

function ResultCard({ title, value, limit, onCopy }: { title: string; value: string; limit?: number; onCopy: (v: string) => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    onCopy(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const length = value.length;
  const isOverLimit = limit && length > limit;
  const showBadge = limit !== undefined && value.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{title}</span>
        {showBadge && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide",
            isOverLimit ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
          )}>
            {length}/{limit}
          </span>
        )}
      </div>
      <div className="pr-12">
        <code className="text-[12px] font-mono text-gray-800 break-all">{value || <span className="text-gray-300">En attente...</span>}</code>
      </div>
      <button
        onClick={handleCopy}
        disabled={!value}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-gray-100 text-gray-500 opacity-50 group-hover:opacity-100 transition-all disabled:opacity-0"
      >
        {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export function TighterPrecision() {
  const [mode, setMode] = useState<"journey" | "oneshot">("journey");

  // Form State
  const [brand, setBrand] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [initiative, setInitiative] = useState("");
  const [objective, setObjective] = useState("");
  const [channel, setChannel] = useState("");
  
  const [regions, setRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const [touchpoint, setTouchpoint] = useState("");
  const [segment, setSegment] = useState("");
  const [plan, setPlan] = useState("");
  const [version, setVersion] = useState("");
  const [test, setTest] = useState("");
  const [step, setStep] = useState("");

  const [activeTab, setActiveTab] = useState("Nom");

  // Filtering
  const filteredCountries = useMemo(() => {
    if (regions.length === 0) return COUNTRIES;
    return COUNTRIES.filter(c => c.regions.some(r => regions.includes(r)));
  }, [regions]);

  const filteredLanguages = useMemo(() => {
    if (regions.length === 0) return LANGUAGES;
    return LANGUAGES.filter(l => l.regions.some(r => regions.includes(r)));
  }, [regions]);

  const validDeliveryTypes = mode === "journey" 
    ? DELIVERY_TYPES.filter(d => d.value !== "OS")
    : DELIVERY_TYPES.filter(d => d.value === "OS");

  const requiredFilled = brand && deliveryType && initiative && objective;

  // Compute Names
  const campaignName = requiredFilled ? [brand, deliveryType, initiative, objective].join("_") : "";
  const campaignCode = requiredFilled ? [brand, deliveryType, initiative, objective, plan].filter(Boolean).join("_") : "";
  
  const assetParts = [
    brand,
    deliveryType,
    initiative,
    touchpoint,
    objective,
    channel,
    regions.join("-"),
    countries.join("-"),
    languages.join("-"),
    segment,
    plan,
    version,
    test,
    step
  ].filter(Boolean);

  const assetName = (requiredFilled && channel && countries.length > 0 && languages.length > 0) ? assetParts.join("_") : "";

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    const all = `Name: ${campaignName}\nCode: ${campaignCode}\nAsset: ${assetName}`;
    navigator.clipboard.writeText(all);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans tracking-[0.02em] text-gray-900">
      {/* Left Panel: Form */}
      <div className="w-3/5 p-10 overflow-y-auto border-r border-gray-200">
        <div className="max-w-2xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-2">Générateur de nomenclature</h1>
            <p className="text-sm text-gray-500 mb-8">Créez des noms standardisés pour vos campagnes et assets.</p>
            
            <div className="flex bg-gray-200/50 p-1 rounded-lg w-max shadow-inner">
              <button
                onClick={() => { setMode("journey"); setDeliveryType(""); }}
                className={cn(
                  "px-5 py-2 rounded-md text-sm font-semibold transition-all",
                  mode === "journey" ? "bg-white text-indigo-700 shadow-sm border-l-[3px] border-indigo-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Journey / CRM Automatisé
              </button>
              <button
                onClick={() => { setMode("oneshot"); setDeliveryType("OS"); }}
                className={cn(
                  "px-5 py-2 rounded-md text-sm font-semibold transition-all",
                  mode === "oneshot" ? "bg-white text-indigo-700 shadow-sm border-l-[3px] border-indigo-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                One Shot / Campagne
              </button>
            </div>
          </div>

          <SectionCard title="Dimensions obligatoires">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <SingleSelect label="Marque" required options={BRANDS} value={brand} onChange={setBrand} />
              <SingleSelect label="Type d'envoi" required options={validDeliveryTypes} value={deliveryType} onChange={setDeliveryType} disabled={mode === "oneshot"} />
              <SingleSelect label="Initiative" required options={INITIATIVES} value={initiative} onChange={setInitiative} />
              <SingleSelect label="Objectif marketing" required options={OBJECTIVES} value={objective} onChange={setObjective} />
              <SingleSelect label="Canal" required options={CHANNELS} value={channel} onChange={setChannel} />
            </div>
          </SectionCard>

          <SectionCard title="Géographie">
            <div className="space-y-6">
              <MultiSelect label="Région" options={REGIONS} values={regions} onChange={setRegions} />
              <MultiSelect label="Pays" required options={filteredCountries} values={countries} onChange={setCountries} />
              <MultiSelect label="Langue" required options={filteredLanguages} values={languages} onChange={setLanguages} />
            </div>
          </SectionCard>

          <SectionCard title="Dimensions optionnelles">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <SingleSelect label="Touchpoint" desc="étape" options={TOUCHPOINTS} value={touchpoint} onChange={setTouchpoint} />
              <SingleSelect label="Segment" options={SEGMENTS} value={segment} onChange={setSegment} />
              <SingleSelect label="Planification" desc="trimestre/année" options={PLANS} value={plan} onChange={setPlan} />
              <SingleSelect label="Version" options={VERSIONS} value={version} onChange={setVersion} />
              <SingleSelect label="Test A/B" options={TESTS} value={test} onChange={setTest} />
              <SingleSelect label="Step" options={STEPS} value={step} onChange={setStep} />
            </div>
          </SectionCard>

        </div>
      </div>

      {/* Right Panel: Results */}
      <div className="w-2/5 p-10 flex flex-col h-screen sticky top-0 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
          
          <div className="mb-8 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {["Nom", "Code", "Assets (court)", "Assets (long)"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors",
                  activeTab === tab 
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4 flex-1">
            {activeTab === "Nom" && <ResultCard title="Campaign Name" value={campaignName} limit={50} onCopy={copyToClipboard} />}
            {activeTab === "Code" && <ResultCard title="Campaign Code" value={campaignCode} limit={128} onCopy={copyToClipboard} />}
            {activeTab === "Assets (court)" && <ResultCard title="Asset (court)" value={assetName} limit={100} onCopy={copyToClipboard} />}
            {activeTab === "Assets (long)" && <ResultCard title="Asset (long)" value={assetName} onCopy={copyToClipboard} />}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200/80">
            <button
              onClick={copyAll}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              <Copy className="w-4 h-4" />
              Tout copier
            </button>
            
            <div className="mt-8 space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Exemples de référence</h4>
              <div className="bg-gray-800 text-gray-100 p-4 rounded-xl text-[11px] font-mono leading-relaxed space-y-2 shadow-inner">
                <div className="opacity-90 hover:opacity-100 transition-opacity">VK_AUT_MCL_100_ONB_EM_NA_CA_EN_B2B_FY26</div>
                <div className="opacity-90 hover:opacity-100 transition-opacity">SP_OS_CO_PRM_IA_NA_US_EN_WIBYCBI_AP_2026</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
