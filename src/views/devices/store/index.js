import api from "@/lib/redux/api";


const devicesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["devices"],
    getAllDevices: builder.query({
      providesTags: ["devices"],
      query: () => {
        const url = `attendance-device`;
        return {
          url: url,
          method: 'GET',
        };
      }
    }),
    addDevice: builder.mutation({
      invalidatesTags: ["devices"],
      query: (id) => {
        const url = `attendance-device`;
        return {
          url: url,
          method: 'POST',
          data: id
          // dataType: 'json'
        };
      }
    }),
    updateDevice: builder.mutation({
      invalidatesTags: ["devices"],
      query: ({ id, ...rest }) => {
        const url = `attendance-device/${id}`;
        return {
          url: url,
          method: 'POST',
          data: rest
          // dataType: 'json'
        };
      }
    }),
    deleteDevice: builder.mutation({
      invalidatesTags: ["devices"],
      query: (id) => {
        const url = `attendance-device/${id}`;
        return {
          url: url,
          method: 'DELETE',
          data: id
          // dataType: 'json'
        };
      }
    }),
    getDeviceById: builder.query({
      // providesTags: ["devices"],
      query: (id) => {
        const url = `attendance-device/${id}`;
        return {
          url: url,
          method: 'GET',
        };
      }
    })

  }),
});
export const { useAddDeviceMutation, useGetAllDevicesQuery, useUpdateDeviceMutation, useDeleteDeviceMutation, useGetDeviceByIdQuery } = devicesEndpoints;