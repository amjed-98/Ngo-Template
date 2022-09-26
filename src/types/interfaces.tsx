export interface IProduct {
  title: string;
  id: string;
  amount: number;
  price: number;
  description: string;
}

export interface IProductCard {
  id: string;
  title: string;
  price: number;
  default_img: string;
  discount: number;
}

export interface ILatestDonation {
  id: string;
  text: string;
  anonymous: boolean;
  amount: number;
  createdAt: string;
  User: {
    firstName: string;
    lastName: string;
  };
}

export interface IProject {
  id: string;
  title: string;
  donated: number;
  amount: number;
  description: string;
  imageURL: string;
}
export interface IProjects {
  imageURL: string;
  id: string;
  title: string;
}
export interface IAppState {
  ongConfig: TOngConfig | Record<string, never> | undefined;
  ongId: string | undefined;
}

export interface IErrorMsg {
  mt?: number;
  align?: TAlignSelf;
}

export interface IImage {
  id: string;
  img_url: string;
}

export interface ICourse {
  title: string;
  description: string;
  location: string;
  imageURL: string;
  start_time: string;
  end_time: string;
  id: string;
  course: boolean;
}
export interface IEvent {
  course: boolean;
  id: string;
  title: string;
  description: string;
  imageURL: string;
  start_time: string;
  location: string;
  end_time: string;
  stock: number;
  price: number;
  EventTickets: {
    amount: number;
    id: string;
    price: number;
    type: string;
  }[];
}
