'use client'
import { use, useEffect, useMemo, useState } from 'react'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { useGetAllCurrencyQuery } from '@/views/inventory/currencies/store'
import { useGetAllManufacturersQuery } from '@/views/inventory/manufacturers/store'
import { useGetAllUnitStylesQuery } from '@/views/inventory/unit-styles/store'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useGetProductChannelsQuery,
  useUpdateProductMutation,
  useSaveProductChannelsMutation,
} from '../store'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import UILoading from '@/components/ui/UILoading'
import { useGetAllProductTypesQuery } from '@/views/inventory/product-types/store'
import ProductTabs from './ProductTabs'
import { useGetAllChannelsQuery } from '@/views/inventory/channels/store'
import { Code, Minus, Plus } from 'lucide-react'

const TABS = ['General', 'Pricing', 'Sales', 'Purchase', 'Stock', 'Support', 'Channel']

const initialData = {
  product_code: '',
  product_name: '',
  vendor_id: '',
  manufacturer_id: '',
  category_id: '',
  product_type_id: '',
  unit_style_id: '',
  description: '',
  is_active: true,
  pricing: {
    unit_price: '',
    commission_rate: '',
    tax_rate: '',
    currency_id: '',
    is_taxable: false,
  },
  sales_info: {
    sales_account_id: '',
    sales_tax_id: '',
    sales_start_date: '',
    sales_end_date: '',
  },
  purchase_info: {
    purchase_account_id: '',
    purchase_tax_id: '',
  },
  stock: {
    quantity_in_stock: '',
    quantity_ordered: '',
    quantity_in_demand: '',
    reorder_level: '',
  },
  support: {
    support_start_date: '',
    support_end_date: '',
    warranty_months: '',
    support_type: '',
    support_notes: '',
  },
  channels: [
    {
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
    },
  ],
}

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

const productSchema = z.object({
  product_code: z.string().min(1, 'Product Code is required'),
  product_name: z.string().min(1, 'Product Name is required'),
  pricing: z.object({
    unit_price: z.union([z.string().min(1, 'Unit Price is required'), z.number()]).transform(v => (typeof v === 'string' ? Number(v) : v)).pipe(z.number().min(0)),
    // commission_rate: z.union([z.string().min(1, 'Commission Rate is required'), z.number()]).transform(v => (typeof v === 'string' ? Number(v) : v)).pipe(z.number().min(0)),
    // tax_rate: z.union([z.string().min(1, 'Tax Rate is required'), z.number()]).transform(v => (typeof v === 'string' ? Number(v) : v)).pipe(z.number().min(0)),
    // currency_id: z.string().min(1, 'Currency is required'),
    // is_taxable: z.boolean(),
  }),
  stock: z.object({
    quantity_in_stock: z
      .union([z.string().min(1, 'Quantity In Stock is required'), z.number()])
      .transform(v => (typeof v === 'string' ? Number(v) : v))
      .pipe(z.number().min(0)),
    quantity_ordered: z
      .union([z.string().min(1, 'Quantity Ordered is required'), z.number()])
      .transform(v => (typeof v === 'string' ? Number(v) : v))
      .pipe(z.number().min(0)),
    quantity_in_demand: z
      .union([z.string().min(1, 'Quantity In Demand is required'), z.number()])
      .transform(v => (typeof v === 'string' ? Number(v) : v))
      .pipe(z.number().min(0)),
    reorder_level: z
      .union([z.string().min(1, 'Reorder Level is required'), z.number()])
      .transform(v => (typeof v === 'string' ? Number(v) : v))
      .pipe(z.number().min(0)),
  }),
}).passthrough()

