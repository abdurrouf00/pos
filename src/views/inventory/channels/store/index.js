import api from '@/lib/redux/api'

const channelApi = 'inventory/channels'

export const channelApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllChannels: builder.query({
      query: params => ({
        url: `${channelApi}?${new URLSearchParams(params)}`,
        method: 'GET',
      }),
      providesTags: ['channels'],
    }),
    createChannel: builder.mutation({
      query: data => ({
        url: channelApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['channels'],
    }),
    updateChannel: builder.mutation({
      query: ({ id, data }) => ({
        url: `${channelApi}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['channels'],
    }),
    deleteChannel: builder.mutation({
      query: id => ({
        url: `${channelApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['channels'],
    }),
    getChannelById: builder.query({
      query: id => ({
        url: `${channelApi}/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetAllChannelsQuery,
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
  useGetChannelByIdQuery,
} = channelApiSlice
