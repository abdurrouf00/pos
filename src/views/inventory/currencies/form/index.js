import React, { useEffect, useMemo } from 'react'
import HrModal from '@/components/common/HrModal'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/FormField'
import {
  useCreateCurrencyMutation,
  useGetAllCountryQuery,
  useGetCurrencyByIdQuery,
  useUpdateCurrencyMutation,
} from '../store'
import { useForm } from 'react-hook-form'
import { mapOptions } from '@/components/common/HrSelect'
import HrSwitch from '@/components/common/HrSwitch'
import UILoading from '@/components/ui/UILoading'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  symbol: z.string().min(1, 'Symbol is required'),
  is_default: z.boolean(),
  is_active: z.boolean(),
})
export default function CurrenciesForm({ editId, open, setOpen, setEditId, countryDataOptions }) {
  const initialData = {
    name: '',
    symbol: '',
    is_default: false,
    is_active: true,
  }

  const [createCurrency, { isLoading: createLoading }] = useCreateCurrencyMutation()
  const [updateCurrency, { isLoading: updateLoading }] = useUpdateCurrencyMutation()
  const { data: currency, isLoading: currencyLoading } = useGetCurrencyByIdQuery(editId, {
    skip: !editId,
  })

  useEffect(() => {
    if (currency?.data) {
      form.reset({
        name: currency?.data?.code,
        symbol: currency?.data?.symbol,

        is_default: currency?.data?.is_default,
        is_active: currency?.data?.is_active,
      })
    }
  }, [currency?.data])

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
    form.reset(initialData)
  }

  const onSubmit = async data => {
    const selectedCountry = countryDataOptions.find(country => country.value === data.name)
    console.log('selectedCountry', selectedCountry)
    const payload = {
      name: selectedCountry?.label,
      code: selectedCountry?.code,
      symbol: data.symbol,
      is_default: data.is_default ? 1 : 0,
      is_active: data.is_active ? 1 : 0,
    }
    console.log('payload', JSON.stringify(payload, null, 2))
    let res
    try {
      if (editId) {
        res = await updateCurrency({ id: editId, data: payload })
      } else {
        res = await createCurrency(payload)
      }
      console.log('submit res', res)
      if (res?.data?.success) {
        toast.success(editId ? 'Currency updated successfully' : 'Currency created successfully')
        handleClose()
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <HrModal
      title={editId ? 'Edit Currency' : 'Add Currency'}
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
    >
      <UILoading loading={currencyLoading}>
        <div className="space-y-4">
          <FormField
            form={form}
            name="name"
            label="Country"
            placeholder="Select country"
            required
            id="name"
            type="select"
            options={countryDataOptions}
          />

          <FormField
            form={form}
            name="symbol"
            label="Symbol"
            placeholder="Enter symbol"
            required
            id="symbol"
            type="text"
          />
          <FormField
            type="switch"
            form={form}
            name="is_default"
            label="Is Default"
            id="is_default"
          />
          <FormField type="switch" form={form} name="is_active" label="Active" id="is_active" />
          <Button
            disabled={createLoading || updateLoading}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            className="w-full"
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </UILoading>
    </HrModal>
  )
}
