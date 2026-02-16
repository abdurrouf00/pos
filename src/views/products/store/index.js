import api from '@/lib/redux/api'

const productsAPI = 'inventory/products'
// GET/POST {{base}}/api/inventory/products/:productId/channels
const productChannelsAPI = productId => `${productsAPI}/${productId}/channels`
const productUnitsAPI = productId => `${productsAPI}/${productId}/units`

const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: () => ({ url: productsAPI, method: 'GET' }),
      providesTags: ['Products'],
      overrideExisting: true,
    }),
    createProduct: builder.mutation({
      query: data => ({ url: productsAPI, method: 'POST', data }),
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
    getProductChannels: builder.query({
      query: productId => ({ url: productChannelsAPI(productId), method: 'GET' }),
      providesTags: (result, err, productId) => [{ type: 'Products', id: `${productId}-channels` }],
    }),
    getProductUnits: builder.query({
      query: productId => ({ url: productUnitsAPI(productId), method: 'GET' }),
      providesTags: (result, err, productId) => [{ type: 'Products', id: `${productId}-units` }],
    }),
    saveProductChannels: builder.mutation({
      query: ({ productId, channels }) => ({
        url: productChannelsAPI(productId),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          product_id: productId,
          channels,
        },
      }),
      invalidatesTags: (result, err, { productId }) => [
        'Products',
        { type: 'Products', id: `${productId}-channels` },
      ],
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetProductChannelsQuery,
  useSaveProductChannelsMutation,
  useGetProductUnitsQuery,
} = productsApi
