'use client'
import HrModal from '@/components/common/HrModal'
import {
  useGetHolidayByIdQuery,
  useCreateHolidayMutation,
  useUpdateHolidayMutation,
} from '../store'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
const initialState = {
  name: '',
  from_date: '',
  to_date: '',
  description: '',
  is_recurring_yearly: false,
  is_active: true,
}
export default function HolidayForm({ open, setOpen, editId = null, setEditId }) {
  const form = useForm({
    defaultValues: initialState,
    mode: 'onChange',
  })
  const { data: editData, isFetching: editDataLoading } = useGetHolidayByIdQuery(editId, {
    skip: !editId,
  })
  const [createHoliday, { isLoading: createHolidayLoading }] = useCreateHolidayMutation()
  const [updateHoliday, { isLoading: updateHolidayLoading }] = useUpdateHolidayMutation()
  useEffect(() => {
    const fromDate = new Date(editData?.data?.from_date)
    const toDate = new Date(editData?.data?.to_date)
    if (editData) {
      const data = {
        ...editData?.data,
        from_date: fromDate.toISOString().split('T')[0],
        to_date: toDate.toISOString().split('T')[0],
      }
      console.log('data', data)
      form.reset(data)
    }
  }, [editData])

  const onSubmit = async data => {
    const payload = {
      ...data,
      is_recurring_yearly: data.is_recurring_yearly ? 1 : 0,
      is_active: data.is_active ? 1 : 0,
    }
    console.log('payload', JSON.stringify(payload, null, 2))
    try {
      const action = editId ? updateHoliday({ id: editId, data: payload }) : createHoliday(payload)
      const res = await action.unwrap()
      console.log('res', res)
      if (res?.success) {
        toast.success(editId ? 'Holiday updated successfully' : 'Holiday created successfully')
        setOpen(false)
        setEditId(null)
      } else {
        toast.error(res?.data?.message || 'Failed to save holiday')
      }
    } catch (error) {
      console.log('error', error)
    }
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
      title={editId ? 'Edit Holiday' : 'Add Holiday'}
    >
      <div className="space-y-4">
        <FormField name="name" form={form} label="Name" placeholder="Name" />
        <FormField
          type="date"
          name="from_date"
          form={form}
          label="From Date"
          placeholder="From Date"
        />
        <FormField
          type="date"
          name="to_date"
          form={form}
          label="To Date"
          placeholder="To Date"
          disabled={!form.watch('from_date')}
          min={form.watch('from_date')}
        />
        <FormField
          name="description"
          form={form}
          label="Description"
          placeholder="Description"
          type="textarea"
        />
        <div className="flex items-center gap-2">
          <FormField
            name="is_recurring_yearly"
            form={form}
            label="Is Recurring Yearly"
            type="switch"
          />
          <FormField name="is_active" form={form} label="Is Active" type="switch" />
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full mt-4"
          type="submit"
          variant="primary"
          disabled={form.formState.isSubmitting}
        >
          {createHolidayLoading || updateHolidayLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </HrModal>
  )
}
