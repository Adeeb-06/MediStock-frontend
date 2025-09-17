"use client"
import { AppContent } from '@/app/context/AppContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm , useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import { Pill, DollarSign, Building2, Plus, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CreateMedicine = () => {
    const { register, handleSubmit, setError, reset, control , formState: { errors } } = useForm({
        defaultValues: {
            medicines: [{ name: "", price: "", company: "" }]
        },
        mode: "onChange"
    })
    const { companiesData, getCompanies } = useContext(AppContent)
    const [medicine, setMedicine] = useState([""]);
    const router = useRouter()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "medicines",
    });

    useEffect(() => {
        getCompanies()
    }, [])

    const onsubmit = async (data) => {
    
        console.log(data.medicines)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/medicine-create`, data, { withCredentials: true })

            if (res.status === 201) {
                toast.success("Medicine created successfully")
                router.push('/dashboard/medicines')
                reset() // Reset form after successful submission
            }

        } catch (error) {
            reset()
            console.log(error)
            onchange: () =>setError("apiError", { message: error.response?.data?.message || error.message })
            toast.error(error.response?.data?.message || error.message)
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
                        {fields.map((medicine, index) => (
                            <div key={medicine.id} className="flex items-center  gap-4">
                                {/* Input Fields */}
                                <div className="flex-1 flex gap-4">
                                    {/* Medicine Name */}
                                    <div className="space-y-2 flex-1">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                            <Pill className="w-4 h-4" />
                                            Medicine Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register(`medicines.${index}.name`, { required: {value: true, message: "Medicine name is required"} })}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                                            placeholder="Enter medicine name..."
                                        />
                                    </div>

                                    {/* Price */}
                                    

                                    {/* Company */}
                                    <div className="space-y-2 flex-1">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                            <Building2 className="w-4 h-4" />
                                            Company
                                        </label>
                                        <select
                                            {...register(`medicines.${index}.company`, { required: {value: true, message: "Company is required"} })}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                                        >
                                            <option value="">Select a company...</option>
                                            {companiesData?.companies?.map((company, idx) => (
                                                <option key={idx} value={company._id}>{company.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                {fields.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="flex items-center justify-center w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                        ))}


                        <button
                            type="button"
                            onClick={() => append({ name: "", price: "", company: "" })}
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-700/50 hover:bg-gray-700/70 border cursor-pointer border-gray-600 hover:border-gray-500 rounded-xl text-gray-300 hover:text-white transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Create More
                        </button>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="flex items-center cursor-pointer justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"

                        >
                            Create Medicine
                           
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