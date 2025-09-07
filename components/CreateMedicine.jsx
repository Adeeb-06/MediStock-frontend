"use client"
import { AppContent } from '@/app/context/AppContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Pill, DollarSign, Building2, Plus, Loader2 } from 'lucide-react'

const CreateMedicine = () => {
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm()
    const { companiesData, getCompanies } = useContext(AppContent)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        getCompanies()
    }, [])

    const onsubmit = async(data) => {
        setIsSubmitting(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/medicine-create`, data, { withCredentials: true })

            if (res.status === 201) {
                toast.success("Medicine created successfully")
                reset() // Reset form after successful submission
            }
            
        } catch (error) {
            console.log(error)
            setError("apiError", { message: error.response?.data?.message || error.message })
            toast.error("Failed to create medicine")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4">
                        <Pill className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Medicine</h1>
                    <p className="text-gray-400">Add a new medicine to your inventory</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                        
                        {/* Medicine Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Pill className="w-4 h-4" />
                                Medicine Name
                            </label>
                            <input
                                type="text"
                                {...register('name', { 
                                    required: { value: true, message: 'Medicine name is required' },
                                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                })}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter medicine name..."
                            />
                            {errors.name && (
                                <p className="text-sm text-red-400 flex items-center gap-1">
                                    <span className="w-4 h-4 text-red-400">⚠</span>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <DollarSign className="w-4 h-4" />
                                Price
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                {...register('price', { 
                                    required: { value: true, message: 'Price is required' },
                                    min: { value: 0.01, message: 'Price must be greater than 0' }
                                })}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <p className="text-sm text-red-400 flex items-center gap-1">
                                    <span className="w-4 h-4 text-red-400">⚠</span>
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <Building2 className="w-4 h-4" />
                                Company
                            </label>
                            <select 
                                {...register('company', {
                                    required: { value: true, message: "Please select a company" }
                                })} 
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="" className="bg-gray-800 text-gray-400">Select a company...</option>
                                {companiesData?.companies?.map((company, index) => (
                                    <option key={index} value={company._id} className="bg-gray-800 text-white">
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {errors.company && (
                                <p className="text-sm text-red-400 flex items-center gap-1">
                                    <span className="w-4 h-4 text-red-400">⚠</span>
                                    {errors.company.message}
                                </p>
                            )}
                        </div>

                        {/* API Error */}
                        {errors.apiError && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                <p className="text-sm text-red-400 flex items-center gap-2">
                                    <span className="w-4 h-4 text-red-400">⚠</span>
                                    {errors.apiError.message}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Medicine...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Create Medicine
                                </>
                            )}
                        </button>

                        {/* Form Info */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                Make sure all information is accurate before creating
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMedicine