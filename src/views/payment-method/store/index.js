import api from '@/lib/redux/api'

const paymentMethodApi = 'accounts/payment-methods'

export const paymentMethodApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllPaymentMethod: builder.query({
      query: (params) => ({
        url: paymentMethodApi,
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['PaymentMethod'],
    }),
    createPaymentMethod: builder.mutation({
      query: data => ({
        url: paymentMethodApi,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['PaymentMethod'],
    }),
    updatePaymentMethod: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${paymentMethodApi}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['PaymentMethod'],
    }),
    deletePaymentMethod: builder.mutation({
      query: id => ({
        url: `${paymentMethodApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PaymentMethod'],
    }),
    getPaymentMethodById: builder.query({
      query: id => ({
        url: `${paymentMethodApi}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllPaymentMethodQuery, 
    useCreatePaymentMethodMutation, 
    useUpdatePaymentMethodMutation, 
    useDeletePaymentMethodMutation, 
    useGetPaymentMethodByIdQuery } = paymentMethodApiSlice