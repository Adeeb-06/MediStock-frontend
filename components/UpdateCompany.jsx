"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Plus, X, Building2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form'

const UpdateCompany = ({ companyId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [companyName, setCompanyName] = useState('')
    const router = useRouter()
    const { register, handleSubmit, setError, reset, control, formState: { errors } } = useForm({
        defaultValues: {
            companyId: companyId,
            name: companyName
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/company-by-id`, { companyId }, { withCredentials: true })
            if (res.status === 200) {
                // const company = res.data.company[0];
                setCompanyName(res.data.company.name)
                // console.log(res.data.company.name)
                // console.log(company.name)
                // Update form values
                reset({
                    companyId: companyId,
                    name: res.data.company.name,
                });
            }
        }
        fetchData()
    }, [companyId, reset])


    const onsubmit = async (data) => {

        const finalData = { ...data, companyId };

        setIsLoading(true);
        console.log(finalData)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/company/company-update`, data, { withCredentials: true });
            if (res.status === 200) {
                toast.success("Company Name Updated Successfully!");
                router.push('/dashboard/companies')
            }
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
                    onSubmit={handleSubmit(onsubmit)}
                    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl shadow-2xl space-y-6"
                >
                    {/* Company Inputs */}
                    <div className="space-y-4">

                        <div className="group">
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Enter company name..."
                                        {...register(`name`, { required: { value: true, message: "Company name is required" } })}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>


                            </div>
                        </div>

                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"

                        className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 cursor-pointer hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                       
                        Update Company
                    </button>

                    {/* Info Text */}

                </form>
            </div>
        </div>
    );
};

export default UpdateCompany;