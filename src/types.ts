export type ProductCategory =
  | 'CCTV Combo Kits'
  | 'Bullet Cameras'
  | 'Dome Cameras'
  | 'IP Cameras'
  | 'Wi-Fi Cameras'
  | 'DVR'
  | 'NVR'
  | 'Biometric & Access Control'
  | 'Smart Door Locks'
  | 'Video Door Phones'
  | 'Fire & Intrusion Alarms'
  | 'Surveillance Hard Disks'
  | 'PoE Switches'
  | 'P2P Devices'
  | 'Wi-Fi Routers & Extenders'
  | 'Racks'
  | 'CCTV Cables'
  | 'BNC Cables'
  | 'DC Pins'
  | 'RJ45 Connectors'
  | 'PoE Boxes'
  | 'PVC Boxes'
  | 'Other CCTV Accessories';

export type AvailabilityStatus =
  | 'In Stock'
  | 'Confirm via Enquiry'
  | 'Made to Order'
  | 'Out of Stock';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  model: string;
  description: string;
  mrpInr: number | null;
  priceInr: number | null;
  warranty: string;
  availability: AvailabilityStatus;
  imageUrl: string;
  featured: boolean;
  isReferenceEntry: boolean;
  updatedAt: string;
}

export interface BrandPartnerItem {
  id: string;
  name: string;
  shortMark: string;
  accentHex: string;
  categoryNote: string;
  logoUrl: string;
  active: boolean;
}

export interface PromoOffer {
  id: string;
  title: string;
  code: string;
  description: string;
  discountType: 'percent' | 'flat';
  discountValue: number;
  minOrderInr: number;
  active: boolean;
  showInBanner: boolean;
  validUntil: string;
  updatedAt: string;
}

export interface BusinessSettings {
  businessName: string;
  domain: string;
  tagline: string;
  logoUrl: string;
  heroBadgeText: string;
  heroHeadline: string;
  heroSubtitle: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  serviceAreas: string[];
  officeLocationName: string;
  officeLat: number;
  officeLng: number;
  freeDeliveryThresholdInr: number;
  installationBaseFeeInr: number;
  upiId: string;
  updatedAt: string;
}

export type EnquiryType = 'quote' | 'contact' | 'service' | 'product' | 'planner';
export type EnquiryStatus = 'new' | 'contacted' | 'quoted' | 'closed';

export interface CustomerEnquiry {
  id: string;
  type: EnquiryType;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: 'Andhra Pradesh' | 'Telangana' | 'Other';
  subject: string;
  productRef?: string;
  serviceRef?: string;
  cameraCount?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface OrderLineItem {
  productId: string;
  name: string;
  brand: string;
  model: string;
  unitPriceInr: number;
  quantity: number;
  lineTotalInr: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'dispatched'
  | 'installed'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'PAY_ON_INSTALLATION' | 'UPI_ON_DELIVERY';

export interface StoreOrder {
  id: string;
  items: OrderLineItem[];
  includeInstallation: boolean;
  subtotalInr: number;
  installationFeeInr: number;
  deliveryFeeInr: number;
  discountInr: number;
  couponCode: string;
  totalInr: number;
  paymentMethod: PaymentMethod;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: 'Andhra Pradesh' | 'Telangana' | 'Other';
  pincode: string;
  gstCompanyName?: string;
  gstin?: string;
  notes: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  organization: string;
  city: string;
  state: 'Andhra Pradesh' | 'Telangana';
  serviceUsed: string;
  feedback: string;
  status: 'pending' | 'approved';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  details: string;
  deliverables: string[];
  idealFor: string;
}

export interface CoverageHub {
  id: string;
  city: string;
  state: 'Andhra Pradesh' | 'Telangana';
  regionLabel: string;
  lat: number;
  lng: number;
  districtsCovered: string[];
}

export interface AdminAnalytics {
  totalProducts: number;
  pricedProducts: number;
  activeOffers: number;
  totalOrders: number;
  pendingOrders: number;
  confirmedRevenueInr: number;
  totalEnquiries: number;
  newEnquiries: number;
  pendingReviews: number;
}
