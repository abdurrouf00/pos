import api from '@/lib/redux/api'
const requisitionAPI = 'inventory/requisitions'

const requisitionApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllRequisitions: builder.query({
      query: () => ({
        url: requisitionAPI,
        method: 'GET',
      }),
      providesTags: ['Requisitions'],
    }),
    createRequisition: builder.mutation({
      query: data => ({
        url: requisitionAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Requisitions'],
    }),
    updateRequisition: builder.mutation({
      query: ({ id, data }) => ({
        url: `${requisitionAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['Requisitions'],
    }),
    deleteRequisition: builder.mutation({
      query: id => ({
        url: `${requisitionAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Requisitions'],
    }),
    getRequisitionById: builder.query({
      query: id => ({
        url: `${requisitionAPI}/${id}`,
        method: 'GET',
      }),
    }),
    changeRequisitionStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `${requisitionAPI}/${id}/change-status`,
        method: 'POST',
        data: { is_active: is_active ? '1' : '0', _method: 'PATCH' },
      }),
      invalidatesTags: ['Requisitions'],
    }),
    submitRequisition: builder.mutation({
      query: id => ({
        url: `${requisitionAPI}/${id}/submit`,
        method: 'POST',
      }),
      invalidatesTags: ['Requisitions'],
    }),
    approveRequisition: builder.mutation({
      // POST inventory/requisitions/:id/approve
      // Body: { items: [ { id: "<requisition_item_uuid>", approved_qty: number }, ... ] }
      // Arg: { id: string, data: { items: [...] } }
      query: (arg) => {
        const id = arg?.id ?? (typeof arg === 'string' ? arg : null)
        const data = arg?.data
        if (!id || typeof id !== 'string') {
          throw new Error('Requisition id is required for approve')
        }
        return {
          url: `${requisitionAPI}/${id}/approve`,
          method: 'POST',
          data: data?.items ? { items: data.items } : { items: [] },
        }
      },
      invalidatesTags: ['Requisitions'],
    }),
  }),
})

export const {
  useGetAllRequisitionsQuery,
  useCreateRequisitionMutation,
  useUpdateRequisitionMutation,
  useDeleteRequisitionMutation,
  useGetRequisitionByIdQuery,
  useChangeRequisitionStatusMutation,
  useSubmitRequisitionMutation,
  useApproveRequisitionMutation,
} = requisitionApi
