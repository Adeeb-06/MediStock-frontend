"use client"
import { AppContent } from '@/app/context/AppContext'
import axios from 'axios'
import { Building2, Plus, Send, X } from 'lucide-react'
import { useRouter  } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useForm ,useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'

const ExpiredActionsUpdate = ({stockId}) => {
    const { medicinesData , getMedicines , getAllStocks } = useContext(AppContent)
    const [stocks, setStocks] = useState([""])
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            stockId: stockId,
        }
    })


    const router = useRouter()

    useEffect(() => {
        getAllStocks()
    },  [getAllStocks])





const onsubmit = async(data) => {
    // setIsLoading(true);
    console.log(data)
    // let totalPrice = data.stocks.quantity

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/stock-expired-action`, data, { withCredentials: true })
        toast.success("Action updated successfully!");
      // reset
        router.push('/dashboard/stock/expired-stocks')
        // setIsLoading(false);
        
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong. Please try again.");
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
          <h1 className="text-3xl font-bold text-white mb-2">Add Stocks</h1>
          <p className="text-gray-400">Create new company entries for your system</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          {/* Company Inputs */}
          <div className="space-y-4">
          
  <div  className="group">
    <div className="flex items-center gap-3">
      <div className="relative flex-1 flex flex-col gap-4">
        <input
          {...register(`stockId`, { required: {value: true, message: "Select a medicine"} })}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-2 py-3 text-white"
          placeholder="Stock ID"
        />
         
    
        {errors.stockId?.message && (
          <p className="text-red-500 text-xs">{errors.stockId?.message}</p> 
      
        )}

        <input
          type="text"
          step="0.01"
          min="0"
          {...register("action", { required: "action is required",})}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white"
          placeholder="return | disposed | pending"
        />
        {errors.expiredAction?.message && (
          <p className="text-red-500 text-xs">{errors.expiredAction?.message}</p>
        )}
       
      </div>

     
    </div>
  </div>


          </div>

          {/* Add More Button */}
          

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={isLoading || stocks.every(stock => stock.trim() === "")}
            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 cursor-pointer hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                updating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Update
              </>
            )}
          </button>

          {/* Info Text */}
          <p className="text-center text-gray-400 text-sm">
            {stocks.filter(c => c.trim()).length} stoc{stocks.filter(c => c.trim()).length === 1 ? 'k' : 'ks'} ready to be created
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default ExpiredActionsUpdate