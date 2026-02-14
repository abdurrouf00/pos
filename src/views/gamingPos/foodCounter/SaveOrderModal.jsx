import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSaveOrderMutation, useSaveDraftOrderMutation, useGetOrderByIdQuery, useUpdateOrderMutation } from './store'
import toast from 'react-hot-toast'
const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Held', value: 'held' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

export default function SaveOrderModal({ isDraft=false, setIsDraft, toggle, setToggle, items=[], currentId , setCurrentId, setItems }) {
  const initialState = {
    customer_name: '',
    order_date: new Date().toISOString().split('T')[0],
    status: isDraft ? 'draft' : '',
    note: '',
    discount_total: 0,
    paid_total: 0,
  }
  const [orderItemsForEdit, setOrderItemsForEdit] = useState([]);
  const form = useForm({
    defaultValues: initialState,
  })
  const allItems = currentId ? orderItemsForEdit : items;

  const [saveOrder, { isLoading }] = useSaveOrderMutation();
  const [saveDraftOrder, { isLoading: isDraftLoading }] = useSaveDraftOrderMutation();
  const [updateOrder, { isLoading: isUpdateLoading }] = useUpdateOrderMutation();
  const { data: orderData, isLoading: isOrderLoading } = useGetOrderByIdQuery(currentId, { skip: !currentId });
  const subtotal = allItems.reduce((sum, item) => sum + item.qty * item.pricing?.unit_price, 0)
  const discount_total = allItems.reduce((sum, item) => sum + item.discount_value, 0)
  const paid_total = subtotal - discount_total

  useEffect(() => {
    if(orderData?.data) {
      const data = orderData?.data;
      form.reset({
        customer_name: data?.customer_name,
        order_date: new Date(data?.order_date).toISOString().split('T')[0],
        status: data?.status,
        note: data?.note,
        discount_total: +data?.discount_total,
        paid_total: +data?.paid_total,
      })
      const itemsData=data?.items.map(item => ({
        id: item.product_id,
        qty: +item.qty,
        pricing: {
          unit_price: +item.rate,
        },
        tax_percent: 0,
        discount_type: item.discount_type,
        discount_value: +item.discount_value,
      }))
      console.log('itemsData', itemsData)
      setOrderItemsForEdit(itemsData)
    }
  }, [orderData])

  const getItemsData=(items)=>{
    return items.map(item => ({
      product_id:  item.id,
      qty: +item.qty,
      rate:  +item.pricing?.unit_price,
      tax_percent: 0,
      discount_type: item.discount_type,
      discount_value: +item.discount_value,
    }))
  }
  const handleSubmit = async data => {
    console.log('data', data)
    const isDraft = data.status === 'draft';
    if(allItems.length === 0) {
      toast.error('No items added to the order')
      return
    }
      const itemsData = getItemsData(allItems)
    const payload = {
      ...data,
      items: itemsData,
      discount_total: discount_total,
      paid_total: isDraft ? 0 : paid_total,
      ...(currentId ? { id: currentId , _method: 'PUT' } : {}),
    }
    console.log('payload', JSON.stringify(payload, null, 2))
    try {
      const action =  currentId ? updateOrder : saveOrder;
      const res = await action(payload)
      console.log('res', res)
      if (res.data?.success) {
        toast.success('Order saved ')
        setToggle(false)
        setItems([])
        setCurrentId?.(null)
      } else {
        toast.error(res.data?.message || 'Failed to save order')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to save order')
    }
  }
  return (
    <HrModal toggle={toggle} setToggle={setToggle} title="Save Order" onClose={() => {
      setIsDraft?.(false)
      setToggle?.(false)
      setCurrentId?.(null)
    }}>
      <div className="space-y-4">
        <FormField form={form} name="customer_name" label="Customer Name" />
        <FormField form={form} name="order_date" label="Order Date" type="date" />
        <FormField form={form} name="status" label="Status" options={statusOptions} type="select" />
        <FormField form={form} name="note" label="Note" />
        {/* <FormField form={form} name="paid_total" label="Paid Total" /> */}
      </div>
      <div className="bg-secondary p-4 rounded-lg">
        <div className="space-y-2 text-end">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-bold">{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount Total</p>
            <p className="font-bold">{+form.watch('discount_total')?.toFixed(2) || 0}</p>
          </div>
          <div className="flex justify-between">
            <p>Paid Total</p>
            <p className="font-bold">{paid_total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={isLoading || isDraftLoading}
          className={'w-full'}
          type="submit"
          onClick={form.handleSubmit(handleSubmit)}
        >
            {isLoading || isDraftLoading ? 'Saving...' : isDraft ? 'Save as draft' : 'Save'}
          </Button>
      </div>
    </HrModal>
  )
}
