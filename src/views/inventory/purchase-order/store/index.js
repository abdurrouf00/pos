import api from '@/lib/redux/api'
const purchaseOrderAPI = 'inventory/purchase-orders'

const purchaseOrderApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllPurchaseOrders: builder.query({
      query: () => ({
        url: purchaseOrderAPI,
        method: 'GET',
      }),
      providesTags: ['PurchaseOrders'],
    }),
    createPurchaseOrder: builder.mutation({
      query: data => ({
        url: purchaseOrderAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    updatePurchaseOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `${purchaseOrderAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    deletePurchaseOrder: builder.mutation({
      query: id => ({
        url: `${purchaseOrderAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    getPurchaseOrderById: builder.query({
      query: id => ({
        url: `${purchaseOrderAPI}/${id}`,
        method: 'GET',
      }),
    }),
    changePurchaseOrderStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `${purchaseOrderAPI}/${id}/change-status`,
        method: 'POST',
        data: { is_active: is_active ? '1' : '0', _method: 'PATCH' },
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    submitPurchaseOrder: builder.mutation({
      query: id => ({
        url: `${purchaseOrderAPI}/${id}/submit`,
        method: 'POST',
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    approvePurchaseOrder: builder.mutation({
      // POST inventory/purchase-orders/:id/approve
      // Body: { items: [ { id: "<purchase_order_item_uuid>", approved_qty: number }, ... ] }
      // Arg: { id: string, data: { items: [...] } }
      query: (arg) => {
        const id = arg?.id ?? (typeof arg === 'string' ? arg : null)
        const data = arg?.data
        if (!id || typeof id !== 'string') {
          throw new Error('Purchase order id is required for approve')
        }
        return {
          url: `${purchaseOrderAPI}/${id}/approve`,
          method: 'POST',
          data: data?.items ? { items: data.items } : { items: [] },
        }
      },
      invalidatesTags: ['PurchaseOrders'],
    }),
  }),
})

export const {
  useGetAllPurchaseOrdersQuery,
  useCreatePurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useGetPurchaseOrderByIdQuery,
  useChangePurchaseOrderStatusMutation,
  useSubmitPurchaseOrderMutation,
  useApprovePurchaseOrderMutation,
} = purchaseOrderApi
