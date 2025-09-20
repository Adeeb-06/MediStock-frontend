"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndDownload = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stock/sales-by-date`,
          { startDate, endDate }, 
          {withCredentials:true}
        );

        const sales = res.data?.sales || [];

        if (!sales || sales.length === 0) {
          alert("No sales found for the selected range");
          setLoading(false);
          return;
        }

        // Convert sales to CSV
        const headers = ["Medicine", "Quantity", "Total Price", "Date"];
        const rows = sales.map((s) => [
          s.medicine?.name || s.medicine || "Unknown",
          s.soldQuantity,
          s.totalPrice,
          new Date(s.createdAt).toLocaleString(),
        ]);

        let csvContent =
          "data:text/csv;charset=utf-8," +
          [headers, ...rows].map((e) => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
          "download",
          `sales_${startDate}_to_${endDate}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("CSV download error:", error);
        alert("Failed to download CSV");
      }
      setLoading(false);
    };

    fetchAndDownload();
  }, [startDate, endDate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-700 p-8 text-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          📊 Export Sales Report
        </h1>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          disabled={loading || !startDate || !endDate}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300
            ${
              loading || !startDate || !endDate
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/40"
            }`}
        >
          {loading ? "⏳ Processing..." : "⬇️ Download CSV"}
        </button>
      </div>
    </div>
  );
}
