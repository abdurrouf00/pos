import ResetPasswordForm from '@/views/auth/ResetPassword'
import React from 'react'

export default function ResetPassword({ searchParams }) {
  // const searchParams = useSearchParams();
  const token = searchParams.token;
  const email = searchParams.email;
  return (
    <ResetPasswordForm token={token} email={email} />
  )
}
