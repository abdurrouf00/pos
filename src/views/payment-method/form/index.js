import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetAccountHeadsByQueryQuery } from '@/views/account-head/store'
import { mapOptions } from '@/components/common/HrSelect'
import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { useGetPaymentMethodByIdQuery, useCreatePaymentMethodMutation, useUpdatePaymentMethodMutation } from '../store'
import toast from 'react-hot-toast'
import UILoading from '@/components/ui/UILoading'
const methodOptions = [
  { value: '1', label: 'Cash' },
  { value: '2', label: 'Bank' },
]
export default function PaymentMethodForm({ open, setOpen, editId, setEditId }) {
  const initialData = {
    method_type: '',
    method_name: '',
    account_head_id: '',
    description: '',
  }
  const form = useForm({
    defaultValues: initialData,
  })
  const { data: paymentMethod, isLoading: paymentMethodLoading } = useGetPaymentMethodByIdQuery(editId, {
    skip: !editId,
  })
  useEffect(() => {
    if (paymentMethod?.data) {
      form.reset({...paymentMethod?.data, method_type: paymentMethod?.data?.method_type.toString()})
    }
  }, [paymentMethod?.data])
  const { data: accountHeads, isLoading: accountHeadsLoading } = useGetAccountHeadsByQueryQuery();
  const [createPaymentMethod, { isLoading: createPaymentMethodLoading }] = useCreatePaymentMethodMutation()
  const [updatePaymentMethod, { isLoading: updatePaymentMethodLoading }] = useUpdatePaymentMethodMutation()
  const accountHeadOptions = mapOptions(accountHeads?.data?.data || [], 'account_name', 'id')
  console.log('accountHeadOptions', accountHeads)
  const onSubmit = async(data) => {
    const payload = {
      ...data,
      ...(editId && { id: editId }),
    }
    try {
       const action= editId ? updatePaymentMethod : createPaymentMethod
       const res = await action(payload)
       console.log('res', res)
       if (res?.data?.success) {
        toast.success(editId ? 'Payment Method updated successfully' : 'Payment Method created successfully')
        setOpen(false)
        setEditId(null)
       }
    } catch (error) {
        toast.error(error?.data?.message || 'Failed to save payment method')
    }
  }
  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      title={editId ? "Update Payment Method" : "Add Payment Method"}
    >
      <UILoading loading={paymentMethodLoading}>
      <div className="space-y-4">
        <div className="space-y-4">
            <FormField form={form} placeholder="Method Type" name="method_type" label="Method Type" type="select" options={methodOptions} />
            <FormField form={form} placeholder="Method Name" name="method_name" label="Method Name" />
            <FormField form={form} placeholder="Account Head" name="account_head_id" label="Account Head" type="select" options={accountHeadOptions} />
            <FormField form={form} placeholder="Description" name="description" label="Description" />
            <Button 
            disabled={createPaymentMethodLoading || updatePaymentMethodLoading} 
            onClick={form.handleSubmit(onSubmit)} className="w-full">{createPaymentMethodLoading || updatePaymentMethodLoading ? 'Saving...' : 'Save'}</Button>
        </div>
      </div>
      </UILoading>
    </HrModal>
  )
}