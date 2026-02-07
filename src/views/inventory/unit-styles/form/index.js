import HrModal from '@/components/common/HrModal'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FormField } from '@/components/FormField'
import {
  useCreateUnitStyleMutation,
  useGetUnitStyleByIdQuery,
  useUpdateUnitStyleMutation,
} from '../store'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import UILoading from '@/components/ui/UILoading'
const schema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
})

export default function UnitStylesForm({ open, setOpen, editId, setEditId }) {
  const initialData = {
    code: '',
    name: '',
    description: '',
    is_active: true,
    is_default: false,
  }
  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  })
  const { data: editData, isLoading: isFetchingData } = useGetUnitStyleByIdQuery(editId, {
    skip: !editId,
  })
  const [createUnitStyle, { isLoading: createLoading }] = useCreateUnitStyleMutation()
  const [updateUnitStyle, { isLoading: updateLoading }] = useUpdateUnitStyleMutation()
  useEffect(() => {
    if (editData?.data) {
      console.log('getbyid', editData.data)
      form.reset(editData.data)
    }
  }, [editData])
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
  }
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
        res = await updateUnitStyle({ id: editId, data: payload })
      } else {
        res = await createUnitStyle(payload)
      }

      if (res?.data?.success) {
        toast.success(res?.data?.message)
        handleClose()
      }
    } catch (error) {}
  }
  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
      title={editId ? 'Edit Unit Style' : 'Add Unit Style'}
    >
      <UILoading loading={isFetchingData}>
        <div className="space-y-4">
          <FormField
            name="name"
            label="Name"
            type="text"
            form={form}
            placeholder={'ex:KIllogram'}
          />
          <FormField name="code" label="Code" type="text" form={form} placeholder={'ex:KG'} />
          <FormField name="description" label="Description" type="textarea" form={form} />
          <FormField name="is_active" label="Is Active" type="switch" form={form} />
          <FormField name="is_default" label="Is Default" type="switch" form={form} />
        </div>
        <div className="">
          <Button
            className={'w-full'}
            disabled={createLoading || updateLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </UILoading>
    </HrModal>
  )
}