/** Normalize channels API response to form shape. API returns { success, data: [ { channel_id, is_active, ... } ] } */
const normalizeChannelsFromApi = raw => {
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

const ProductsForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [activeTab, setActiveTab] = useState(0)

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(productSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'channels',
  })

  const { data: product, isLoading: productLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  })

  const { data: productChannelsData } = useGetProductChannelsQuery(id, {
    skip: !id,
  })

  useEffect(() => {
    if (product?.data) {
      const data = { ...product.data }
      if (!id) {
        data.channels = [defaultChannelItem()]
      } else {
        data.channels = form.getValues('channels')?.length ? form.getValues('channels') : [defaultChannelItem()]
      }
      form.reset(data)
    }
  }, [product?.data, form, id])

  useEffect(() => {
    if (!id || !productChannelsData?.data) return
    const raw = Array.isArray(productChannelsData.data) ? productChannelsData.data : productChannelsData.data?.data ?? []
    form.setValue('channels', normalizeChannelsFromApi(raw))
  }, [id, productChannelsData, form])

  const { data: currencies, isLoading: currenciesLoading } = useGetAllCurrencyQuery()
  const { data: manufacturers, isLoading: manufacturersLoading } = useGetAllManufacturersQuery()
  const { data: unitStyles, isLoading: unitStylesLoading } = useGetAllUnitStylesQuery()
  const { data: productTypes, isLoading: productTypesLoading } = useGetAllProductTypesQuery()
  const { data: channels } = useGetAllChannelsQuery()
  const channelOptions = useMemo(() => {
    const raw = channels?.data?.data ?? channels?.data ?? []
    const activeSorted = [...(Array.isArray(raw) ? raw : [])]
      .filter(c => c.is_active === true)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    return activeSorted.map(channel => ({ label: channel.name, value: channel.id, code: channel.code }))
  }, [channels?.data])

  const watchedChannels = form.watch('channels')
  const productTypeOptions = productTypes?.data?.data?.map(productType => ({
    label: productType.name,
    value: productType.id,
  }))
  const manufacturerOptions = manufacturers?.data?.data?.map(manufacturer => ({
    label: manufacturer.name,
    value: manufacturer.id,
  }))
  const unitStyleOptions = unitStyles?.data?.data?.map(unitStyle => ({
    label: unitStyle.name,
    value: unitStyle.id,
  }))
  const currencyOptions = currencies?.data?.data?.map(currency => ({
    label: currency.name,
    value: currency.id,
  }))

  const [createProduct, { isLoading: createProductLoading }] = useCreateProductMutation()
  const [updateProduct, { isLoading: updateProductLoading }] = useUpdateProductMutation()
  const [saveProductChannels] = useSaveProductChannelsMutation()

  

  const onSubmit = data => {
    const action = id ? updateProduct : createProduct
    const payload = {
      ...data,
      stock: {
        ...data.stock,
        quantity_in_stock: +data.stock.quantity_in_stock,
        quantity_ordered: +data.stock.quantity_ordered,
        quantity_in_demand: +data.stock.quantity_in_demand,
        reorder_level: +data.stock.reorder_level,
      },
    }
    console.log('payload', JSON.stringify(payload, null, 2))
    if (id) {
      payload.id = id
    }
    action(payload)
      .unwrap()
      .then(async res => {
        const savedProductId = productId ?? res?.data?.id ?? res?.data?.data?.id ?? res?.id
        const toBool = v => v === true || v === 'true' || v === 1
        const channelsToSave =
          Array.isArray(channels) && savedProductId
            ? channels
                .filter(ch => ch.channel_id)
                .map(ch => ({
                  ...ch,
                  product_id: savedProductId,
                  is_active: toBool(ch.is_active),
                  is_price_override: toBool(ch.is_price_override),
                  is_available_for_order: toBool(ch.is_available_for_order),
                }))
            : []
        if (channelsToSave.length > 0) {
          try {
            await saveProductChannels({
              productId: savedProductId,
              channels: channelsToSave,
            }).unwrap()
          } catch {
            toast.error('Product saved but channels failed to save')
          }
        }
        if (res?.success !== false) {
          toast.success('Product saved')
          router.push('/dashboard/products')
        }
      })
      .catch(() => {
        toast.error('Failed to save product')
      })
  }
  
  const handleChannelCode = (code) => {

  }

  return (
    <UILoading
      loading={productLoading || currenciesLoading || manufacturersLoading || unitStylesLoading}
    >
      <div className="p-4 bg-white rounded-lg space-y-4">
        <div className="flex flex-col gap-4">
          <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />

          {activeTab === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              <FormField form={form} name="product_code" label="Product Code" type="text" required={true}/>
              <FormField form={form} name="product_name" label="Product Name" type="text" required={true}/>
              <FormField form={form} name="vendor_id" label="Vendor" type="select" options={[]} />
              <FormField
                form={form}
                name="manufacturer_id"
                label="Manufacturer"
                type="select"
                options={manufacturerOptions}
              />
              <FormField form={form} name="category_id" label="Category" type="select" options={[]} />
              <FormField
                form={form}
                name="product_type_id"
                label="Product Type"
                type="select"
                options={productTypeOptions}
              />
              <FormField
                form={form}
                name="unit_style_id"
                label="Unit Style"
                type="select"
                options={unitStyleOptions}
              />
              <FormField form={form} name="description" label="Description" type="textarea" />
              <FormField form={form} name="is_active" label="Is Active" type="switch" />
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              <FormField form={form} name="pricing.unit_price" label="Unit Price" type="number" />
              <FormField
                form={form}
                name="pricing.commission_rate"
                label="Commission Rate"
                type="number"
              />
              <FormField form={form} name="pricing.tax_rate" label="Tax Rate" type="number" />
              <FormField
                form={form}
                name="pricing.currency_id"
                label="Currency"
                type="select"
                options={currencyOptions}
              />
              <FormField form={form} name="pricing.is_taxable" label="Is Taxable" type="switch" />
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              <FormField
                form={form}
                name="sales_info.sales_account_id"
                label="Sales Account"
                type="select"
                options={[]}
              />
              <FormField
                form={form}
                name="sales_info.sales_tax_id"
                label="Sales Tax"
                type="select"
                options={[]}
              />
              <FormField
                form={form}
                name="sales_info.sales_start_date"
                label="Sales Start Date"
                type="date"
              />
              <FormField
                form={form}
                name="sales_info.sales_end_date"
                label="Sales End Date"
                type="date"
              />
            </div>
          )}

          {activeTab === 3 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              <FormField
                form={form}
                name="purchase_info.purchase_account_id"
                label="Purchase Account"
                type="select"
                options={[]}
              />
              <FormField
                form={form}
                name="purchase_info.purchase_tax_id"
                label="Purchase Tax"
                type="select"
                options={[]}
              />
            </div>
          )}

          {activeTab === 4 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              <FormField
                form={form}
                name="stock.quantity_in_stock"
                label="Quantity In Stock"
                type="number"
                required={true}
              />
              <FormField
                form={form}
                name="stock.quantity_ordered"
                label="Quantity Ordered"
                type="number"
                required={true}
              />
              <FormField
                form={form}
                name="stock.quantity_in_demand"
                label="Quantity In Demand"
                type="number"
                required={true}
              />
              <FormField form={form} name="stock.reorder_level" label="Reorder Level" type="number" required={true} />
            </div>
          )}

          {activeTab === 5 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              <FormField
                form={form}
                name="support.support_start_date"
                label="Support Start Date"
                type="date"
              />
              <FormField
                form={form}
                name="support.support_end_date"
                label="Support End Date"
                type="date"
              />
              <FormField
                form={form}
                name="support.warranty_months"
                label="Warranty Months"
                type="number"
              />
              <FormField
                form={form}
                name="support.support_type"
                label="Support Type"
                type="select"
                options={[]}
              />
              <FormField
                form={form}
                name="support.support_notes"
                label="Support Notes"
                type="textarea"
              />
            </div>
          )}

          {activeTab === 6 && (
            <div className="pt-2 space-y-4">
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
            </div>
          )}
        </div>

        <div className="pt-4 border-t flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab(i => Math.max(0, i - 1))}
              disabled={activeTab === 0}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab(i => Math.min(TABS.length - 1, i + 1))}
              disabled={activeTab === TABS.length - 1}
            >
              Next
            </Button>
          </div>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={updateProductLoading || createProductLoading}
          >
            {updateProductLoading || createProductLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </UILoading>
  )
}

export default ProductsForm
