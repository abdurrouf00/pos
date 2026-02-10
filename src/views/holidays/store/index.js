import api from "@/lib/redux/api";

const holidaysApi = 'settings/holidays';

const holidaysEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getHolidays: builder.query({
      query: () => ({
        url: holidaysApi,
        method: 'GET',
      }),
      providesTags: ['holidays'],
    }),
    createHoliday: builder.mutation({
      query: (data) => ({
        url: holidaysApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['holidays'],
    }),
    updateHoliday: builder.mutation({
      query: ({id,data}) => ({
        url: `${holidaysApi}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['holidays'],
    }),
    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `${holidaysApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['holidays'],
    }),
    getHolidayById: builder.query({
      query: (id) => ({
        url: `${holidaysApi}/${id}`,
        method: 'GET',
      }),
      providesTags: ['holidays'],
    }),
  }),
});

export const { useGetHolidaysQuery, useCreateHolidayMutation, useUpdateHolidayMutation, useDeleteHolidayMutation, useGetHolidayByIdQuery } = holidaysEndpoints;