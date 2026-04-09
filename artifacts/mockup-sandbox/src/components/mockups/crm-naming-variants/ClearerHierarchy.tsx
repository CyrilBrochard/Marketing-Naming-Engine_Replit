import React, { useState, useMemo } from 'react';
import { Check, Copy, Info, RefreshCcw, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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
const VERSIONS = [
  { value: "V1", label: "V1" },
  { value: "V2", label: "V2" },
];
const TESTS = [{ value: "A", label: "A" }, { value: "B", label: "B" }];
const STEPS = [
  { value: "ST1", label: "ST1" },
  { value: "ST2", label: "ST2" },
];

function MultiSelect({ options, values, onChange, placeholder }: { options: any[], values: string[], onChange: (v: string[]) => void, placeholder: string }) {
  return (
    <div className="flex flex-wrap gap-2 min-h-10 p-1.5 border border-gray-200 rounded-md bg-white">
      {options.map((opt) => {
        const isSelected = values.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => {
              if (isSelected) {
                onChange(values.filter(v => v !== opt.value));
              } else {
                onChange([...values, opt.value]);
              }
            }}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              isSelected 
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-200' 
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {opt.label.split(' – ')[0]}
          </button>
        );
      })}
    </div>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-gray-50/80 rounded-lg p-5 border border-gray-100/50 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-700">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className={`text-[11px] uppercase tracking-wider font-medium ${required ? 'text-gray-600' : 'text-gray-400'}`}>
        {label} {required && <span className="text-indigo-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

export function ClearerHierarchy() {
  const [mode, setMode] = useState("journey");
  
  const [brand, setBrand] = useState("");
  const [delivery, setDelivery] = useState("");
  const [initiative, setInitiative] = useState("");
  const [objective, setObjective] = useState("");
  const [channel, setChannel] = useState("");
  const [touchpoint, setTouchpoint] = useState("");
  
  const [regions, setRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  
  const [segment, setSegment] = useState("");
  const [plan, setPlan] = useState("");
  const [version, setVersion] = useState("");
  const [test, setTest] = useState("");
  const [step, setStep] = useState("");
  
  const [copied, setCopied] = useState("");
  
  const reset = () => {
    setBrand(""); setDelivery(""); setInitiative(""); setObjective(""); setChannel(""); setTouchpoint("");
    setRegions([]); setCountries([]); setLanguages([]);
    setSegment(""); setPlan(""); setVersion(""); setTest(""); setStep("");
  };

  const filteredCountries = useMemo(() => {
    if (regions.length === 0) return COUNTRIES;
    return COUNTRIES.filter(c => c.regions.some(r => regions.includes(r)));
  }, [regions]);

  const filteredLanguages = useMemo(() => {
    if (regions.length === 0) return LANGUAGES;
    return LANGUAGES.filter(l => l.regions.some(r => regions.includes(r)));
  }, [regions]);
  
  const hasRequired = brand && delivery && initiative && objective;
  const isReadyForAssets = hasRequired && channel && countries.length > 0 && languages.length > 0;
  
  const campaignName = hasRequired ? [brand, delivery, initiative, objective].join('_') : "";
  
  const getLabel = (arr: any[], val: string) => arr.find(x => x.value === val)?.label.split(' – ')[1] || val;
  const campaignCode = hasRequired ? [getLabel(BRANDS, brand), getLabel(DELIVERY_TYPES, delivery), getLabel(INITIATIVES, initiative), getLabel(OBJECTIVES, objective)].join('_') : "";
  
  const assets: string[] = [];
  const assetLabels: string[] = [];
  
  if (isReadyForAssets) {
    countries.forEach(c => {
      languages.forEach(l => {
        const parts = [brand, delivery, initiative, touchpoint, objective, channel, regions.join('-') || 'NA', c, l, segment, plan, version, test, step].filter(Boolean);
        assets.push(parts.join('_'));
        
        const lparts = [
          getLabel(BRANDS, brand), getLabel(DELIVERY_TYPES, delivery), getLabel(INITIATIVES, initiative), 
          touchpoint, getLabel(OBJECTIVES, objective), getLabel(CHANNELS, channel), regions.join('-') || 'NA', 
          c, l, segment, plan, version, test, step
        ].filter(Boolean);
        assetLabels.push(lparts.join('_'));
      });
    });
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };
  
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex">
      {/* LEFT PANEL: Form */}
      <div className="w-[60%] border-r border-gray-200 bg-white flex flex-col h-screen">
        <div className="flex-none p-6 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Nomenclature Generator</h1>
            <p className="text-sm text-gray-500 mt-1">Générez vos noms de campagnes et assets CRM.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={reset}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="journey" onValueChange={setMode} className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="journey">Journey / Automatisé</TabsTrigger>
              <TabsTrigger value="oneshot">One Shot / Campagne</TabsTrigger>
            </TabsList>
          </Tabs>

          <Section title="Dimensions obligatoires">
            <Field label="Brand" required>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {BRANDS.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Delivery Type" required>
              <Select value={delivery} onValueChange={setDelivery}>
                <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {DELIVERY_TYPES.filter(d => mode === 'journey' ? d.value !== 'OS' : true).map(d => 
                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Initiative" required>
              <Select value={initiative} onValueChange={setInitiative}>
                <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {INITIATIVES.map(i => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Objectif marketing" required>
              <Select value={objective} onValueChange={setObjective}>
                <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {OBJECTIVES.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Channel" required>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {CHANNELS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </Section>

          <Section title="Géographie — filtrage dynamique">
            <div className="col-span-2">
              <Field label="Régions" required>
                <MultiSelect options={REGIONS} values={regions} onChange={setRegions} placeholder="Sélectionner régions" />
              </Field>
            </div>
            <Field label="Pays" required>
              <MultiSelect options={filteredCountries} values={countries} onChange={setCountries} placeholder="Pays" />
            </Field>
            <Field label="Langues" required>
              <MultiSelect options={filteredLanguages} values={languages} onChange={setLanguages} placeholder="Langues" />
            </Field>
          </Section>

          <Section title="Dimensions optionnelles">
            <Field label="Touchpoint">
              <Select value={touchpoint} onValueChange={setTouchpoint}>
                <SelectTrigger><SelectValue placeholder="Optionnel" /></SelectTrigger>
                <SelectContent>
                  {TOUCHPOINTS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Segment">
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger><SelectValue placeholder="Optionnel" /></SelectTrigger>
                <SelectContent>
                  {SEGMENTS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Plan">
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger><SelectValue placeholder="Optionnel" /></SelectTrigger>
                <SelectContent>
                  {PLANS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Version">
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger><SelectValue placeholder="Optionnel" /></SelectTrigger>
                <SelectContent>
                  {VERSIONS.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Test A/B">
              <Select value={test} onValueChange={setTest}>
                <SelectTrigger><SelectValue placeholder="Optionnel" /></SelectTrigger>
                <SelectContent>
                  {TESTS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Step">
              <Select value={step} onValueChange={setStep}>
                <SelectTrigger><SelectValue placeholder="Optionnel" /></SelectTrigger>
                <SelectContent>
                  {STEPS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </Section>
        </div>
      </div>

      {/* RIGHT PANEL: Results */}
      <div className="w-[40%] bg-gray-50 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {!hasRequired ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Choisissez vos dimensions <ArrowRight className="inline-block w-4 h-4 ml-1 text-indigo-500" /></h3>
              <p className="text-sm text-gray-500 max-w-[280px]">
                Remplissez les dimensions obligatoires pour générer votre nomenclature.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-indigo-50/50 border-l-2 border-indigo-200 p-4 rounded-r-lg">
                <p className="font-mono text-[11.5px] text-indigo-900/80 leading-relaxed break-all">
                  [Brand]_[DeliveryType]_[Initiative]_[Touchpoint]_[Objective]_[Channel]_[Region]_[Country]_[Lang]_[Segment]_[Plan]_[Version]_[Test]_[Step]
                </p>
              </div>

              {assets.length > 0 && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-gray-200 text-sm shadow-sm">
                  <Info className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium text-gray-900">{assets.length}</span>
                  <span className="text-gray-500">assets seront générés</span>
                </div>
              )}

              <Tabs defaultValue="campaign-name" className="w-full">
                <TabsList className="w-full h-auto p-1 bg-gray-100/80 grid grid-cols-4">
                  <TabsTrigger value="campaign-name" className="flex flex-col items-center py-2 data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none bg-transparent shadow-none">
                    <span className="text-[11px] font-medium">Campaign Name</span>
                    <span className="text-[9px] text-gray-400 mt-0.5">≤50 chars</span>
                  </TabsTrigger>
                  <TabsTrigger value="campaign-code" className="flex flex-col items-center py-2 data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none bg-transparent shadow-none">
                    <span className="text-[11px] font-medium">Campaign Code</span>
                    <span className="text-[9px] text-gray-400 mt-0.5">≤128 chars</span>
                  </TabsTrigger>
                  <TabsTrigger value="asset-acronyms" className="flex flex-col items-center py-2 data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none bg-transparent shadow-none">
                    <span className="text-[11px] font-medium">Asset · Acronymes</span>
                    <span className="text-[9px] text-gray-400 mt-0.5">≤100 chars</span>
                  </TabsTrigger>
                  <TabsTrigger value="asset-complet" className="flex flex-col items-center py-2 data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none bg-transparent shadow-none">
                    <span className="text-[11px] font-medium">Asset · Complet</span>
                    <span className="text-[9px] text-gray-400 mt-0.5">Full labels</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-4 space-y-4">
                  <TabsContent value="campaign-name" className="m-0">
                    <Card className="p-4 relative group">
                      <p className="font-mono text-sm text-gray-900 break-all pr-10">{campaignName}</p>
                      <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCopy(campaignName, 'cn')}>
                        {copied === 'cn' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </Button>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="campaign-code" className="m-0">
                    <Card className="p-4 relative group">
                      <p className="font-mono text-sm text-gray-900 break-all pr-10">{campaignCode}</p>
                      <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCopy(campaignCode, 'cc')}>
                        {copied === 'cc' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      </Button>
                    </Card>
                  </TabsContent>

                  <TabsContent value="asset-acronyms" className="m-0 space-y-3">
                    {assets.length === 0 ? (
                      <div className="text-sm text-gray-500 text-center py-8">Sélectionnez au moins un pays et une langue</div>
                    ) : (
                      <>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-indigo-600 text-xs h-7" onClick={() => handleCopy(assets.join('\n'), 'all-a')}>
                            {copied === 'all-a' ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
                            Tout copier
                          </Button>
                        </div>
                        {assets.map((a, i) => (
                          <Card key={i} className="p-3 relative group text-xs">
                            <p className="font-mono text-gray-900 break-all pr-8">{a}</p>
                            <Button size="icon" variant="ghost" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCopy(a, `a-${i}`)}>
                              {copied === `a-${i}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-500" />}
                            </Button>
                          </Card>
                        ))}
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="asset-complet" className="m-0 space-y-3">
                    {assetLabels.length === 0 ? (
                      <div className="text-sm text-gray-500 text-center py-8">Sélectionnez au moins un pays et une langue</div>
                    ) : (
                      <>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-indigo-600 text-xs h-7" onClick={() => handleCopy(assetLabels.join('\n'), 'all-l')}>
                            {copied === 'all-l' ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
                            Tout copier
                          </Button>
                        </div>
                        {assetLabels.map((a, i) => (
                          <Card key={i} className="p-3 relative group text-xs bg-white">
                            <p className="font-mono text-gray-900 break-all pr-8">{a}</p>
                            <Button size="icon" variant="ghost" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCopy(a, `l-${i}`)}>
                              {copied === `l-${i}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-500" />}
                            </Button>
                          </Card>
                        ))}
                      </>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </div>
        
        {/* Reference examples footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-100/50">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Exemples de référence</h4>
          <div className="space-y-1 text-[11px] font-mono text-gray-400">
            <p>VK_AUT_MCL_100_ONB_EM_NA_CA_EN_B2B_FY26</p>
            <p>SP_OS_CO_PRM_IA_NA_US_EN_WIBYCBI_AP_2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}