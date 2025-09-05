"use client"
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUp = () => {
    const { register, handleSubmit , formState: { errors , isSubmitting } } = useForm()

    const onSubmit = (data) => {
        // console.log(data);
        const res = axios.post('http://localhost:8000/api/auth/signup', data, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            if (res.data.success) {
                alert('User created successfully');
                // window.location.href = '/'
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const errorMessages = Object.values(errors).map(err => `Please enter your ${err.message}`)
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
               {...register('name', { required: {value: true, message: 'name'} })}
              className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="John Doe"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Address</label>
            <input
              type="text"
                {...register('address', { required: {value: true, message: 'address'} })}
              className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="123 Main St"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Phone</label>
            <input
              type="text"
                {...register('phone', { required: {value: true, message: 'phone number'} })}
              className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="+8801789123456"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Email</label>
            <input
              type="email"
             {...register('email', { required: {value: true, message: 'email'} })}
              className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Password</label>
            <input
              type="password"
                {...register('password', { required: {value: true, message: 'password'} })}
              className="w-full rounded-lg bg-zinc-700 text-zinc-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="••••••••"
            />
          </div>
          {errorMessages.length > 0 && (
            <p className="text-sm text-red-500">
              {errorMessages.join(', ')}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-600 hover:bg-zinc-500 text-zinc-100 font-medium py-2 rounded-lg transition"
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