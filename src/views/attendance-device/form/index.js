import HrInput from '@/components/common/HrInput'
import HrModal from '@/components/common/HrModal'
import { Button } from '@/components/ui/button'
import UILoading from '@/components/ui/UILoading'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  useAddAttendanceDeviceMutation,
  useGetAttendanceDeviceByIdQuery,
  useUpdateAttendanceDeviceMutation,
} from '../store'
const AttendanceDeviceForm = ({ open, setOpen, currentId, setCurrentId }) => {
  const [deviceFormData, setDeviceFormData] = useState({
    device_name: '',
    device_id: '',
  })

  const { data: attendanceDeviceData, isLoading: isLoadingAttendanceDevice } =
    useGetAttendanceDeviceByIdQuery(currentId, { skip: !currentId })
  const [addAttendanceDevice, { isLoading: isAddingAttendanceDevice }] =
    useAddAttendanceDeviceMutation()
  const [updateAttendanceDevice, { isLoading: isUpdatingAttendanceDevice }] =
    useUpdateAttendanceDeviceMutation()

  useEffect(() => {
    if (attendanceDeviceData) {
      setDeviceFormData({
        device_name: attendanceDeviceData.data.device_name,
        device_id: attendanceDeviceData.data.device_id,
      })
    }
  }, [attendanceDeviceData])

  const handleChange = e => {
    setDeviceFormData({ ...deviceFormData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const action = currentId ? updateAttendanceDevice : addAttendanceDevice
    const data = {
      ...deviceFormData,

      ...(currentId ? { id: currentId } : {}),
    }
    const res = await action(data).unwrap()
    if (res.success) {
      toast.success(currentId ? 'Device Updated' : 'Device Added')
      setOpen(false)
    } else {
      toast.error(res.data?.message || 'Something went wrong')
    }
  }

  const handleModalClose = () => {
    setCurrentId(null)
    setOpen(false)
  }

  return (
    <HrModal
      title={currentId ? 'Update Attendance Device' : 'Add Attendance Device'}
      toggle={open}
      setToggle={setOpen}
      onClose={handleModalClose}
    >
      <UILoading loading={isLoadingAttendanceDevice}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <HrInput
            label="Device Name"
            name="device_name"
            value={deviceFormData.device_name}
            onChange={handleChange}
            required
          />
          <HrInput
            label="Device ID"
            name="device_id"
            value={deviceFormData.device_id}
            onChange={handleChange}
            required
          />
          <Button
            disabled={isAddingAttendanceDevice || isUpdatingAttendanceDevice}
            type="submit"
            className="w-full"
          >
            {isAddingAttendanceDevice || isUpdatingAttendanceDevice ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </UILoading>
    </HrModal>
  )
}

export default AttendanceDeviceForm
