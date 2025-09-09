
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: string;
  imageUrl: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  category: string;
  description: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  total: number;
  paymentMethod: 'Online' | 'Cash on Delivery';
  date: string;
  status: 'Placed' | 'Shipped' | 'Delivered';
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // In a real app, this would be a hash
    phone: string;
    cart: CartItem[];
}

export interface WishlistItem {
    productId: string;
    addedAt: string;
}

export interface Wishlist {
    id: string;
    userId: string;
    name: string;
    items: WishlistItem[];
}

// FIX: Moved View type from App.tsx to types.ts to be shared across the application.
export type View =
  | { page: 'home' }
  | { page: 'about' }
  | { page: 'category'; payload: 'Men' | 'Women' | 'Kids' | 'Beauty' | 'Home' }
  | { page: 'product'; payload: string } // product id
  | { page: 'cart' }
  | { page: 'checkout' }
  | { page: 'confirmation' }
  | { page: 'login'; from?: string }
  | { page: 'signup' }
  | { page: 'account'; subpage: 'home' | 'orders' | 'profile' | 'wishlists' }
  | { page: 'customer-service' }
  | { page: 'search'; payload: string }
  | { page: 'placeholder'; payload: string };

export enum JiaStatus {
  Idle = 'idle',
  Listening = 'listening',
  Thinking = 'thinking',
  Responding = 'responding',
  Error = 'error',
}

export interface JiaResponse {
    products?: Product[];
    responseMessage?: string;
    navigationTarget?: View;
    followUpQuery?: string;
}
