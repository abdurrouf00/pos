import HrModal from '@/components/common/HrModal'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  useCreateCouponMutation,
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
} from '../store'
import toast from 'react-hot-toast'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'

const schema = z.object({
  coupon_name: z.string().optional(),
  coupon_code: z.string().min(1, 'Coupon code is required'),
  discount_amount: z.string().min(1, 'Discount amount is required'),
  discount_type: z.string().min(1, 'Discount type is required'),
  expiry_date: z.string().optional().nullable(),
  max_usage_limit: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
})

const discountTypeOptions = [
  { label: 'Fixed Amount', value: '1' },
  { label: 'Percentage', value: '2' },
]

export default function CouponForm({ open, setOpen, editId, setEditId }) {
  const initialData = {
    coupon_name: '',
    coupon_code: '',
    discount_amount: '',
    discount_type: '1',
    expiry_date: '',
    max_usage_limit: '',
    is_active: true,
  }

  const { data: couponData, isLoading: couponLoading } = useGetCouponByIdQuery(editId, {
    skip: !editId,
  })
  const [createCoupon, { isLoading: createLoading }] = useCreateCouponMutation()
  const [updateCoupon, { isLoading: updateLoading }] = useUpdateCouponMutation()

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  })

  const discountType = form.watch('discount_type')

  useEffect(() => {
    if (couponData?.data) {
      const data = couponData.data
      form.reset({
        coupon_name: data.coupon_name || '',
        coupon_code: data.coupon_code || '',
        discount_amount: String(data.discount_amount) || '',
        discount_type: String(data.discount_type) || '1',
        expiry_date: data.expiry_date ? data.expiry_date.split('T')[0] : '',
        max_usage_limit: data.max_usage_limit ? String(data.max_usage_limit) : '',
        is_active: data.is_active,
      })
    }
  }, [couponData, form])

  const onSubmit = async data => {
    // Validate percentage discount
    if (data.discount_type === '2') {
      const amount = parseFloat(data.discount_amount)
      if (amount < 0 || amount > 100) {
        toast.error('Percentage discount must be between 0 and 100')
        return
      }
    }

    const payload = {
      coupon_name: data.coupon_name || null,
      coupon_code: data.coupon_code,
      discount_amount: parseFloat(data.discount_amount),
      discount_type: parseInt(data.discount_type),
      expiry_date: data.expiry_date || null,
      max_usage_limit: data.max_usage_limit ? parseInt(data.max_usage_limit) : null,
      is_active: data.is_active ? 1 : 0,
    }

    try {
      let res
      if (editId) {
        res = await updateCoupon({ id: editId, data: payload })
      } else {
        res = await createCoupon(payload)
      }

      if (res?.data?.success) {
        toast.success(res?.data?.message)
        handleClose()
      } else {
        toast.error(res?.data?.message || 'An error occurred')
      }
    } catch (error) {
      toast.error('An error occurred')
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
      title={editId ? 'Edit Coupon' : 'Add Coupon'}
    >
      <div className="space-y-4">
        <FormField
          name="coupon_name"
          label="Coupon Name"
          type="text"
          form={form}
          placeholder="ex: Summer Sale"
        />
        <FormField
          name="coupon_code"
          label="Coupon Code"
          type="text"
          form={form}
          placeholder="ex: SUMMER2026"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="discount_type"
            label="Discount Type"
            type="select"
            form={form}
            options={discountTypeOptions}
          />
          <FormField
            name="discount_amount"
            label={discountType === '2' ? 'Discount (%)' : 'Discount Amount ($)'}
            type="number"
            form={form}
            placeholder={discountType === '2' ? 'ex: 10' : 'ex: 50.00'}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="expiry_date"
            label="Expiry Date"
            type="date"
            form={form}
          />
          <FormField
            name="max_usage_limit"
            label="Max Usage Limit"
            type="number"
            form={form}
            placeholder="Leave empty for unlimited"
          />
        </div>
        <FormField name="is_active" label="Is Active" type="switch" form={form} />
        <div>
          <Button
            className={'w-full'}
            disabled={createLoading || updateLoading || couponLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </HrModal>
  )
}
