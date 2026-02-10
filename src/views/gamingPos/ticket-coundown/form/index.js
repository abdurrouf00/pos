'use client'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const ExpenseForm = () => {
  const router = useRouter()
  const [expenseData, setExpenseData] = useState({
    category: '',
    date_time: '',
    receive: '',
    expense: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setExpenseData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Saving Expense:', expenseData)
    // Add your save logic here (API call)
    router.push('/dashboard/expense')
  }

  return (
    <div className="bg-white shadow-sm border border-gray-100 p-6 rounded-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <HrSelect
          label="Category"
          name="category"
          value={expenseData.category}
          onChange={handleChange}
          placeholder="Select category"
          options={[
            { value: 'Premium Plan', label: 'Premium Plan' },
            { value: 'Standard Plan', label: 'Standard Plan' },
            { value: 'Dinner Plan', label: 'Dinner Plan' },
            { value: 'Other', label: 'Other' },
          ]}
        />
        
        <HrInput
          label="Date & Time"
          name="date_time"
          value={expenseData.date_time}
          onChange={handleChange}
          type="datetime-local"
          placeholder="Enter date and time"
        />

        <HrInput
          label="Receive Amount"
          name="receive"
          value={expenseData.receive}
          onChange={handleChange}
          type="number"
          placeholder="0.00"
        />

        <HrInput
          label="Expense Amount"
          name="expense"
          value={expenseData.expense}
          onChange={handleChange}
          type="number"
          placeholder="0.00"
        />

        <div className="md:col-span-2">
            <HrInput
            label="Description"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            type="textarea"
            placeholder="Enter short description about this expense..."
            className="w-full"
            />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
        <Button variant="outline" onClick={() => router.back()} className="px-6">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
           Save Expense
        </Button>
      </div>
    </div>
  )
}

export default ExpenseForm
