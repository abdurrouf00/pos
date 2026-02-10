'use client'
import HrInput from '@/components/common/HrInput'
import HrModal from '@/components/common/HrModal'
import { Button } from '@/components/ui/button'
import UILoading from '@/components/ui/UILoading'
import { userData } from '@/lib/utils'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBranch,
  bindBranchData,
  getAllBranches,
  getBranchById,
  initialBranchData,
  updateBranch,
} from '../store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { getAllCompanies } from '@/views/company/store'
import HrSelect from '@/components/common/HrSelect'
import HrSwitch from '@/components/common/HrSwitch'

const BranchForm = props => {
  const { companyData } = useSelector(({ company }) => company)

  const { setOpenForm, toggle } = props
  const { basicBranchData, fetchingData, isSubmitting } = useSelector(({ branch }) => branch)
  const dispatch = useDispatch()
  const {
    id,
    name,
    phone,
    email,
    address,
    l_b_a,
    location_attributes,
    has_multiple_shift,
    shift_time_range,
    device_key,
    device_url,
    device_type,
    device_company,
    company_id,
    distance,
    latitude,
    longitude,
  } = basicBranchData

  const companyOptions = companyData?.map(company => ({
    label: company.name,
    value: company.id,
  }))
  useEffect(() => {
    dispatch(getAllCompanies())
    return () => {
      dispatch(bindBranchData(initialBranchData))
    }
  }, [])
  useEffect(() => {
    if (id) {
      dispatch(getBranchById(id))
    }
  }, [id])

  const handleSubmit = e => {
    e.preventDefault()
    const { id, distance, latitude, longitude, ...rest } = basicBranchData
    const submittedData = {
      ...rest,
      location_attributes:
        l_b_a === 1
          ? {
              distance,
              latitude,
              longitude,
            }
          : null,
      ...(id ? { id } : {}),
    }
    console.log('submittedData', submittedData)
    if (submittedData.shift_time_range > 24) {
      toast.error('Shift time range should be less than 24')
      return
    }
    if (submittedData.shift_time_range < 1) {
      toast.error('Shift time range should be greater than 1')
      return
    }
    const action = id ? updateBranch({ ...submittedData, id }) : addBranch(submittedData)
    console.log('submittedData', submittedData)
    dispatch(action).then(res => {
      if (res?.payload?.status === 201 || res?.payload?.status === 200) {
        setOpenForm(false)
        dispatch(getAllBranches())
        const toastMsg = id ? 'Branch updated' : 'Branch created'
        toast.success(toastMsg)
      } else {
        toast.error('Something went wrong')
      }
      // dispatch( bindBranchData( initialBranchData ) );
    })
  }

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(bindBranchData({ ...basicBranchData, [name]: value }))
  }

  console.log('basicBranchData', basicBranchData)

  return (
    <HrModal toggle={toggle} setToggle={setOpenForm} title={id ? 'Update Branch' : 'Add Branch'}>
      <UILoading loading={fetchingData}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <HrInput
              name="name"
              label="Branch Name"
              placeholder="Enter branch name"
              value={name}
              onChange={e => {
                handleChange(e)
              }}
              required
            />
          </div>
          <div>
            <HrSelect
              name="company_id"
              label="Company"
              placeholder="Select company"
              value={company_id}
              options={companyOptions}
              onChange={e => {
                handleChange(e)
              }}
              required
            />
          </div>
          <div>
            <HrInput
              name="phone"
              label="Phone"
              placeholder="Enter phone number"
              type="tel"
              value={phone}
              onChange={e => {
                handleChange(e)
              }}
              required
            />
          </div>
          <div>
            <HrInput
              name="email"
              label="Email"
              placeholder="Enter email address"
              type="email"
              value={email}
              onChange={e => {
                handleChange(e)
              }}
              required
            />
          </div>
          <div>
            <HrInput
              name="address"
              label="Address"
              placeholder="Enter address"
              value={address}
              onChange={e => {
                handleChange(e)
              }}
              required
            />
          </div>

          <div>
            <HrSwitch
              name="l_b_a"
              label="LBA"
              checked={l_b_a}
              onChange={checked => {
                if (checked) {
                  dispatch(
                    bindBranchData({
                      ...basicBranchData,
                      l_b_a: checked ? 1 : 0,
                    })
                  )
                } else {
                  dispatch(
                    bindBranchData({
                      ...basicBranchData,
                      l_b_a: checked ? 1 : 0,
                      distance: '',
                      latitude: '',
                      longitude: '',
                    })
                  )
                }
              }}
            />
          </div>
          {l_b_a == 1 && (
            <>
              <div>
                <HrInput
                  name="distance"
                  label="Distance"
                  placeholder="Enter Location"
                  value={distance}
                  onChange={e => {
                    handleChange(e)
                  }}
                />
              </div>
              <div>
                <HrInput
                  name="latitude"
                  label="Latitude"
                  placeholder="Enter Latitude"
                  value={latitude}
                  onChange={e => {
                    handleChange(e)
                  }}
                />
              </div>
              <div>
                <HrInput
                  name="longitude"
                  label="Longitude"
                  placeholder="Enter Longitude"
                  value={longitude}
                  onChange={e => {
                    handleChange(e)
                  }}
                />
              </div>
            </>
          )}

          <div>
            <HrSwitch
              name="has_multiple_shift"
              label="Has Multiple Shift"
              checked={has_multiple_shift === 1}
              onChange={checked => {
                dispatch(
                  bindBranchData({
                    ...basicBranchData,
                    has_multiple_shift: checked ? 1 : 0,
                  })
                )
              }}
            />
          </div>
          <div>
            <HrInput
              name="shift_time_range"
              label="Shift Time Range"
              // placeholder="Enter"
              value={shift_time_range}
              onChange={e => {
                handleChange(e)
              }}
              type="number"
              max={24}
              min={1}
            />
          </div>
          <div>
            <HrInput
              name="device_key"
              label="Device Key"
              placeholder="Enter device key"
              value={device_key}
              onChange={e => {
                handleChange(e)
              }}
            />
          </div>
          <div>
            <HrInput
              name="device_url"
              label="Device URL"
              placeholder="Enter device url"
              value={device_url}
              onChange={e => {
                handleChange(e)
              }}
            />
          </div>
          <div>
            <HrInput
              name="device_type"
              label="Device Type"
              placeholder="Enter device type"
              value={device_type}
              onChange={e => {
                handleChange(e)
              }}
            />
          </div>
          <div>
            <HrInput
              name="device_company"
              label="Device Company"
              placeholder="Enter device company"
              value={device_company}
              onChange={e => {
                handleChange(e)
              }}
            />
          </div>
          <div className="flex w-full">
            <Button disabled={isSubmitting} className="w-full" type="submit">
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </UILoading>
    </HrModal>
  )
}

export default BranchForm
