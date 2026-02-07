'use client'

import AccountTypeSelect from '@/components/AccountTypeSelect'
import HrInput from '@/components/common/HrInput'
import HrSelect from '@/components/common/HrSelect'
import { Button } from '@/components/ui/button'
import HrModal from '@/components/common/HrModal'

import { useEffect, useState } from 'react'
import {
  useAddChartOfAccountsMutation,
  useGetAccountTypesQuery,
  useGetChartOfAccountsByIdQuery,
  useGetParentAccountsQuery,
  useUpdateChartOfAccountsMutation,
} from '../store'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import _ from 'lodash'
import UILoading from '@/components/ui/UILoading'
import HrSwitch from '@/components/common/HrSwitch'

const data = [
  {
    id: '1000',
    name: 'Assets',
    type: 'ASSET',
    children: [
      {
        id: '1100',
        name: 'Current Assets',
        children: [
          {
            id: '1110',
            name: 'Cash',
            normalBalance: 'DEBIT',
          },
          {
            id: '1120',
            name: 'Bank',
            normalBalance: 'DEBIT',
          },
          {
            id: '1130',
            name: 'Accounts Receivable',
            normalBalance: 'DEBIT',
          },
          {
            id: '1140',
            name: 'Inventory',
            normalBalance: 'DEBIT',
          },
        ],
      },
      {
        id: '1200',
        name: 'Fixed Assets',
        children: [
          {
            id: '1210',
            name: 'Office Equipment',
            normalBalance: 'DEBIT',
          },
          {
            id: '1220',
            name: 'Furniture & Fixtures',
            normalBalance: 'DEBIT',
          },
        ],
      },
    ],
  },
  {
    id: '2000',
    name: 'Liabilities',
    type: 'LIABILITY',
    children: [
      {
        id: '2100',
        name: 'Current Liabilities',
        children: [
          {
            id: '2110',
            name: 'Accounts Payable',
            normalBalance: 'CREDIT',
          },
          {
            id: '2120',
            name: 'Accrued Expenses',
            normalBalance: 'CREDIT',
          },
        ],
      },
      {
        id: '2200',
        name: 'Long-term Liabilities',
        children: [
          {
            id: '2210',
            name: 'Bank Loan',
            normalBalance: 'CREDIT',
          },
        ],
      },
    ],
  },
  {
    id: '3000',
    name: 'Equity',
    type: 'EQUITY',
    children: [
      {
        id: '3100',
        name: 'Owner’s Equity',
        children: [
          {
            id: '3110',
            name: 'Owner Capital',
            normalBalance: 'CREDIT',
          },
          {
            id: '3120',
            name: 'Retained Earnings',
            normalBalance: 'CREDIT',
          },
        ],
      },
    ],
  },
  {
    id: '4000',
    name: 'Income',
    type: 'INCOME',
    children: [
      {
        id: '4100',
        name: 'Operating Income',
        children: [
          {
            id: '4110',
            name: 'Sales Revenue',
            normalBalance: 'CREDIT',
          },
          {
            id: '4120',
            name: 'Service Revenue',
            normalBalance: 'CREDIT',
          },
        ],
      },
    ],
  },
  {
    id: '5000',
    name: 'Expenses',
    type: 'EXPENSE',
    children: [
      {
        id: '5100',
        name: 'Operating Expenses',
        children: [
          {
            id: '5110',
            name: 'Rent Expense',
            normalBalance: 'DEBIT',
          },
          {
            id: '5120',
            name: 'Salary Expense',
            normalBalance: 'DEBIT',
          },
          {
            id: '5130',
            name: 'Utilities Expense',
            normalBalance: 'DEBIT',
          },
        ],
      },
    ],
  },
]

export default function AccountForm({ currentId, setCurrentId, isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    accountType: '',
    account_name: '',
    isSubAccount: false,
    parent_id: '',
    code: '',
    description: '',
    balance_type: '',
    opening_balance: 0,
    is_active: 1,
  })

  const { data: accountTypes, isLoading: accountTypesLoading } = useGetAccountTypesQuery()

  const accountTypeOptions = _.groupBy(accountTypes?.data, 'code')
  const selectedAccountType = Object.values(accountTypeOptions)
    .flat()
    .find(item => item.id === formData.accountType)
  const parentAccountParams = {
    account_type_id: formData.accountType,
  }
  const { data: accountData, isLoading: accountDataLoading } = useGetChartOfAccountsByIdQuery(
    currentId,
    { skip: !currentId }
  )

  useEffect(() => {
    if (accountData?.data) {
      const dataObj = accountData.data
      setFormData({
        accountType: dataObj.account_type?.id,
        account_name: dataObj.account_name,
        isSubAccount: dataObj.has_parent,
        parent_id: dataObj.parent_head_id,
        code: dataObj.code,
        description: dataObj.description,
        balance_type: dataObj.balance_type,
        opening_balance: dataObj.opening_balance,
        is_active: dataObj.is_active,
      })
      // setFormData(dataObj)
    }
  }, [accountData])
  const { data: parentAccounts, isLoading: parentAccountsLoading } = useGetParentAccountsQuery(
    parentAccountParams,
    { skip: !formData.accountType }
  )
  const parentAccountOptions = parentAccounts?.data.map(itm => {
    return {
      ...itm,
      label: itm.account_name,
      value: itm.id,
    }
  })
  //add account mutation
  const [addAccount, { isLoading: addAccountLoading }] = useAddChartOfAccountsMutation()
  //update account mutation
  const [updateAccount, { isLoading: updateAccountLoading }] = useUpdateChartOfAccountsMutation()
  //group options by it's code in accountTypes.data

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!formData.account_name) {
      alert('Account Name is required')
      return
    }

    // Reset form
    const data = {
      account_name: formData.account_name,
      account_type: selectedAccountType?.name,
      code: selectedAccountType?.code,
      has_parent: formData.isSubAccount ? true : false,
      parent_head_id: formData.parent_id,
      opening_balance: +formData.opening_balance,
      balance_type: 'credit',
      is_active: 1,
      description: formData.description,
      ...(currentId && { id: currentId }),
    }
    const action = currentId ? updateAccount : addAccount
    action(data).then(res => {
      if (res.data?.success) {
        toast.success(
          currentId ? 'Account Head updated successfully' : 'Account Head added successfully'
        )
        setOpenForm(false)
        // setCurrentId(null)
      } else {
        toast.error(res?.data?.message || 'Something went wrong')
      }
    })
    // alert('Account added successfully!')
  }

  return (
    <HrModal
      title={currentId ? 'Edit chart of account' : 'Add chart of account'}
      toggle={isOpen}
      setToggle={setIsOpen}
      onClose={() => {
        setCurrentId(null)
        setIsOpen(false)
      }}
    >
      <UILoading loading={accountTypesLoading}>
        <form onSubmit={handleSubmit} className=" space-y-4 max-w-xl ">
          <AccountTypeSelect
            name="accountType"
            label="Account Type"
            data={accountTypeOptions}
            onChange={value => setFormData({ ...formData, accountType: value })}
            value={formData.accountType}
          />

          <div className=" flex">
            <HrInput
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              label="Account Name"
            />
          </div>

          {parentAccounts?.data?.length > 0 && (
            <>
              {' '}
              <label className="block text-sm">
                <input
                  type="checkbox"
                  name="isSubAccount"
                  checked={formData.isSubAccount}
                  onChange={handleChange}
                />{' '}
                Make this a sub-account
              </label>
              {formData.isSubAccount && (
                <HrSelect
                  options={parentAccountOptions}
                  label="Parent Account"
                  onChange={handleChange}
                  name="parent_id"
                  value={formData.parent_id}
                />
              )}
            </>
          )}
          <div>
            <HrInput
              name="opening_balance"
              value={formData.opening_balance}
              onChange={handleChange}
              label="Opening Balance"
              type="number"
            />
          </div>
          <div className="flex">
            <HrInput name="code" value={selectedAccountType?.code} disabled label="Account Code" />
          </div>
          <div>
            <HrSelect
              name="balance_type"
              label="Balance Type"
              value={formData.balance_type}
              onChange={handleChange}
              options={[
                { value: 'credit', label: 'Credit' },
                { value: 'debit', label: 'Debit' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              name="description"
              value={formData.description ?? ''}
              onChange={handleChange}
              className="w-full border p-1 rounded"
              label="Description"
            />
          </div>

          <HrSwitch
            name="is_active"
            label="Is Active"
            checked={formData.is_active}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={addAccountLoading || updateAccountLoading}
          >
            {addAccountLoading || updateAccountLoading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </UILoading>
    </HrModal>
  )
}
