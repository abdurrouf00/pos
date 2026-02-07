import api from '@/lib/redux/api'

const prodTypeAPI = 'inventory/product-types'
const productTypesApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllProductTypes: builder.query({
      query: () => ({ url: prodTypeAPI, method: 'GET' }),
      providesTags: ['ProductTypes'],
    }),
    createProductType: builder.mutation({
      query: data => ({
        url: prodTypeAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['ProductTypes'],
    }),
    updateProductType: builder.mutation({
      query: ({ id, data }) => ({
        url: `${prodTypeAPI}/${id}`,
        method: 'POST',
        data: {
          ...data,
          _method: 'PUT',
        },
      }),
      invalidatesTags: ['ProductTypes'],
    }),
    deleteProductType: builder.mutation({
      query: id => ({
        url: `${prodTypeAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProductTypes'],
    }),
    getProductTypeById: builder.query({
      query: id => ({ url: `${prodTypeAPI}/${id}`, method: 'GET' }),
    }),
  }),
})

export const {
  useGetAllProductTypesQuery,
  useCreateProductTypeMutation,
  useUpdateProductTypeMutation,
  useDeleteProductTypeMutation,
  useGetProductTypeByIdQuery,
} = productTypesApi
