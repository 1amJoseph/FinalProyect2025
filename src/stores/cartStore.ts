// src/stores/cartStore.ts

export interface CartItem {
  id_producto: number;
  nombre_producto: string;
  precio_unitario: number;
  cantidad: number;
  src: string;
}

class CartStore {
  private items: CartItem[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    // Cargar carrito desde localStorage al iniciar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mussolini_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
    if (typeof window !== 'undefined') {
      localStorage.setItem('mussolini_cart', JSON.stringify(this.items));
    }
  }

  addItem(product: Omit<CartItem, 'cantidad'>) {
    const existingItem = this.items.find(item => item.id_producto === product.id_producto);
    
    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      this.items.push({ ...product, cantidad: 1 });
    }
    
    this.notify();
  }

  removeItem(id_producto: number) {
    this.items = this.items.filter(item => item.id_producto !== id_producto);
    this.notify();
  }

  updateQuantity(id_producto: number, cantidad: number) {
    const item = this.items.find(item => item.id_producto === id_producto);
    if (item) {
      if (cantidad <= 0) {
        this.removeItem(id_producto);
      } else {
        item.cantidad = cantidad;
        this.notify();
      }
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (item.precio_unitario * item.cantidad);
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.cantidad, 0);
  }

  clear() {
    this.items = [];
    this.notify();
  }
}

export const cartStore = new CartStore();