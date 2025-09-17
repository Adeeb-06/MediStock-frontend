"use client"
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


const SignUp = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  const router = useRouter()
  const onSubmit = async(data) => {
    // console.log(data);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, data, { withCredentials: true })
      if (res.status === 201) {
        router.push('/')
      }
    if(res.success === true) {
      router.push('/dashboard')
    }
    } catch (error) {
      
      setError("apiError", { message: error.response.data.message });
      console.log(error.response.data.message);
    }

  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
        <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-zinc-100 text-center mb-6">
            Create Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Full Name</label>
              <input
                type="text"
                {...register('name', { required: { value: true, message: 'name' } })}
                className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message} is required
              </p>
            )}

            {/* Address */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Address</label>
              <input
                type="text"
                {...register('address', { required: { value: true, message: 'address' } })}
                className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="123 Main St"
              />
            </div>
            {errors.address && (
              <p className="text-sm text-red-500">
                {errors.address.message} is required
              </p>
            )}

            {/* Phone */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Phone</label>
              <input
                type="text"
                {...register('phone', { required: { value: true, message: 'phone number' } })}
                className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="+8801789123456"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500">
                {errors.phone.message} is required
              </p>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                {...register('email', { required: { value: true, message: 'email' } })}
                className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message} is required
              </p>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Password</label>
              <input
                type="password"
                {...register('password', { required: { value: true, message: 'password' } })}
                className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message} is required
              </p>
            )}
            {errors.apiError && (
              <p className="text-sm text-red-500">
                {errors.apiError.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              // disabled={isSubmitting}
              className="w-full bg-zinc-600 cursor-pointer hover:bg-zinc-500 text-zinc-100 font-medium py-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-zinc-400 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-zinc-200 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp