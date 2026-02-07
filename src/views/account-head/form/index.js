import HrInput from '@/components/common/HrInput'
import HrModal from '@/components/common/HrModal'
import HrSwitch from '@/components/common/HrSwitch'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  useAddAccountHeadMutation,
  useGetAccountHeadByIdQuery,
  useGetAccountHeadsByQueryQuery,
  useGetAccountTypesQuery,
  useUpdateAccountHeadMutation,
} from '../store'
import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import toast from 'react-hot-toast'
import UILoading from '@/components/ui/UILoading'

export default function AccountHeadForm({ setOpenForm, toggle, currentId, setCurrentId }) {
  const [formData, setFormData] = useState({
    name: '',
    acc_type_id: '',
    code: '',
    has_parent: 0,
    parent_head_id: '',
    is_active: 1,
    opening_balance: 0,
  })

  //queries
  const { data: accountTypes, isLoading: accountTypesLoading } = useGetAccountTypesQuery()
  const { data: accountHeads, isLoading: accountHeadsLoading } = useGetAccountHeadsByQueryQuery()
  const [addAccountHead, { isLoading: addAccountHeadLoading }] = useAddAccountHeadMutation()
  const [updateAccountHead, { isLoading: updateAccountHeadLoading }] =
    useUpdateAccountHeadMutation()
  const {
    data: accountHeadData,
    isLoading: accountHeadDataLoading,
    refetch,
  } = useGetAccountHeadByIdQuery(currentId, { skip: !currentId })

  useEffect(() => {
    if (accountHeadData?.data) {
      setFormData({
        name: accountHeadData.data.name || '',
        acc_type_id: accountHeadData.data.acc_type_id || '',
        code: accountHeadData.data.code || '',
        has_parent: accountHeadData.data.has_parent || 0,
        parent_head_id: accountHeadData.data.parent_head_id || '',
        is_active: accountHeadData.data.is_active || 1,
        opening_balance: accountHeadData.data.opening_balance || 0,
      })
    }
  }, [accountHeadData])

  const handleSwitch = (value, name) => {
    if (name === 'has_parent' && !value) {
      setFormData({ ...formData, parent_head_id: '', has_parent: 0 })
    } else {
      setFormData({ ...formData, [name]: value ? 1 : 0 })
    }
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const accountTypeOptions = mapOptions(accountTypes?.data || [])
  const accountHeadOptions = mapOptions(accountHeads?.data || [])
  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      ...formData,
      parent_head_id: formData.parent_head_id ? formData.parent_head_id : null,
      ...(currentId ? { id: currentId } : {}),
    }
    const mutation = currentId ? updateAccountHead : addAccountHead
    mutation({ data }).then(res => {
      if (res.data?.success) {
        toast.success(
          currentId ? 'Account Head updated successfully' : 'Account Head added successfully'
        )
        setOpenForm(false)
      } else if (res.error) {
        toast.error('Something went wrong')
      }
    })
  }

  const handleModalClose = () => {
    setCurrentId(null)
  }
  return (
    <HrModal
      toggle={toggle}
      setToggle={setOpenForm}
      title={currentId ? 'Update Account Head' : 'Add Account Head'}
      onClose={handleModalClose}
    >
      <UILoading loading={accountHeadsLoading || accountTypesLoading || accountHeadDataLoading}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <HrInput
              name="name"
              label="Name"
              placeholder="Enter name"
              value={formData.name}
              onChange={e => handleChange(e)}
              required
            />
          </div>
          <div>
            <HrSelect
              name="acc_type_id"
              label="Account Type"
              placeholder="Select account type"
              value={formData.acc_type_id}
              onChange={e => handleChange(e)}
              options={accountTypeOptions}
              required
            />
          </div>
          <div>
            <HrInput
              name="code"
              label="Code"
              placeholder="Enter code"
              value={formData.code}
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <HrSwitch
              name="has_parent"
              label="Has Parent"
              checked={formData.has_parent === 1}
              onChange={value => handleSwitch(value, 'has_parent')}
            />
          </div>
          <div>
            <HrSelect
              name="parent_head_id"
              label="Parent Head"
              placeholder="Select parent head"
              value={formData.parent_head_id}
              onChange={e => handleChange(e)}
              options={accountHeadOptions}
              disabled={formData.has_parent === 0}
              required={formData.has_parent === 1}
            />
          </div>
          <div>
            <HrSwitch
              name="is_active"
              label="Is Active"
              checked={formData.is_active === 1}
              onChange={value => handleSwitch(value, 'is_active')}
            />
          </div>
          <div>
            <HrInput
              name="opening_balance"
              label="Opening Balance"
              placeholder="Enter opening balance"
              value={formData.opening_balance}
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={addAccountHeadLoading || updateAccountHeadLoading}
            >
              {addAccountHeadLoading || updateAccountHeadLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </UILoading>
    </HrModal>
  )
}
