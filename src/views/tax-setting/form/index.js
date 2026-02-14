import React, { useEffect } from 'react'
import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useCreateTaxSettingMutation, useGetTaxSettingByIdQuery, useUpdateTaxSettingMutation } from '../store'
import toast from 'react-hot-toast'
const initialState = {
        name: "",
        code: "",
        rate: 0,
        type: "",
        description: "",
        is_active: true
      }
const typeOptions = [
    { label: 'Percentage', value: 'percentage' },
    { label: 'Fixed', value: 'fixed' },
]
export default function TaxSettingForm({ toggle, setToggle, editId, setEditId }) {
    const form = useForm({
        defaultValues: initialState,
        // resolver: zodResolver(schema),
        // mode: 'onChange',
    })
    const { data: editData, isFetching: editDataLoading } = useGetTaxSettingByIdQuery(editId, {
        skip: !editId,
    })
    const [createTaxSetting, { isLoading: createTaxSettingLoading }] = useCreateTaxSettingMutation()
    const [updateTaxSetting, { isLoading: updateTaxSettingLoading }] = useUpdateTaxSettingMutation()
    useEffect(() => {
        if (editData) {
            const data={
                name: editData?.data?.name,
                code: editData?.data?.code,
                rate: editData?.data?.rate,
                type: editData?.data?.type,
                description: editData?.data?.description,
                is_active: editData?.data?.is_active,
            }
            form.reset(data)
        }
    }, [editData])
    const onSubmit = async (data) => {
        console.log('editId', editId)
        const payload = {
            ...data,
            rate: parseFloat(data.rate),
            is_active: data.is_active ? 1 : 0,
            ...(editId ? { id: editId , _method: 'PUT' } : {}),
        }
        console.log('payload', JSON.stringify(payload, null, 2))
        try {
            const action  = editId ? updateTaxSetting : createTaxSetting
            const res = await action(payload).unwrap()
            console.log('res', res)
            if (res?.success) {
                toast.success('Tax Setting created successfully')
                setToggle(false)
            } else {
                toast.error('Failed to create tax setting')
            }
        } catch (error) {
            toast.error('Failed to create tax setting')
        }
    }
    console.log('errors', form.formState.errors)
  return (
    <HrModal title="Tax Setting Form" toggle={toggle} setToggle={setToggle}>
      <div className="space-y-4">
        <FormField form={form} name="name" label="Name" placeholder="Enter name" required />
        <FormField form={form} name="code" label="Code" placeholder="Enter code" required />
        <FormField form={form} name="rate" label="Rate" placeholder="Enter rate" required  type="number"/>
        <FormField form={form} name="type" label="Type" type="select" options={typeOptions} placeholder="Enter type" required />
        <FormField form={form} name="description" label="Description" placeholder="Enter description" required />
        <FormField form={form} name="is_active" type="switch" label="Is Active"  />
        <Button 
        className="w-full"
        onClick={form.handleSubmit(onSubmit)} 
        disabled={createTaxSettingLoading || updateTaxSettingLoading}>
            {createTaxSettingLoading || updateTaxSettingLoading ? 'Saving...' : 'Save'}
            </Button>
      </div>
    </HrModal>
  )
}