"use client"
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Plus, X, Building2, Send } from "lucide-react";

const AddCompanies = () => {
  const [companies, setCompanies] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

  // handle change
  const handleChange = (index, value) => {
    const newCompanies = [...companies];
    newCompanies[index] = value;
    setCompanies(newCompanies);
  };

  // add new input
  const handleAdd = () => {
    setCompanies([...companies, ""]);
  };

  // remove input
  const handleRemove = (index) => {
    const newCompanies = companies.filter((_, i) => i !== index);
    setCompanies(newCompanies);
  };

  // submit all
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/company-create`, {
        name: companies.filter(company => company.trim() !== ""), // Filter out empty entries
      });
      toast.success("Companies added successfully!");
      setCompanies([""]); // reset
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Add Companies</h1>
          <p className="text-gray-400">Create new company entries for your system</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          {/* Company Inputs */}
          <div className="space-y-4">
            {companies.map((company, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter company name..."
                      value={company}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="flex items-center justify-center w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 cursor-pointer rounded-xl text-red-400 hover:text-red-300 transition-all duration-200 group"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-700/50 hover:bg-gray-700/70 border cursor-pointer border-gray-600 hover:border-gray-500 rounded-xl text-gray-300 hover:text-white transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Another Company
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || companies.every(company => company.trim() === "")}
            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 cursor-pointer hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Companies...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Create All Companies
              </>
            )}
          </button>

          {/* Info Text */}
          <p className="text-center text-gray-400 text-sm">
            {companies.filter(c => c.trim()).length} compan{companies.filter(c => c.trim()).length === 1 ? 'y' : 'ies'} ready to be created
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddCompanies;