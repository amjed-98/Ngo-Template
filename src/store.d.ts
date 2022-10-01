declare global {
  type TFeatures = Readonly<{
    causes: boolean;
    courses: boolean;
    donations: boolean;
    events: boolean;
    impact: boolean;
    market: boolean;
    partners: boolean;
    volunteers: boolean;
    logos: boolean;
  }>;

  type TBrand = Readonly<{
    id: string;
    ong_id: string;
    logo: string;
    primary_color_hex: string;
    secondary_color_hex: string;
    default_img: string;
    terms_and_conditions: string;
    name: string;
    text_color: string;
    text_header1: string;
    text_header2: string;
    favicon: string;
  }>;

  type TContact = Readonly<{
    id: string;
    address: string;
    email: string;
    phone: string;
  }>;

  type TDescription = Readonly<{
    id: string;
    description: string;
    img_url: string;
    ong_id: string;
    title: string;
    title_description: string;
    subtitle: string;
    text_color: string;
  }>;

  type TImpactData = Readonly<{
    id: string;
    name: string;
    amount: string;
  }>;

  type TNgoConfig = Readonly<{
    id: string;
    ong_id: string;
    active: boolean;
    currency: 'EUR' | 'USD';
    currency_symbol: '€' | '$';
    language: 'es' | 'en';
    powered_by_lazzaro: boolean;
    url: string;
    payment_method: 'paypal' | 'stripe';
  }>;

  type TRrss = Readonly<{
    id: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    web: string;
  }>;

  type TTeam = Readonly<{
     id: string;
     img_url: string;
     linkedin: string;
     name: string;
     ongId: string;
     order: number;
     position: string;
  }>;

  type TAllPlatformConfig = Readonly<{
    brand: TBrand;
    contact: TContact;
    description: TDescription;
    features: TFeatures;
    impactData: Readonly<TImpactData[]>;
    platformConfig: TNgoConfig;
    rrss: TRrss;
    team: Readonly<TTeam[]>;
  }>;
}

export {}
