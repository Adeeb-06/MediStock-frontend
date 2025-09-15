"use client"
import { AppContent } from '@/app/context/AppContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm , useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import { Pill, DollarSign, Building2, Plus, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'


const UpdateMedicine = ({medicineId}) => {
    const [medicineName , setMedicineName] = useState('')
    const [companyName , setCompanyName] = useState('')
    const { register, handleSubmit, setError, reset, control , formState: { errors } } = useForm({
        defaultValues: {
            medicines: [{ name: medicineName,  company: companyName }]
        },
        mode: "onChange"
    })
    const { companiesData, getCompanies } = useContext(AppContent)
    const [medicine, setMedicine] = useState(null);

    const router = useRouter()


    useEffect(() => {
        getCompanies()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/medicine-by-id`, { medicineId }, { withCredentials: true })
            if (res.status === 200) {
            const med = res.data.medicine[0];
            setMedicineName(med.name);
            setCompanyName(med.company); // if you have company in medicine data
            // console.log(med.company.name)
            // Update form values
            reset({
                name: med.name,
                company: med.company?._id 
            });
        }
        }
        fetchData()
    },  [medicineId , reset])

    console.log(medicineName)

   const onsubmit = async (data) => {
    // include medicineId
    const finalData = { ...data, medicineId };

    console.log(finalData);

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/medicine/medicine-update`,
            finalData,
            { withCredentials: true }
        );

        if (res.status === 200) {
            toast.success("Medicine updated successfully");
            router.push('/dashboard/medicines');
            reset(); // Reset form after successful submission
        }

    } catch (error) {
        console.log(error);
        setError("apiError", { message: error.response?.data?.message || error.message });
        toast.error(error.response?.data?.message || error.message);
    }
};


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4">
                        <Pill className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Update Medicine</h1>
                    <p className="text-gray-400">Update medicine details</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                       
                            <div  className="flex items-center  gap-4">
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
                                            {...register(`name`, { required: {value: true, message: "Medicine name is required"} })}
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
                                            {...register(`company`, { required: {value: true, message: "Company is required"} })}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                                        >
                                            <option value="">Select a company...</option>
                                            {companiesData?.companies?.map((company, idx) => (
                                                <option key={idx} value={company._id}>{company.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                            </div>

                       


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"

                        >
                            Update Medicine
                           
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

export default UpdateMedicine