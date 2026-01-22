'use client'
import React, { useState } from 'react'
import AuthTitle from './common/AuthTitle';
import Link from 'next/link';
import AuthButton from './common/AuthButton';
import AuthInput from './common/AuthInput';
import axiosInstance from '@/helpers/axios';
import { useRouter } from 'nextjs-toploader/app';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('forgot-password', { email })
      if (res.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login-container">
      {success ? <div className='border border-green-500 rounded-md p-4 max-w-md mx-auto mt-20 text-center'>
        <h4 className='text-green-500 font-semibold text-lg'>Password Reset Link Sent</h4>
        <p className='text-neutral-600 text-sm'>Please check your email for the password reset link.</p>
      </div> : <div className='flex items-center justify-center min-h-screen font-inter'>
        <div className='space-y-4 sm:w-md w-full px-4 md:px-0'>
          <div className='w-[200px]  mx-auto'>
            <img src="/hr360-logo.png" alt="logo" className='w-full h-full object-cover' />
          </div>
          <div className=''>
            <AuthTitle>Forgot Password</AuthTitle>
            <p className='text-neutral-600 text-sm'>No Account? <Link className='text-blue-500 font-medium underline' href="/auth/register">Please Register</Link></p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-2  w-full mt-3'>
            <AuthInput
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className=' md:col-span-2'>
              <AuthButton type='submit' loading={loading}>{loading ? "Sending..." : "Send Reset Link"}</AuthButton>
            </div>
          </form>

        </div>
      </div>}
    </div>
  )
}
