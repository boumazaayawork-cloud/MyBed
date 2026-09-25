'use client';

import { supabase } from './supabase';

export interface CartItem {
  id: string; // unique item key: productId-variantId-color
  productId: string;
  name_fr: string;
  name_ar: string;
  image: string;
  dimension: string;
  color?: string;
  price: number;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  wilayaName: string;
  wilayaCode: number;
  commune: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  depositAmount: number;
  balanceDue: number;
  paymentMethod: 'edahabia' | 'baridimob';
  receiptImage?: string;
  status: 'PENDING_DEPOSIT' | 'DEPOSIT_CONFIRMED' | 'IN_PRODUCTION' | 'SHIPPED' | 'DELIVERED_PAID' | 'CANCELLED';
  locale: 'fr' | 'ar';
}

const CART_KEY = 'mybed_cart_v1';
const ORDERS_KEY = 'mybed_orders_v1';

export function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart_updated'));
  } catch (err) {
    console.error('Error saving cart:', err);
  }
}

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
  const current = getStoredCart();
  const existingIndex = current.findIndex((i) => i.id === item.id);
  if (existingIndex > -1) {
    current[existingIndex].quantity += quantity;
  } else {
    current.push({ ...item, quantity });
  }
  saveStoredCart(current);
}

export function removeFromCart(itemId: string): void {
  const current = getStoredCart().filter((i) => i.id !== itemId);
  saveStoredCart(current);
}

export function clearCart(): void {
  saveStoredCart([]);
}

// Order Storage for Admin & Demo
export function getStoredOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      // Seed a sample order for demonstration in admin
      const initialSample: OrderRecord = {
        id: 'ord-1001',
        orderNumber: 'MYB-2601',
        createdAt: new Date().toISOString(),
        customerName: 'Yacine Benmansour',
        customerPhone: '0555123456',
        wilayaName: '16 - Alger (Hydra)',
        wilayaCode: 16,
        commune: 'Hydra, Rue Doudou Mokhtar',
        notes: '3ème étage avec ascenseur spacieux',
        items: [
          {
            id: 'bed-sultan-v-sultan-160-Beige Lin',
            productId: 'bed-sultan',
            name_fr: 'Lit Coffre Sultan',
            name_ar: 'سرير سلطان الملكي مع صندوق تخزين',
            image: '/images/products/sultan.jpg',
            dimension: '160 x 200 cm',
            color: 'Beige Lin',
            price: 48000,
            quantity: 1,
          },
          {
            id: 'pillow-visco-gel-v-viscogel-standard',
            productId: 'pillow-visco-gel',
            name_fr: 'Oreiller Visco Gel à Mémoire de Forme',
            name_ar: 'وسادة فيسكو جل الطبية (تبريد وميموري فوم)',
            image: '/images/products/oreiller-visco-gel.jpg',
            dimension: '60 x 40 cm',
            price: 6500,
            quantity: 2,
          }
        ],
        subtotal: 61000,
        deliveryFee: 2000,
        total: 63000,
        depositAmount: 5000,
        balanceDue: 58000,
        paymentMethod: 'baridimob',
        status: 'DEPOSIT_CONFIRMED',
        locale: 'fr'
      };
      localStorage.setItem(ORDERS_KEY, JSON.stringify([initialSample]));
      return [initialSample];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function fetchCloudOrders(): Promise<OrderRecord[]> {
  if (typeof window === 'undefined' || !supabase) return getStoredOrders();
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mapped: OrderRecord[] = data.map((d: any) => ({
        id: d.id,
        orderNumber: d.order_number,
        createdAt: d.created_at,
        customerName: d.customer_name,
        customerPhone: d.customer_phone,
        wilayaName: d.wilaya_name,
        wilayaCode: d.wilaya_code,
        commune: d.commune,
        notes: d.notes,
        items: d.items,
        subtotal: Number(d.subtotal),
        deliveryFee: Number(d.delivery_fee),
        total: Number(d.total),
        depositAmount: Number(d.deposit_amount),
        balanceDue: Number(d.balance_due),
        paymentMethod: d.payment_method,
        receiptImage: d.receipt_image,
        status: d.status,
        locale: d.locale || 'fr',
      }));
      localStorage.setItem(ORDERS_KEY, JSON.stringify(mapped));
      window.dispatchEvent(new Event('orders_updated'));
      return mapped;
    }
  } catch (err) {
    console.warn('Could not fetch cloud orders, using local storage:', err);
  }
  return getStoredOrders();
}

export async function saveNewOrder(order: OrderRecord): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    // 1. Save to local storage for instant responsiveness
    const orders = getStoredOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('orders_updated'));

    // 2. Persist to Supabase Cloud Database if configured
    if (supabase) {
      await supabase.from('orders').insert({
        id: order.id,
        order_number: order.orderNumber,
        created_at: order.createdAt,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        wilaya_name: order.wilayaName,
        wilaya_code: order.wilayaCode,
        commune: order.commune,
        notes: order.notes || null,
        items: order.items,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        total: order.total,
        deposit_amount: order.depositAmount,
        balance_due: order.balanceDue,
        payment_method: order.paymentMethod,
        receipt_image: order.receiptImage || null,
        status: order.status,
        locale: order.locale,
      });
    }
  } catch (err) {
    console.error('Error saving order to cloud:', err);
  }
}

export async function updateOrderStatus(orderId: string, newStatus: OrderRecord['status']): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const orders = getStoredOrders();
    const target = orders.find((o) => o.id === orderId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      window.dispatchEvent(new Event('orders_updated'));
    }

    if (supabase) {
      await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
    }
  } catch (err) {
    console.error('Error updating status in cloud:', err);
  }
}

// Editable Products Storage with Cloud Persistence
const PRODUCTS_KEY = 'mybed_custom_products_v1';

export function getCustomProducts(): Record<string, { base_price?: number; variantPrices?: Record<string, number> }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveProductPriceOverride(productId: string, basePrice: number, variantPrices?: Record<string, number>): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const current = getCustomProducts();
    current[productId] = {
      base_price: basePrice,
      variantPrices: variantPrices || current[productId]?.variantPrices || {}
    };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('products_updated'));

    if (supabase) {
      await supabase.from('custom_prices').upsert({
        product_id: productId,
        base_price: basePrice,
        variant_prices: current[productId].variantPrices,
        updated_at: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error('Error saving product override to cloud:', err);
  }
}

