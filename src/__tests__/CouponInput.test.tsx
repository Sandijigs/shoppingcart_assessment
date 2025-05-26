import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CouponInput } from "../components/CouponInput";
import type { CouponState } from "../types";

describe("CouponInput Component", () => {
  const mockOnApplyCoupon = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("validates empty coupon code", () => {
    render(
      <CouponInput onApplyCoupon={mockOnApplyCoupon} currentCoupon={null} />
    );

    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    expect(mockOnApplyCoupon).toHaveBeenCalledWith({
      code: "",
      isValid: false,
      isApplied: false,
      message: "Please enter a coupon code",
    });
  });

  it("validates invalid coupon format", () => {
    render(
      <CouponInput onApplyCoupon={mockOnApplyCoupon} currentCoupon={null} />
    );

    const input = screen.getByPlaceholderText("Enter coupon code");
    fireEvent.change(input, { target: { value: "INVALID@COUPON" } });

    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    expect(mockOnApplyCoupon).toHaveBeenCalledWith({
      code: "INVALID@COUPON",
      isValid: false,
      isApplied: false,
      message: "Invalid coupon format. Only alphanumeric characters allowed.",
    });
  });

  it("validates correct coupon code", () => {
    render(
      <CouponInput onApplyCoupon={mockOnApplyCoupon} currentCoupon={null} />
    );

    const input = screen.getByPlaceholderText("Enter coupon code");
    fireEvent.change(input, { target: { value: "WEB3BRIDGECOHORTx" } });

    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    expect(mockOnApplyCoupon).toHaveBeenCalledWith({
      code: "WEB3BRIDGECOHORTx",
      isValid: true,
      isApplied: true,
      message: "Coupon applied successfully! 10% discount added.",
    });
  });

  it("validates incorrect coupon code", () => {
    render(
      <CouponInput onApplyCoupon={mockOnApplyCoupon} currentCoupon={null} />
    );

    const input = screen.getByPlaceholderText("Enter coupon code");
    fireEvent.change(input, { target: { value: "WRONGCODE" } });

    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    expect(mockOnApplyCoupon).toHaveBeenCalledWith({
      code: "WRONGCODE",
      isValid: false,
      isApplied: false,
      message: "Invalid coupon code",
    });
  });

  it("disables input when coupon is applied", () => {
    const appliedCoupon: CouponState = {
      code: "WEB3BRIDGECOHORTx",
      isValid: true,
      isApplied: true,
      message: "Applied",
    };

    render(
      <CouponInput
        onApplyCoupon={mockOnApplyCoupon}
        currentCoupon={appliedCoupon}
      />
    );

    const input = screen.getByPlaceholderText("Enter coupon code");
    expect(input).toBeDisabled();
  });

  it("shows remove button when coupon is applied", () => {
    const appliedCoupon: CouponState = {
      code: "WEB3BRIDGECOHORTx",
      isValid: true,
      isApplied: true,
      message: "Applied",
    };

    render(
      <CouponInput
        onApplyCoupon={mockOnApplyCoupon}
        currentCoupon={appliedCoupon}
      />
    );

    expect(screen.getByText("Remove")).toBeInTheDocument();
  });
});
