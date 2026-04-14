export interface RestaurantBasic {
  name: string;
  genre: string;
  concept: string;
  targetCustomer: string;
  priceRange: string;
}

export interface MenuInfo {
  signatureDish: string;
  signatureDescription: string;
  otherMenus: string[];
  drinkOption: boolean;
  courseOption: boolean;
}

export interface AppealInfo {
  strengths: string[];
  atmosphere: string;
  uniquePoint: string;
}

export interface AccessInfo {
  address: string;
  nearestStation: string;
  businessHours: string;
  closedDay: string;
  phone: string;
  reservationUrl: string;
  instagramUrl: string;
  googleMapUrl: string;
}

export type ThemeColor = 'warm' | 'cool' | 'natural' | 'luxury' | 'casual';

export interface DesignInfo {
  themeColor: ThemeColor;
}

export interface RestaurantData {
  basic: RestaurantBasic;
  menu: MenuInfo;
  appeal: AppealInfo;
  access: AccessInfo;
  design: DesignInfo;
}

export interface AppealPoint {
  icon: string;
  title: string;
  description: string;
}

export interface GeneratedLPContent {
  catchCopy: string;
  subCopy: string;
  conceptText: string;
  signatureDishDescription: string;
  appealPoints: AppealPoint[];
  closingMessage: string;
  seoTitle: string;
  seoDescription: string;
}

export interface LPData {
  id: string;
  restaurant: RestaurantData;
  content: GeneratedLPContent;
  createdAt: string;
}
