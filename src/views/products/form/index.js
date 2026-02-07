'use client'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { useGetAllCurrencyQuery } from '@/views/inventory/currencies/store'
import { useGetAllManufacturersQuery } from '@/views/inventory/manufacturers/store'
import { useGetAllUnitStylesQuery } from '@/views/inventory/unit-styles/store'
import { useForm } from 'react-hook-form'
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../store'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import UILoading from '@/components/ui/UILoading'
import { useGetAllProductTypesQuery } from '@/views/inventory/product-types/store'

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
}
const ProductsForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { data: product, isLoading: productLoading } = useGetProductByIdQuery(id, {
    skip: !id,
  })
  useEffect(() => {
    if (product?.data) {
      form.reset(product?.data)
    }
  }, [product])
  const form = useForm({
    defaultValues: initialData,
  })
  const { data: currencies, isLoading: currenciesLoading } = useGetAllCurrencyQuery()
  const { data: manufacturers, isLoading: manufacturersLoading } = useGetAllManufacturersQuery()
  const { data: unitStyles, isLoading: unitStylesLoading } = useGetAllUnitStylesQuery()
  const { data: productTypes, isLoading: productTypesLoading } = useGetAllProductTypesQuery()
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
  const onSubmit = data => {
    const action = id ? updateProduct : createProduct
    if (id) {
      data.id = id
    }
    action(data)
      .unwrap()
      .then(res => {
        console.log('res', res)
        if (res.success) {
          toast.success('Product saved')
          router.push('/dashboard/products')
        }
      })
      .catch(err => {
        toast.error('Failed to save product')
      })
  }
  return (
    <UILoading
      loading={productLoading || currenciesLoading || manufacturersLoading || unitStylesLoading}
    >
      <div className="p-4 bg-white rounded-lg space-y-4 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <FormField form={form} name="product_code" label="Product Code" type="text" />
          <FormField form={form} name="product_name" label="Product Name" type="text" />
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <FormField
            form={form}
            name="stock.quantity_in_stock"
            label="Quantity In Stock"
            type="number"
          />
          <FormField
            form={form}
            name="stock.quantity_ordered"
            label="Quantity Ordered"
            type="number"
          />
          <FormField
            form={form}
            name="stock.quantity_in_demand"
            label="Quantity In Demand"
            type="number"
          />
          <FormField form={form} name="stock.reorder_level" label="Reorder Level" type="number" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={updateProductLoading || createProductLoading}
        >
          {updateProductLoading || createProductLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </UILoading>
  )
}

export default ProductsForm
