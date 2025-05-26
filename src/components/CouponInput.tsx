import { useState } from "react";
import type { CouponState } from "../types";

interface CouponInputProps {
  onApplyCoupon: (couponState: CouponState) => void;
  currentCoupon: CouponState | null;
}

const VALID_COUPON = "WEB3BRIDGECOHORTx";
const COUPON_REGEX = /^[A-Za-z0-9]+$/;

export function CouponInput({
  onApplyCoupon,
  currentCoupon,
}: CouponInputProps) {
  const [inputCode, setInputCode] = useState("");

  const validateCoupon = () => {
    // Basic validation
    if (!inputCode) {
      onApplyCoupon({
        code: "",
        isValid: false,
        isApplied: false,
        message: "Please enter a coupon code",
      });
      return;
    }

    // Regex validation
    if (!COUPON_REGEX.test(inputCode)) {
      onApplyCoupon({
        code: inputCode,
        isValid: false,
        isApplied: false,
        message: "Invalid coupon format. Only alphanumeric characters allowed.",
      });
      return;
    }

    // Check if it's the valid coupon
    if (inputCode === VALID_COUPON) {
      onApplyCoupon({
        code: inputCode,
        isValid: true,
        isApplied: true,
        message: "Coupon applied successfully! 10% discount added.",
      });
      return;
    }

    onApplyCoupon({
      code: inputCode,
      isValid: false,
      isApplied: false,
      message: "Invalid coupon code",
    });
  };

  const removeCoupon = () => {
    setInputCode("");
    onApplyCoupon({
      code: "",
      isValid: false,
      isApplied: false,
      message: "",
    });
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400"
            disabled={currentCoupon?.isApplied}
          />
          {currentCoupon?.isApplied ? (
            <button
              onClick={removeCoupon}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={validateCoupon}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Apply
            </button>
          )}
        </div>
        {currentCoupon?.message && (
          <p
            className={`text-sm ${
              currentCoupon.isValid ? "text-green-600" : "text-red-600"
            }`}
          >
            {currentCoupon.message}
          </p>
        )}
      </div>
    </div>
  );
}
