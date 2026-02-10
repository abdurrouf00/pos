import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalTitle } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRole } from '@/views/role/store'
import HrInput from '@/components/common/HrInput'
import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import {
  bindEmployeeData,
  bindSingleEmployeeData,
  createUser,
  getAllEmployee,
  getSingleEmployee,
  initialemployeeData,
} from '../store'
import UILoading from '@/components/ui/UILoading'
import toast from 'react-hot-toast'

export default function CreateUser({ open, setOpen, empId, params }) {
  const { singleEmployeeData, loading, profileImage, signatureImage } = useSelector(
    state => state.employee
  )
  const [fetching, setFetching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    role_id: '',
    password: '',
    email: '',
  })
  const { roleData } = useSelector(({ role }) => role)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRole())
    return () => {
      dispatch(bindSingleEmployeeData(null))
    }
  }, [])

  const getSingleEmployeeData = () => {
    setFetching(true)
    dispatch(getSingleEmployee(empId)).then(res => {
      if (res.payload?.email) {
        setFormData({ ...formData, email: res.payload?.email })
      }
      setFetching(false)
    })
  }
  useEffect(() => {
    getSingleEmployeeData()
  }, [empId])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
    setIsSubmitting(true)
    const data = {
      ...formData,
      employee_id: empId,
    }
    console.log(data)
    dispatch(createUser(data))
      .then(res => {
        console.log('res', res)
        if (res.error) {
          toast.error(res.error?.message)
        } else if (res && res?.payload?.success) {
          toast.success('User created successfully')
          dispatch(getAllEmployee(params))
          setOpen(false)
        } else {
          toast.error('Something went wrong')
        }
        setIsSubmitting(false)
      })
      .catch(err => {
        console.log(err)
        setIsSubmitting(false)
      })
  }
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent>
        <ModalTitle>
          Create User {singleEmployeeData?.name && `(${singleEmployeeData?.name})`}
        </ModalTitle>
        <UILoading loading={fetching}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <HrInput
              label="User Name"
              name="username"
              value={formData?.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter user name"
              required
            />
            <HrSelect
              label="Role"
              name="role_id"
              value={formData?.role_id}
              onChange={handleChange}
              placeholder="Select role"
              options={mapOptions(roleData)}
              required
            />
            <HrInput
              label="Email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              type="email"
              disabled={singleEmployeeData?.email}
              // disabled
              placeholder="Enter email"
              required={!singleEmployeeData?.email}
            />
            <HrInput
              label="Password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              required
              // aria-invalid={
              //   errors?.password && basicEmployeeData?.password.length < 5
              // }
            />
            <Button type="submit" className={'w-full'} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </UILoading>
      </ModalContent>
    </Modal>
  )
}
