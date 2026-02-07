import api from '@/lib/redux/api'
const productsAPI = 'inventory/products'
const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: () => ({ url: productsAPI, method: 'GET' }),
      providesTags: ['Products'],
      overrideExisting: true,
    }),
    createProduct: builder.mutation({
      query: data => ({ url: productsAPI, method: 'POST', data: data }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${productsAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: id => ({ url: `${productsAPI}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: id => ({ url: `${productsAPI}/${id}`, method: 'GET' }),
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} = productsApi
