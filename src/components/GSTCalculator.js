import React, { useState, useEffect } from "react";

const GSTCalculator = () => {
  // State for form inputs and results
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18); // Default 18%
  const [isGSTIncluded, setIsGSTIncluded] = useState(false);
  const [results, setResults] = useState({
    originalAmount: 0,
    gstAmount: 0,
    totalAmount: 0,
  });

  // GST rate options
  const gstRates = [5, 12, 18, 28];

  // Calculate GST amounts whenever inputs change
  useEffect(() => {
    if (amount && !isNaN(amount) && amount > 0) {
      calculateGST(parseFloat(amount), rate, isGSTIncluded);
    } else {
      setResults({
        originalAmount: 0,
        gstAmount: 0,
        totalAmount: 0,
      });
    }
  }, [amount, rate, isGSTIncluded]);

  // GST calculation function
  const calculateGST = (amountValue, rateValue, included) => {
    let originalAmount, gstAmount, totalAmount;

    if (included) {
      // If GST is included in the amount
      originalAmount = amountValue / (1 + rateValue / 100);
      gstAmount = amountValue - originalAmount;
      totalAmount = amountValue;
    } else {
      // If GST is to be added to the amount
      originalAmount = amountValue;
      gstAmount = amountValue * (rateValue / 100);
      totalAmount = originalAmount + gstAmount;
    }

    setResults({
      originalAmount: parseFloat(originalAmount.toFixed(2)),
      gstAmount: parseFloat(gstAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    });
  };

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d*\.?\d*$/.test(value) && !isNaN(value))) {
      setAmount(value);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">GST Rate Calculator</h1>
        <p className="text-gray-600 mt-2">
          Calculate GST amounts based on your input values
        </p>
      </div>

      <div className="space-y-6">
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Enter Amount (₹)
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GST Rate Selection */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">
            Select GST Rate (%)
          </label>
          <div className="flex flex-wrap gap-3">
            {gstRates.map((gstRate) => (
              <button
                key={gstRate}
                type="button"
                onClick={() => setRate(gstRate)}
                className={`px-4 py-2 rounded-md ${
                  rate === gstRate
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {gstRate}%
              </button>
            ))}
            <div className="flex items-center">
              <input
                type="number"
                value={!gstRates.includes(rate) ? rate : ""}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                placeholder="Custom"
                className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-1 text-gray-700">%</span>
            </div>
          </div>
        </div>

        {/* GST Inclusion Toggle */}
        <div className="form-group">
          <label className="block text-gray-700 font-medium mb-2">
            GST Calculation Method
          </label>
          <div className="flex space-x-4">
            <div
              className={`px-4 py-2 rounded-md cursor-pointer ${
                !isGSTIncluded
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setIsGSTIncluded(false)}
            >
              Add GST to amount
            </div>
            <div
              className={`px-4 py-2 rounded-md cursor-pointer ${
                isGSTIncluded
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setIsGSTIncluded(true)}
            >
              GST included in amount
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculation Results</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {isGSTIncluded ? "Original Amount (excluding GST):" : "Base Amount:"}
              </span>
              <span className="font-medium">₹ {results.originalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST Amount ({rate}%):</span>
              <span className="font-medium">₹ {results.gstAmount.toLocaleString()}</span>
            </div>
            <div className="h-px bg-gray-300 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span>₹ {results.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-md font-semibold text-blue-800 mb-2">About GST Calculation</h3>
        <p className="text-sm text-blue-700">
          {isGSTIncluded
            ? "When GST is included in the amount, the calculator extracts the original amount and GST component from your total."
            : "When adding GST to the amount, the calculator adds the GST percentage to your base amount to get the total."}
        </p>
      </div>
    </div>
  );
};

export default GSTCalculator;