import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cart } from "../components/Cart";
import type { CartItem, CouponState } from "../types";

describe("Cart Component", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 99.99,
    image: "test.jpg",
    description: "Test Description",
  };

  const mockCartItems: CartItem[] = [{ product: mockProduct, quantity: 2 }];

  const mockHandlers = {
    onUpdateQuantity: jest.fn(),
    onRemoveItem: jest.fn(),
    onApplyCoupon: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates total correctly without discount", () => {
    render(
      <Cart
        items={mockCartItems}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemoveItem={mockHandlers.onRemoveItem}
        onApplyCoupon={mockHandlers.onApplyCoupon}
        currentCoupon={null}
      />
    );

    // Total should be price * quantity
    const totalElement = screen.getByText("Total:").nextElementSibling;
    expect(totalElement).toHaveTextContent("$199.98");
  });

  it("calculates total correctly with discount", () => {
    const mockCoupon: CouponState = {
      code: "WEB3BRIDGECOHORTx",
      isValid: true,
      isApplied: true,
      message: "Applied",
    };

    render(
      <Cart
        items={mockCartItems}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemoveItem={mockHandlers.onRemoveItem}
        onApplyCoupon={mockHandlers.onApplyCoupon}
        currentCoupon={mockCoupon}
      />
    );

    // Total should be price * quantity * 0.9 (10% discount)
    const totalElement = screen.getByText("Total:").nextElementSibling;
    expect(totalElement).toHaveTextContent("$179.98");
  });

  it("handles quantity updates correctly", () => {
    render(
      <Cart
        items={mockCartItems}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemoveItem={mockHandlers.onRemoveItem}
        onApplyCoupon={mockHandlers.onApplyCoupon}
        currentCoupon={null}
      />
    );

    // Find and click the increment button
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);

    // Check if onUpdateQuantity was called with correct arguments
    expect(mockHandlers.onUpdateQuantity).toHaveBeenCalledWith(
      mockProduct.id,
      3
    );
  });

  it("handles item removal correctly", () => {
    render(
      <Cart
        items={mockCartItems}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemoveItem={mockHandlers.onRemoveItem}
        onApplyCoupon={mockHandlers.onApplyCoupon}
        currentCoupon={null}
      />
    );

    // Find and click the remove button
    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    // Check if onRemoveItem was called with correct arguments
    expect(mockHandlers.onRemoveItem).toHaveBeenCalledWith(mockProduct.id);
  });

  it("displays empty cart message when no items", () => {
    render(
      <Cart
        items={[]}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemoveItem={mockHandlers.onRemoveItem}
        onApplyCoupon={mockHandlers.onApplyCoupon}
        currentCoupon={null}
      />
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});
