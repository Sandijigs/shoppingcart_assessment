import type { CartItem, CouponState } from "../types";

const CART_STORAGE_KEY = "shopping_cart_items";

interface StoredCart {
  items: CartItem[];
  coupon: CouponState | null;
  lastUpdated: number;
}

export const saveToStorage = (
  items: CartItem[],
  coupon: CouponState | null
) => {
  try {
    const cartData: StoredCart = {
      items,
      coupon,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const loadFromStorage = (): StoredCart | null => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) return null;

    const parsedData: StoredCart = JSON.parse(cartData);

    // Validate the structure of loaded data
    if (!Array.isArray(parsedData.items)) {
      console.error("Invalid cart data structure");
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return null;
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error);
  }
};
