export type NomenclatureOption = {
  value: string;
  label: string;
};

export type Dimension = {
  id: string;
  label: string;
  description?: string;
  required: boolean;
  options: NomenclatureOption[];
  freeText?: boolean;
};

export const BRANDS: NomenclatureOption[] = [
  { value: "VK", label: "VK – Vosker" },
  { value: "SP", label: "SP – Spypoint" },
];

export const DELIVERY_TYPES: NomenclatureOption[] = [
  { value: "AUT", label: "AUT – Journey (automatisé)" },
  { value: "OS", label: "OS – One Shot (campagne ponctuelle)" },
  { value: "TRX", label: "TRX – Transactionnel" },
];

export const INITIATIVES: NomenclatureOption[] = [
  { value: "CACT", label: "CACT – Camera Activation" },
  { value: "IC", label: "IC – Insiders Club" },
  { value: "SUBR", label: "SUBR – Subscription" },
  { value: "MCL", label: "MCL – Multi-cam License" },
  { value: "CO", label: "CO – Custom/Autre" },
];

export const TOUCHPOINTS: NomenclatureOption[] = [
  { value: "100", label: "100 – Étape 1" },
  { value: "101", label: "101" },
  { value: "102", label: "102" },
  { value: "200", label: "200 – Étape 2" },
  { value: "201", label: "201" },
  { value: "202", label: "202" },
  { value: "300", label: "300 – Étape 3" },
];

export const OBJECTIVES: NomenclatureOption[] = [
  { value: "ACQ", label: "ACQ – Acquisition" },
  { value: "ONB", label: "ONB – Onboarding" },
  { value: "UPG", label: "UPG – Upsell" },
  { value: "PRM", label: "PRM – Promo" },
  { value: "XSL", label: "XSL – Cross-sell" },
  { value: "REN", label: "REN – Renewal" },
  { value: "WIN", label: "WIN – Winback" },
  { value: "EDU", label: "EDU – Education" },
  { value: "ANN", label: "ANN – Announcement" },
  { value: "CRT", label: "CRT – Cart Abandon" },
  { value: "BRW", label: "BRW – Browse Abandon" },
  { value: "SUR", label: "SUR – Survey" },
  { value: "NPS", label: "NPS – NPS" },
  { value: "SUP", label: "SUP – Support" },
];

export const CHANNELS: NomenclatureOption[] = [
  { value: "EM", label: "EM – Email" },
  { value: "SMS", label: "SMS – SMS" },
  { value: "PS", label: "PS – Push" },
  { value: "IA", label: "IA – In-App" },
  { value: "IB", label: "IB – Inbox" },
  { value: "LP", label: "LP – Landing Page" },
  { value: "AD", label: "AD – Ad Audience" },
];

export const REGIONS: NomenclatureOption[] = [
  { value: "NA", label: "NA – Amérique du Nord" },
  { value: "EMEA", label: "EMEA – Europe / Moyen-Orient / Afrique" },
  { value: "LATAM", label: "LATAM – Amérique Latine" },
  { value: "APAC", label: "APAC – Asie-Pacifique" },
];

export const COUNTRIES: NomenclatureOption[] = [
  { value: "CA", label: "CA – Canada" },
  { value: "US", label: "US – États-Unis" },
  { value: "UK", label: "UK – Royaume-Uni" },
  { value: "FR", label: "FR – France" },
  { value: "DE", label: "DE – Allemagne" },
  { value: "SP", label: "SP – Espagne" },
  { value: "IT", label: "IT – Italie" },
];

export const LANGUAGES: NomenclatureOption[] = [
  { value: "FR", label: "FR – Français" },
  { value: "EN", label: "EN – Anglais" },
  { value: "ES", label: "ES – Espagnol" },
  { value: "DE", label: "DE – Allemand" },
  { value: "IT", label: "IT – Italien" },
];

export const SEGMENTS: NomenclatureOption[] = [
  { value: "B2C", label: "B2C – Business to Consumer" },
  { value: "B2B", label: "B2B – Business to Business" },
  { value: "IC", label: "IC – Insiders Club" },
  { value: "Non_IC", label: "Non_IC – Non Insiders Club" },
  { value: "ProStaff", label: "ProStaff" },
  { value: "List", label: "List" },
  { value: "Leads", label: "Leads" },
  { value: "WIBYCBI", label: "WIBYCBI" },
];

export const PLANS: NomenclatureOption[] = [
  { value: "Camera", label: "Camera" },
  { value: "Plan", label: "Plan" },
  { value: "Accessory", label: "Accessory" },
  { value: "Blog", label: "Blog" },
  { value: "MON", label: "MON – Monthly" },
  { value: "AP", label: "AP – Annual Plan" },
];

export const VERSIONS: NomenclatureOption[] = [
  { value: "V1", label: "V1" },
  { value: "V2", label: "V2" },
  { value: "V3", label: "V3" },
];

export const TESTS: NomenclatureOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

export const STEPS: NomenclatureOption[] = [
  { value: "S01", label: "S01" },
  { value: "S02", label: "S02" },
  { value: "S03", label: "S03" },
  { value: "S04", label: "S04" },
];

export const FISCAL_YEARS: NomenclatureOption[] = [
  { value: "FY24", label: "FY24" },
  { value: "FY25", label: "FY25" },
  { value: "FY26", label: "FY26" },
  { value: "FY27", label: "FY27" },
];

export const CAMPAIGN_TYPES: NomenclatureOption[] = [
  { value: "PRM", label: "PRM – Promo" },
  { value: "EDU", label: "EDU – Education" },
  { value: "ANN", label: "ANN – Announcement" },
  { value: "NPS", label: "NPS" },
  { value: "SUR", label: "SUR – Survey" },
];
