'use client'
import React, { useState } from 'react'
import AuthTitle from './common/AuthTitle'
import AuthInput from './common/AuthInput'
import AuthButton from './common/AuthButton'
import axiosInstance from '@/helpers/axios';
import toast from 'react-hot-toast'
import { useRouter } from 'nextjs-toploader/app';

export default function ResetPasswordForm({ token, email }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !token) {
      toast.error('Invalid URL');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = {
        token,
        email,
        password,
        password_confirmation: confirmPassword
      }
      const res = await axiosInstance.post('reset-password', data)
      if (res.data.success) {
        toast.success('Password reset successfully');
        router.push('/auth/login');
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login-container">
      <div className='flex items-center justify-center min-h-screen font-inter'>
        <div className='space-y-4 sm:w-md w-full px-4 md:px-0'>
          <div className='w-[200px]  mx-auto'>
            <img src="/hr360-logo.png" alt="logo" className='w-full h-full object-cover' />
          </div>
          <div className=''>
            <AuthTitle>Reset Password</AuthTitle>

          </div>
          <form onSubmit={handleSubmit} className='space-y-2  w-full mt-3'>
            <AuthInput
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              minLength={8}
            />
            <AuthInput
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              type="password"
              minLength={8}
            />
            <div className=' md:col-span-2'>
              <AuthButton type='submit' loading={loading}>{loading ? "Resetting..." : "Reset Password"}</AuthButton>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
