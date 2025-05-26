import { useState } from "react";
import "./App.css";
import { products } from "./data/products";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import type { Product, CartItem, CouponState } from "./types";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponState, setCouponState] = useState<CouponState | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity === 0) {
        return prevItems.filter((item) => item.product.id !== productId);
      }

      return prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleApplyCoupon = (newCouponState: CouponState) => {
    setCouponState(newCouponState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Our Products</h1>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="bg-white px-4 py-2 rounded-lg text-blue-600 font-semibold hover:bg-opacity-90 transition-opacity flex items-center space-x-2"
          >
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all"
            onClick={() => setIsCartOpen(false)}
          >
            <div
              className="max-w-2xl w-full transform transition-transform duration-300 ease-in-out scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onApplyCoupon={handleApplyCoupon}
                currentCoupon={couponState}
              />
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Close Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
