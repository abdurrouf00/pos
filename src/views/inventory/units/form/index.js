import HrModal from '@/components/common/HrModal'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useCreateUnitMutation, useGetUnitByIdQuery, useUpdateUnitMutation } from '../store'
import { useGetAllUnitStylesQuery } from '../../unit-styles/store'
import toast from 'react-hot-toast'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  unit_style_id: z.string().min(1, 'Unit style is required'),
  is_default: z.boolean().optional(),
  is_active: z.boolean().optional(),
})

export default function UnitsForm({ open, setOpen, editId, setEditId }) {
  const initialData = {
    name: '',
    quantity: '',
    unit_style_id: '',
    is_default: false,
    is_active: true,
  }
  const { data: unitStyleData, isLoading: unitStyleLoading } = useGetUnitByIdQuery(editId, {
    skip: !editId,
  })
  const [createUnit, { isLoading: createLoading }] = useCreateUnitMutation()
  const [updateUnit, { isLoading: updateLoading }] = useUpdateUnitMutation()
  const { data: unitStylesData, isLoading: unitStylesLoading } = useGetAllUnitStylesQuery()
  const unitStyleOptions = unitStylesData?.data?.data?.map(item => ({
    label: item.name,
    value: item.id,
  }))
  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  })
  useEffect(() => {
    if (unitStyleData?.data) {
      console.log('getbyid', unitStyleData.data)
      form.reset(unitStyleData.data)
    }
  }, [unitStyleData])

  const onSubmit = async data => {
    const payload = {
      ...data,
      is_active: data.is_active ? 1 : 0,
      is_default: data.is_default ? 1 : 0,
    }
    console.log('payload', payload)
    try {
      let res
      if (editId) {
        res = await updateUnit({ id: editId, data: payload })
      } else {
        res = await createUnit(payload)
      }

      if (res?.data?.success) {
        toast.success(res?.data?.message)
        handleClose()
      }
    } catch (error) {}
  }
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
  }
  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
      title={editId ? 'Edit Unit' : 'Add Unit'}
    >
      <div className="space-y-4">
        <FormField name="name" label="Name" type="text" form={form} placeholder={'ex:KIllogram'} />
        <FormField name="quantity" label="Quantity" type="number" form={form} />
        <FormField
          name="unit_style_id"
          label="Unit Style"
          type="select"
          form={form}
          options={unitStyleOptions}
        />
        <FormField name="is_default" label="Is Default" type="switch" form={form} />
        <FormField name="is_active" label="Is Active" type="switch" form={form} />
        <div>
          <Button
            className={'w-full'}
            disabled={createLoading || updateLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </HrModal>
  )
}
