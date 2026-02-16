'use client'

import HrModal from '@/components/common/HrModal'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  useCreateMembershipPackageMutation,
  useGetMembershipPackageByIdQuery,
  useUpdateMembershipPackageMutation,
} from '../store'
import toast from 'react-hot-toast'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  package_name: z.string().min(1, 'Package name is required'),
  package_days: z.string().min(1, 'Duration is required'),
  amount: z.string().min(1, 'Amount is required'),
  is_active: z.boolean().optional(),
})

export default function MembershipPackageForm({ open, setOpen, editId, setEditId }) {
  const initialData = {
    package_name: '',
    package_days: '',
    amount: '',
    is_active: true,
  }

  const { data: packageData, isLoading: packageLoading } = useGetMembershipPackageByIdQuery(
    editId,
    { skip: !editId }
  )
  const [createPackage, { isLoading: createLoading }] = useCreateMembershipPackageMutation()
  const [updatePackage, { isLoading: updateLoading }] = useUpdateMembershipPackageMutation()

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    // API returns { success, data: pkg, message } for getById
    const pkg = packageData?.data ?? packageData?.data?.data ?? packageData?.data?.output
    if (editId && pkg && typeof pkg === 'object' && 'package_name' in pkg) {
      form.reset({
        package_name: pkg.package_name || '',
        package_days: String(pkg.package_days ?? ''),
        amount: String(pkg.amount ?? ''),
        is_active: pkg.is_active ?? true,
      })
    } else if (!editId) {
      form.reset(initialData)
    }
  }, [editId, packageData, form])

  const onSubmit = async data => {
    const payload = {
      package_name: data.package_name.trim(),
      package_days: parseInt(data.package_days, 10) || 0,
      amount: parseFloat(data.amount) || 0,
      is_active: data.is_active ?? true,
    }

    try {
      let res
      if (editId) {
        res = await updatePackage({ id: editId, ...payload })
      } else {
        res = await createPackage(payload)
      }

      if (res?.data?.success) {
        toast.success(res?.data?.msg || 'Saved successfully')
        handleClose()
      } else {
        toast.error(res?.data?.msg || 'An error occurred')
      }
    } catch (error) {
      toast.error(error?.data?.message || 'An error occurred')
    }
  }

  const handleClose = () => {
    setOpen(false)
    setEditId(null)
    form.reset(initialData)
  }

  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
      title={editId ? 'Edit Membership Package' : 'Add Membership Package'}
      size="sm:max-w-md"
    >
      <div className="space-y-4 relative">
        {packageLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}
        <FormField
          name="package_name"
          label="Package Name"
          type="text"
          form={form}
          placeholder="e.g. Gold Package"
          disabled={packageLoading}
        />
        <FormField
          name="package_days"
          label="Duration (Days)"
          type="number"
          form={form}
          placeholder="e.g. 30, 90, 365"
          disabled={packageLoading}
        />
        <FormField
          name="amount"
          label="Amount (৳)"
          type="number"
          form={form}
          placeholder="0.00"
          disabled={packageLoading}
        />
        <FormField
          name="is_active"
          label="Is Active"
          type="switch"
          form={form}
          disabled={packageLoading}
        />
        <div>
          <Button
            className="w-full"
            disabled={createLoading || updateLoading || packageLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </HrModal>
  )
}
