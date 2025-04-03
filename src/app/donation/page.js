"use client";

import { useState } from "react";

export default function DonationPage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDonation = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    // Ovdje možeš dodati backend poziv za obradu donacije (npr. PayPal/Stripe)
    alert(`Thank you for your donation of $${amount}!`);
    setAmount("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 opacity-90 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-500">
        Support Stampfolio
      </h1>
      <p className="text-gray-600 mb-4">
        If you love Stampfolio and want to support its growth, consider making a
        small donation. Your contribution helps us maintain and improve the
        platform, ensuring a better experience for all philately enthusiasts.
        Thank you for your support!
      </p>

      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-lg font-medium mb-2 text-gray-500"
        >
          Donation Amount ($)
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter amount"
        />
      </div>

      <button
        onClick={handleDonation}
        className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Donate Now
      </button>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
