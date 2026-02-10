import api from '@/lib/redux/api'
const attendanceDeviceApi = 'settings/attendance-devices'

const attendanceDeviceEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getAttendanceDevices: builder.query({
      providesTags: ['attendanceDevices'],
      query: () => ({
        url: attendanceDeviceApi,
        method: 'GET',
      }),
    }),
    addAttendanceDevice: builder.mutation({
      invalidatesTags: ['attendanceDevices'],
      query: data => ({
        url: attendanceDeviceApi,
        method: 'POST',
        data,
      }),
    }),
    updateAttendanceDevice: builder.mutation({
      invalidatesTags: ['attendanceDevices'],
      query: ({ id, ...data }) => ({
        url: `${attendanceDeviceApi}/${id}`,
        method: 'PUT',
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteAttendanceDevice: builder.mutation({
      invalidatesTags: ['attendanceDevices'],
      query: id => ({
        url: `${attendanceDeviceApi}/${id}`,
        method: 'DELETE',
      }),
    }),
    getAttendanceDeviceById: builder.query({
      providesTags: ['attendanceDevices'],
      query: id => ({
        url: `${attendanceDeviceApi}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAttendanceDevicesQuery,
  useAddAttendanceDeviceMutation,
  useUpdateAttendanceDeviceMutation,
  useDeleteAttendanceDeviceMutation,
  useGetAttendanceDeviceByIdQuery,
} = attendanceDeviceEndpoints
