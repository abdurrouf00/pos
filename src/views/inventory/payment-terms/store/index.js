import api from '@/lib/redux/api'

const paymentTermsAPI = 'inventory/payment-terms'

const paymentTermsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllPaymentTerms: builder.query({
      query: () => ({
        url: paymentTermsAPI,
        method: 'GET',
      }),
      providesTags: ['PaymentTerms'],
    }),
    createPaymentTerm: builder.mutation({
      query: data => ({
        url: paymentTermsAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['PaymentTerms'],
    }),
    updatePaymentTerm: builder.mutation({
      query: ({ id, data }) => ({
        url: `${paymentTermsAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['PaymentTerms'],
    }),
    deletePaymentTerm: builder.mutation({
      query: id => ({
        url: `${paymentTermsAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PaymentTerms'],
    }),
    getPaymentTermById: builder.query({
      query: id => ({
        url: `${paymentTermsAPI}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllPaymentTermsQuery,
  useCreatePaymentTermMutation,
  useUpdatePaymentTermMutation,
  useDeletePaymentTermMutation,
  useGetPaymentTermByIdQuery,
} = paymentTermsApiSlice
