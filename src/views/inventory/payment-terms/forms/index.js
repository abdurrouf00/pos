'use client'
import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import UILoading from '@/components/ui/UILoading'
import React, { useEffect, useRef, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  useCreatePaymentTermMutation,
  useGetPaymentTermByIdQuery,
  useUpdatePaymentTermMutation,
} from '../store'

import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  days: z.string().min(1, 'Days is required'),
  is_default: z.boolean(),
  is_active: z.boolean(),
})
export default function PaymentTermsForm({ open, setOpen, editId, setEditId }) {
  const initialState = {
    name: '',
    days: '',
    is_default: false,
    is_active: true,
  }
  const form = useForm({
    defaultValues: initialState,
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const fileInputRef = useRef(null)
  const [fileInput, setFileInput] = useState(null)
  const [createPaymentTerm, { isLoading: createLoading }] = useCreatePaymentTermMutation()
  const [updatePaymentTerm, { isLoading: updateLoading }] = useUpdatePaymentTermMutation()
  const { data: editData, isFetching: editDataLoading } = useGetPaymentTermByIdQuery(editId, {
    skip: !editId,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (editData) {
      form.reset(editData?.data)
    }
  }, [editData])
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
  }
  const handleFileInput = e => {
    setFileInput(e.target.files[0])
    //need a preview url here
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFileInput({
        file: file,
        preview: reader.result,
      })
    }
    fileInputRef.current.value = null
  }
  const onSubmit = async data => {
    const payload = {
      ...data,
      ...(fileInput && { logo_url: fileInput?.file }),
    }
    try {
      const res = await (editId
        ? updatePaymentTerm({ id: editId, data: payload })
        : createPaymentTerm(payload))
      console.log('res', res)
      if (res?.data?.success) {
        toast.success('Payment Term saved successfully')
        handleClose()
      } else {
        toast.error('Failed to save manufacturer')
      }
    } catch (e) {
      toast.error('Failed to save manufacturer')
    }
  }
  console.log('errors', form.formState.errors)
  return (
    <HrModal
      title={editId ? 'Edit Payment Term' : 'Add Payment Term'}
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
    >
      <UILoading loading={editDataLoading}>
        <div className="space-y-4">
          <FormField
            form={form}
            name="name"
            label="Name"
            placeholder="Enter name"
            required
            id="name"
            type="text"
          />

          <FormField
            form={form}
            name="days"
            label="Days"
            placeholder="Enter days"
            required
            id="days"
            type="number"
          />
          <FormField type="switch" form={form} name="is_default" label="Default" id="is_default" />
          <FormField type="switch" form={form} name="is_active" label="Active" id="is_active" />
          {fileInput?.preview ? (
            <div className="size-20 rounded-md overflow-hidden relative">
              {/* cancel button */}
              <button
                className="absolute top-0 right-0 bg-white rounded-full p-1"
                onClick={() => setFileInput(null)}
              >
                <X className="w-4 h-4" />
              </button>
              <img src={fileInput?.preview} alt="" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current.click()}
              className="h-28 w-full border-2 border-dashed cursor-pointer flex items-center justify-center text-xs text-gray-600 gap-2 rounded-md"
            >
              <p className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Logo
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileInput}
          />
          <div className="">
            <Button
              disabled={createLoading || updateLoading}
              className="w-full"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              {createLoading || updateLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </UILoading>
    </HrModal>
  )
}
