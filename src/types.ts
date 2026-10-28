export type CategoryId = 'all' | 'arroz' | 'yakisoba' | 'pollo' | 'papas' | 'hamburguesas' | 'bebidas';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  count?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  portion?: string;
  spiceLevel?: number; // 0 none, 1 mild, 2 hot
  popular?: boolean;
  ingredients?: string[];
}

export interface CartItem {
  id: string; // unique item instance id in cart
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  portion?: string;
  image: string;
}

export type DeliveryType = 'delivery' | 'retiro';

export type PaymentMethod = 'efectivo' | 'transferencia';

export interface CustomerOrderData {
  name: string;
  phone: string;
  deliveryType: DeliveryType;
  address: string;
  addressReference?: string;
  paymentMethod: PaymentMethod;
  cashGiven?: string; // e.g. "50.000" or "100.000"
  notes?: string;
}

export interface RestaurantConfig {
  name: string;
  slogan: string;
  whatsappPhone: string; // e.g. 595981000000 (digits only, no '+' for wa.me)
  displayPhone: string;
  scheduleText: string;
  isOpen: boolean;
  deliveryCost: number; // in Guaraníes
  pickupTimeEstimate: string;
  deliveryTimeEstimate: string;
  currency: string;
  bankDetails: {
    bankName: string;
    accountHolder: string;
    taxId: string; // CI / RUC
    accountNumber: string;
    alias: string;
  };
}

export interface SavedOrder {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  customerData: CustomerOrderData;
  formattedMessage: string;
}
