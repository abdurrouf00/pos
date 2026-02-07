'use client'
import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  useCreateProductTypeMutation,
  useGetProductTypeByIdQuery,
  useUpdateProductTypeMutation,
} from '../store'
import toast from 'react-hot-toast'
import UILoading from '@/components/ui/UILoading'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  has_tech_pack: z.boolean().default(false),
  is_active: z.boolean().default(true),
})
export default function ProductTypesForm({ open, setOpen, editId, setEditId }) {
  const initialData = {
    name: '',
    description: '',
    has_tech_pack: false,
    is_active: true,
  }
  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  })
  const { data: productType, isLoading: productTypeLoading } = useGetProductTypeByIdQuery(editId, {
    skip: !editId,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (productType?.data) {
      console.log('getByid', productType?.data)
      form.reset({
        name: productType?.data?.name,
        description: productType?.data?.description,
        has_tech_pack: productType?.data?.has_tech_pack,
        is_active: productType?.data?.is_active,
      })
    }
  }, [productType?.data])
  const [createProductType, { isLoading: createLoading }] = useCreateProductTypeMutation()
  const [updateProductType, { isLoading: updateLoading }] = useUpdateProductTypeMutation()
  const { handleSubmit } = form
  const onSubmit = async data => {
    const payload = {
      ...data,
      has_tech_pack: data.has_tech_pack ? 1 : 0,
      is_active: data.is_active ? 1 : 0,
    }
    console.log('payload', payload)
    try {
      let res
      if (editId) {
        res = await updateProductType({ id: editId, data: payload })
      } else {
        res = await createProductType(payload)
      }
      console.log('submit res', res)
      if (res?.data?.success) {
        toast.success(
          editId ? 'Product type updated successfully' : 'Product type created successfully'
        )
        handleClose()
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
    form.reset()
  }
  return (
    <HrModal
      title={editId ? 'Edit Product Type' : 'Add Product Type'}
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
    >
      <UILoading loading={productTypeLoading}>
        <div className="flex flex-col gap-4">
          <FormField
            name="name"
            label="Name"
            type="text"
            placeholder="Enter name"
            className="border rounded-md p-2"
            form={form}
          />
          <FormField
            name="description"
            label="Description"
            type="textarea"
            form={form}
            placeholder="Enter description"
            className="border rounded-md p-2"
          />
          <FormField name="has_tech_pack" label="Has Tech Pack" type="switch" form={form} />
          <FormField name="is_active" label="Is Active" type="switch" form={form} />

          <Button
            disabled={createLoading || updateLoading}
            onClick={handleSubmit(onSubmit)}
            className="border w-full rounded-md p-2"
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </UILoading>
    </HrModal>
  )
}
