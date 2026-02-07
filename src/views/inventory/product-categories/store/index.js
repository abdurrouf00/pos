import api from '@/lib/redux/api'

const productCatAPI = 'inventory/product-categories'
export const productCatApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllProductCategories: builder.query({
      query: () => ({ url: productCatAPI, method: 'GET' }),
      providesTags: ['ProductCategories'],
    }),
    createProductCategory: builder.mutation({
      query: data => ({ url: productCatAPI, method: 'POST', data }),
      invalidatesTags: ['ProductCategories'],
    }),
    updateProductCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${productCatAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['ProductCategories'],
    }),
    deleteProductCategory: builder.mutation({
      query: id => ({ url: `${productCatAPI}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['ProductCategories'],
    }),
    getProductCategoryById: builder.query({
      query: id => ({ url: `${productCatAPI}/${id}`, method: 'GET' }),
    }),
  }),
})

export const {
  useGetAllProductCategoriesQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetProductCategoryByIdQuery,
} = productCatApiSlice
