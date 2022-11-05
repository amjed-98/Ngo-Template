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

  type TOng = {
    id: string;
    name: string;
    email: string;
    password: string;
    description: string;
    img_url: string;
    home_url: string;
    ambit: string;
    type: string;
    address: string;
    stripe_id: string;
    nif: string;
    ioCashUserId: string;
    walletId: string;
    walletStatus: string;
    walletCertificateFile: string;
    bankAccount: string;
    dltAddress: string;
    pk: string;
    mobilePhone: string;
    url: string;
    port: number;
    active: boolean;
    zohoId: string;
    hasPaypal: boolean;
    paypal_client_id: string;
    paypal_client_secret: string;
    recoverHash: string;
    recoverDate: string;
    createdAt: string;
    updatedAt: string;
  };

  type TEvent = {
    course: boolean;
    id: string;
    title: string;
    description: string;
    imageURL: string;
    start_time: string;
    location: string;
    end_time: string;
    stock: number;
    amount: 0;
    price: number;
    donated: number;
    salesStartDate: `${string}-${string}-${string}`;
    salesEndDate: `${string}-${string}-${string}`;
    recurrent: boolean;
    type: 'Presencial' | 'Online';
    stripe_id: string;
    video_url: string;
    isPremium: boolean;
    EventTickets: {
      amount: number;
      id: string;
      price: number;
      type: string;
    }[];
  };

  type Image = {
    id: string;
    img_url: string;
    default: boolean;
  };

  type TEventImage = Image & {
    event_id: string;
  };

  type TCourse = TEvent;

  type SnakeToCamelCase<Type extends string | object> = Type extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : Type extends object
    ? { [key in keyof Type as SnakeToCamelCase<key>]: Type[key] }
    : Type;

  type TProject = {
    id: string;
    ong_id: string;
    title: string;
    description: string;
    amount: number;
    price: number;
    donated: number;
    imageURL: string;
    isPremium: boolean;
    discount: number;
    delivery_time: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    Ong: TOng;
  };

  type TProjectImage = Image & {
    project_id: string;
  };

  type TLogo = {
    id: string;
    ong_id: string;
    logo: string;
    createdAt: string;
    updatedAt: string;
  };

  type Product = {
    id: string;
    ong_id: string;
    title: string;
    description: string;
    amount: number;
    price: number;
    default_img: string;
    discount: number;
    delivery_time: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    Ong: Ong;
  };

  type ProductImage = Image & {
    item_id: string;
    createdAt: string;
    updatedAt: string;
  };

  type FinalizePaymentParams = {
    firstName: string;
    lastName: string;
    user_email: string;
    amount: number;
    certificate: boolean;
    text: string;
    nif: string;
    anonymous: boolean;
    ong_id: string;
    home_address: string;
  };

  type ILatestDonation = {
    id: string;
    text: string;
    anonymous: boolean;
    amount: number;
    createdAt: string;
    User: {
      firstName: string;
      lastName: string;
    };
  };
}

export {};
