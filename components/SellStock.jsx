"use client"
import { AppContent } from '@/app/context/AppContext'
import axios from 'axios'
import { Building2, Plus, Send, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SellStock = () => {
    const { medicinesData , getMedicines } = useContext(AppContent)
    const [stocks, setStocks] = useState([""])
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm()
    const [medicine, setMedicine] = useState();

    useEffect(() => {
        getMedicines()
    },  [getMedicines])



const handleAdd = () => {
  setStocks([...stocks, ""]);
};

// remove input
const handleRemove = (index) => {
  const newStocks = stocks.filter((_, i) => i !== index);
  setStocks(newStocks);
};

const onsubmit = async(data) => {
    // setIsLoading(true);
    console.log(data.stocks)
    // let totalPrice = data.stocks.quantity

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/stock-sell`, data, { withCredentials: true })
        toast.success("Stocks added successfully!");
        setStocks([""]); // reset
        // setIsLoading(false);
        
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
    }
}
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sell Medicines</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          {/* Company Inputs */}
          <div className="space-y-4">
           {stocks.map((stock, index) => (
  <div key={index} className="group">
    <div className="flex items-center gap-3">
      <div className="relative flex  gap-4">
        <select 
          {...register(`stocks.${index}.medicine`, { required: {value: true, message: "Select a medicine"} })}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white"
        >
          <option  value="">Select a medicine...</option>
          {medicinesData?.medicines?.map((medicine, idx) => (
            <option key={idx} value={medicine._id}>{medicine.name}</option>
          ))}
        </select>
        {errors.stocks?.[index]?.medicine?.message && (
          <p className="text-red-500 text-xs">{errors.stocks?.[index]?.medicine?.message}</p>
        )}  

        <input
          type="number"
          step="0.01"
          min="0"
          {...register(`stocks.${index}.quantity`, { required: {value: true, message: "Quantity is required"},
    min: { value: 1, message: "Quantity must be at least 1" } })}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white"
          placeholder="Enter Quantity"
        />
        {errors.stocks?.[index]?.quantity?.message && (
          <p className="text-red-500 text-xs">{errors.stocks?.[index]?.quantity?.message}</p>
        )}
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
            Sell More
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={isLoading || stocks.every(stock => stock.trim() === "")}
            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 cursor-pointer hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Selling...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Sell Medicine
              </>
            )}
          </button>
         
        </form>
      </div>
    </div>
    </>
  )
}

export default SellStock