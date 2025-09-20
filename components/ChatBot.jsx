"use client";
import { useState } from "react";
import axios from "axios";
import { Calendar, Loader2, Bot } from "lucide-react";

export default function ChatBot() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [insights, setInsights] = useState("");

    const handleGenerateInsights = async () => {
        if (!startDate || !endDate) {
            alert("Please select both dates.");
            return;
        }

        setLoading(true);
        setInsights("");

        try {
            // 1. Fetch sales data from backend API
            const salesRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/stock/sales-by-date`,
                { startDate: startDate, endDate: endDate },
                { withCredentials: true }
            );

            const salesData = salesRes.data;

            console.log(salesData)

            // 2. Send sales data to Hugging Face (or OpenAI)
            // const aiRes = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
            //     },
            //     body: JSON.stringify({
            //         inputs: "Summarize pharmacy sales data: " + JSON.stringify(salesData),
            //     }),
            // });



            // setInsights(aiRes.data[0]?.generated_text || "No insights generated.");
        } catch (err) {
            console.error(err);
            setInsights("❌ Could not generate insights. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-gray-800/70 rounded-2xl p-8 shadow-2xl border border-gray-700">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-blue-400" />
                    <h1 className="text-2xl font-bold text-white">
                        AI Sales Insights
                    </h1>
                </div>

                {/* Date Pickers */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerateInsights}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating Insights...
                        </>
                    ) : (
                        <>
                            <Bot className="w-5 h-5" />
                            Generate Insights
                        </>
                    )}
                </button>

                {/* AI Insights */}
                {insights && (
                    <div className="mt-6 bg-gray-900/60 border border-gray-700 rounded-xl p-6 text-gray-200 whitespace-pre-line">
                        <h2 className="text-lg font-bold mb-3 text-purple-400">📊 Insights:</h2>
                        <p>{insights}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
