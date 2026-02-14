'use client'
import { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import HrModal from '@/components/common/HrModal'
import { useGetAllChannelsQuery } from '@/views/inventory/channels/store'
import {
  useGetProductChannelsQuery,
  useSaveProductChannelsMutation,
} from '../store'
import toast from 'react-hot-toast'
import { Minus, Plus } from 'lucide-react'

const defaultChannelItem = () => ({
  channel_id: '',
  is_active: true,
  display_order: 1,
  custom_price: '',
  is_price_override: false,
  min_order_quantity: '',
  max_order_quantity: '',
  is_available_for_order: true,
  channel_specific_notes: '',
  time_minutes: '',
})

const normalizeChannels = raw => {
  const list = Array.isArray(raw) ? raw : []
  if (list.length === 0) return [defaultChannelItem()]
  return list.map(ch => ({
    channel_id: ch.channel_id ?? '',
    is_active: ch.is_active ?? true,
    display_order: ch.display_order ?? 1,
    custom_price: ch.custom_price ?? '',
    is_price_override: ch.is_price_override ?? false,
    min_order_quantity: ch.min_order_quantity ?? '',
    max_order_quantity: ch.max_order_quantity ?? '',
    is_available_for_order: ch.is_available_for_order ?? true,
    channel_specific_notes: ch.channel_specific_notes ?? '',
    time_minutes: ch.time_minutes ?? '',
  }))
}

export default function ProductChannelsModal({ open, setOpen, productId, productName }) {
  const form = useForm({
    defaultValues: { channels: [defaultChannelItem()] },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'channels',
  })

  const { data: channelsData, isLoading: channelsLoading } = useGetProductChannelsQuery(productId, {
    skip: !productId || !open,
  })

  const { data: channelsList } = useGetAllChannelsQuery()
  const channelOptions = useMemo(() => {
    const raw = channelsList?.data?.data ?? channelsList?.data ?? []
    return [...(Array.isArray(raw) ? raw : [])]
      .filter(c => c.is_active === true)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
      .map(ch => ({ label: ch.name, value: ch.id, code: ch.code }))
  }, [channelsList?.data])

  const watchedChannels = form.watch('channels')

  const [saveProductChannels, { isLoading: saveLoading }] = useSaveProductChannelsMutation()

  useEffect(() => {
    if (open && productId) {
      form.reset({ channels: [defaultChannelItem()] })
    }
  }, [open, productId, form])

  useEffect(() => {
    if (!open || !productId || !channelsData?.data) return
    const raw = Array.isArray(channelsData.data) ? channelsData.data : channelsData.data?.data ?? []
    form.reset({ channels: normalizeChannels(raw) })
  }, [open, productId, channelsData, form])

  const handleClose = () => {
    setOpen(false)
  }

  const toBool = v => v === true || v === 'true' || v === 1

  const onSubmit = data => {
    const channelsToSave = data.channels
      .filter(ch => ch.channel_id)
      .map(ch => ({
        ...ch,
        product_id: productId,
        is_active: toBool(ch.is_active),
        is_price_override: toBool(ch.is_price_override),
        is_available_for_order: toBool(ch.is_available_for_order),
      }))
    if (channelsToSave.length === 0) {
      toast.success('No channels to save')
      handleClose()
      return
    }
    saveProductChannels({ productId, channels: channelsToSave })
      .unwrap()
      .then(() => {
        toast.success('Channels saved')
        handleClose()
      })
      .catch(() => {
        toast.error('Failed to save channels')
      })
  }

  return (
    <HrModal
      toggle={open}
      setToggle={handleClose}
      onClose={handleClose}
      title={productName ? `Assign channels: ${productName}` : 'Assign channels'}
      size="sm:max-w-3xl"
    >
      <div className="space-y-4">
        {channelsLoading ? (
          <p className="text-sm text-gray-500">Loading channels...</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Channels</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append(defaultChannelItem())}
              >
                <Plus className="size-4" /> Add Channel
              </Button>
            </div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-2 p-3 border rounded-lg bg-gray-50/50 space-y-2"
              >
                <div className="md:col-span-6 flex flex-wrap items-center gap-2">
                  <FormField
                    form={form}
                    name={`channels.${index}.channel_id`}
                    label="Channel"
                    type="select"
                    options={channelOptions ?? []}
                  />
                  {channelOptions?.find(opt => opt.value === watchedChannels?.[index]?.channel_id)?.code ===
                    'ticket_counter' && (
                    <FormField
                      form={form}
                      name={`channels.${index}.time_minutes`}
                      label="Time (minutes)"
                      type="number"
                    />
                  )}
                  <FormField
                    form={form}
                    name={`channels.${index}.display_order`}
                    label="Display Order"
                    type="number"
                  />
                  <FormField
                    form={form}
                    name={`channels.${index}.is_active`}
                    label="Active"
                    type="switch"
                  />
                  <FormField
                    form={form}
                    name={`channels.${index}.is_available_for_order`}
                    label="Available for Order"
                    type="switch"
                  />
                  <div className="ml-auto flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1}
                      title="Remove channel"
                    >
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <FormField
                    form={form}
                    name={`channels.${index}.custom_price`}
                    label="Custom Price"
                    type="number"
                  />
                </div>
                <div className="md:col-span-3">
                  <FormField
                    form={form}
                    name={`channels.${index}.is_price_override`}
                    label="Price Override"
                    type="switch"
                  />
                </div>
                <div className="md:col-span-3">
                  <FormField
                    form={form}
                    name={`channels.${index}.min_order_quantity`}
                    label="Min Order Qty"
                    type="number"
                  />
                </div>
                <div className="md:col-span-3">
                  <FormField
                    form={form}
                    name={`channels.${index}.max_order_quantity`}
                    label="Max Order Qty"
                    type="number"
                  />
                </div>
                <div className="md:col-span-6">
                  <FormField
                    form={form}
                    name={`channels.${index}.channel_specific_notes`}
                    label="Channel Notes"
                    type="textarea"
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)} disabled={saveLoading}>
                {saveLoading ? 'Saving...' : 'Save channels'}
              </Button>
            </div>
          </>
        )}
      </div>
    </HrModal>
  )
}
