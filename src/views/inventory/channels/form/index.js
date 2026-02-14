'use client'
import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { useCreateChannelMutation, useGetChannelByIdQuery, useUpdateChannelMutation } from '../store'
import toast from 'react-hot-toast'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const initialData = {
  code: '',
  name: '',
  description: '',
  is_active: true,
  display_order: '',
}

export default function ChannelsForm({ open, setOpen, editId, setEditId }) {
  const form = useForm({ defaultValues: initialData })
  const { data: channelData } = useGetChannelByIdQuery(editId, { skip: !editId })
  const [createChannel, { isLoading: createLoading }] = useCreateChannelMutation()
  const [updateChannel, { isLoading: updateLoading }] = useUpdateChannelMutation()

  useEffect(() => {
    if (channelData?.data) {
      form.reset(channelData.data)
    } else if (!editId) {
      form.reset(initialData)
    }
  }, [channelData?.data, editId, form])

  const onSubmit = async data => {
    const payload = {
      ...data,
      display_order: data.display_order ? Number(data.display_order) : 0,
      is_active: !!data.is_active,
    }
    try {
      const res = editId
        ? await updateChannel({ id: editId, data: payload })
        : await createChannel(payload)
      if (res?.data?.success) {
        toast.success(res?.data?.message ?? 'Channel saved')
        handleClose()
      } else {
        toast.error('Failed to save channel')
      }
    } catch {
      toast.error('Failed to save channel')
    }
  }

  const handleClose = () => {
    setOpen(false)
    setEditId?.(null)
  }

  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
      title={editId ? 'Edit Channel' : 'Add Channel'}
    >
      <div className="space-y-4">
        <FormField form={form} name="code" label="Code" type="text" placeholder="e.g. pos" />
        <FormField form={form} name="name" label="Name" type="text" placeholder="e.g. POS" />
        <FormField form={form} name="description" label="Description" type="textarea" />
        <FormField form={form} name="display_order" label="Display Order" type="number" />
        <FormField form={form} name="is_active" label="Is Active" type="switch" />
        <Button
          className="w-full"
          disabled={createLoading || updateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          {createLoading || updateLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </HrModal>
  )
}
