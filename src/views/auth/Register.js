'use client'
import Alert from '@/components/common/Alert'
import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import axiosInstance from '@/helpers/axios'
import { setMenus, setUser } from '@/lib/redux/userSlice'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AuthButton from './common/AuthButton'
import AuthInput from './common/AuthInput'
import AuthTitle from './common/AuthTitle'
import { loginUser } from './Login'
// import "./styles.css";
const passwordPattern = '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*()_\-]).+$'
const initialState = {
  name: '',
  company: '',
  branch: '',
  address: '',
  phone: '',
  email: '',
  password: '',
  hrm_package_id: '',
}

export default function Register() {
  //register page
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [packages, setPackages] = useState([])
  const [passwordError, setPasswordError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    branch: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    hrm_package_id: '',
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const getPackages = async () => {
    try {
      const response = await axiosInstance.get('package-list')
      const options = mapOptions(response.data.data.data, 'name', 'id')
      setPackages(options)
      //  setPackages(response.data.data);
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    getPackages()
  }, [])
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (passwordError) {
      setError('Please enter a valid password')
      setLoading(false)
      return
    }
    try {
      const response = await axiosInstance.post('/auth/register', formData)
      if (response.data.success) {
        setError('')
        setFormData(initialState)
        const user = response.data.data

        const res = await loginUser(user.email, formData.password)
        if (res?.user) {
          const userData = res.user
          const permissions = res.permissions

          const loggedInUser = {
            email: userData?.email,
            name: userData?.name,
            organization_id: userData?.organization_id,
            company_id: userData?.company_id,
            role: userData?.role,
          }
          dispatch(setUser(loggedInUser))
          dispatch(setMenus(permissions?.menu))
          window.location.href = '/organization/modules'
        } else {
          router.push('/auth/login')
        }
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      console.log('error', error)
      setError(error.response?.data?.error || error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen font-inter w-full">
      <div className="space-y-4 w-full sm:w-xl px-4 md:px-0 ">
        <div className="w-[200px]  mx-auto">
          <img src="/logo.png" alt="logo" className="w-full h-full object-cover" />
        </div>
        {error && <Alert message={error} type="error" />}
        <div className=''>
          <AuthTitle>Register Here</AuthTitle>
          <p className="text-neutral-600 text-sm">
            Already have an account?{' '}
            <Link className="text-blue-500 font-medium underline" href="/auth/login">
              Please Login
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-2  w-full mt-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <AuthInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <AuthInput
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Phone"
              name="phone"
              type='tel'
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <HrSelect
              label='Package'
              required
              name="hrm_package_id"
              value={formData.hrm_package_id}
              onChange={handleChange}
              options={packages}
              placeholder='Select Package'
            />
          </div>
          <div className='space-y-1'>

            <AuthInput
              label="Email"
              name="email"
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Password"
              name="password"
              type='password'
              value={formData.password}
              onChange={e => {
                const value = e.target.value
                setFormData({ ...formData, password: value })

                if (!value) {
                  setPasswordError('')
                  return
                }

                if (!/[0-9]/.test(value)) {
                  setPasswordError('Password must contain at least one number')
                } else if (!/[A-Z]/.test(value)) {
                  setPasswordError('Password must contain at least one uppercase letter')
                } else if (!/[a-z]/.test(value)) {
                  setPasswordError('Password must contain at least one lowercase letter')
                } else if (!/[@#$%^&*()_\-]/.test(value)) {
                  setPasswordError('Password must contain at least one special character')
                } else if (new RegExp(passwordPattern).test(value)) {
                  setPasswordError('')
                }
              }}
              minLength={8}
              required
              pattern={passwordPattern}
            />
            {passwordError && <small className="text-xs text-red-500">{passwordError}</small>}
          </div>
          <div className=" md:col-span-2">
            <AuthButton loading={loading}>{loading ? 'Registering...' : 'Register'}</AuthButton>
          </div>
        </form>
        <div className='flex justify-end'>
          <Link className='text-neutral-600 text-sm text-end hover:underline transtion-all duration-500' href="#">Forgot password or account?</Link>
        </div>
        <div className="flex items-center my-10 justify-center gap-3">
          <p className="text-neutral-500 text-sm tracking-tight">Sister Concern By </p>
          <div className="w-[100px]">
            <img src="/muktodhara-logo.png" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
