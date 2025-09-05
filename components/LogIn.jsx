"use client"
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


const LogIn = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  const router = useRouter()
  const onSubmit = async(data) => {
    // console.log(data);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, data, { withCredentials: true })
      if (res.status === 200) {
        router.push('/')
      }
    if(res.success === true) {
      router.push('/')
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
            //   disabled={isSubmitting}
              className="w-full bg-zinc-600 hover:bg-zinc-500 text-zinc-100 font-medium py-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-zinc-400 text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-zinc-200 hover:underline">
             SignUp
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LogIn