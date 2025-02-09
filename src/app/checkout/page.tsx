'use client';

import { product } from '../../../types/product';
import { getCartItems } from '../actions/actions';




import { client } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items || []);
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.stocklevel, 0);
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName.trim(),
      lastName: !formValues.lastName.trim(),
      address: !formValues.address.trim(),
      city: !formValues.city.trim(),
      zipCode: !formValues.zipCode.trim(),
      phone: !formValues.phone.trim(),
      email: !formValues.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(formValues.email),
    };
    setFormErrors(errors);
    return Object.values(errors).every(error => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const orderData = {
      _type: 'order',
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      email: formValues.email,
      phone: formValues.phone,
      cartItems: cartItems.map((item) => ({
        _type: 'reference',
        _ref: item._id,
      })),
      total: total,
      discount: discount,
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      localStorage.removeItem("appliedDiscount");
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <form className="space-y-4">
  {Object.keys(formValues).map((key) => (
    <div key={key}>
      <input
        id={key}
        type={key === "email" ? "email" : "text"}
        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
        value={formValues[key] || ""}
        onChange={handleInputChange}
        className={`w-full p-2 border rounded ${formErrors[key] ? "border-red-500" : ""}`}
      />
      {formErrors[key] && (
        <p className="text-sm text-red-500">
          {key.charAt(0).toUpperCase() + key.slice(1)} is required.
        </p>
      )}
    </div>
  ))}
</form>
        <button
          className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white mt-4"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
