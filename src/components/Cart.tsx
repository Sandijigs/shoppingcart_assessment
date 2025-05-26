import type { CartItem, CouponState } from "../types";
import { CouponInput } from "./CouponInput";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onApplyCoupon: (couponState: CouponState) => void;
  currentCoupon: CouponState | null;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  currentCoupon,
}: CartProps) {
  const subtotal = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const discount = currentCoupon?.isApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <p className="text-blue-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500">×</p>
                  <p className="text-gray-500">{item.quantity}</p>
                  <p className="text-blue-600 font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.product.id,
                      Math.max(0, item.quantity - 1)
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <CouponInput
        onApplyCoupon={onApplyCoupon}
        currentCoupon={currentCoupon}
      />

      <div className="mt-6 pt-4 border-t space-y-2">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {currentCoupon?.isApplied && (
          <div className="flex justify-between items-center text-green-600">
            <span>Discount (10%):</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-xl font-bold text-blue-600">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
