// cart.ts
export type CartItem = {
  id: number;
  nombre_producto: string;
  precio_unitario: number;
  cantidad: number;
};

// Carrito
export const cart: CartItem[] = [];

// Agregar producto al carrito
export function addToCart(item: Omit<CartItem, "cantidad">) {
  const existente = cart.find((i) => i.id === item.id);
  if (existente) {
    existente.cantidad++;
  } else {
    cart.push({ ...item, cantidad: 1 });
  }
}

// Quitar producto del carrito
export function removeFromCart(index: number) {
  if (cart[index]?.cantidad > 1) {
    cart[index].cantidad--;
  } else {
    cart.splice(index, 1);
  }
}

// Aumentar cantidad
export function increaseQuantity(index: number) {
  if (cart[index]) {
    cart[index].cantidad++;
  }
}

// Calcular total
export function getCartTotal(): number {
  return cart.reduce((total, item) => total + item.precio_unitario * item.cantidad, 0);
}

// Renderizar carrito en el DOM
export function renderCart(
  cartItemsElement: HTMLElement | null,
  cartTotalElement: HTMLElement | null
) {
  if (!cartItemsElement || !cartTotalElement) return;

  cartItemsElement.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center border-b pb-2";
    li.innerHTML = `
      <span>${item.nombre_producto} (x${item.cantidad})</span>
      <div>
        <button class="px-2 bg-gray-200 rounded remove" data-index="${index}">-</button>
        <button class="px-2 bg-gray-200 rounded add" data-index="${index}">+</button>
      </div>
    `;
    cartItemsElement.appendChild(li);
  });

  cartTotalElement.textContent = getCartTotal().toFixed(2);

  // Botones + y -
  cartItemsElement.querySelectorAll<HTMLButtonElement>(".remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index || "0");
      removeFromCart(idx);
      renderCart(cartItemsElement, cartTotalElement);
    });
  });

  cartItemsElement.querySelectorAll<HTMLButtonElement>(".add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index || "0");
      increaseQuantity(idx);
      renderCart(cartItemsElement, cartTotalElement);
    });
  });
}
