import api from '@/lib/redux/api'

const foodCounterApi = 'gamezone-pos/food-counter'

const foodCounterApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: (params) => ({
        url: `${foodCounterApi}?${new URLSearchParams(params)}`,
        method: 'GET',
      }),
      providesTags: ['FoodCounter'],
    }),
    saveOrder: builder.mutation({
      query: data => ({
        url: `${foodCounterApi}`,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['FoodCounter'],
    }),
    saveDraftOrder: builder.mutation({
      query: data => ({
        url: `gamezone-pos/food-counter-orders-hold`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['FoodCounter'],
    }),
    getOrderById: builder.query({
      query: id => ({
        url: `${foodCounterApi}/${id}`,
        method: 'GET',
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${foodCounterApi}/${id}`,
        method: 'POST',
        data,
      }),
    }),
  }),
})

export const { useSaveOrderMutation, 
  useGetOrdersQuery , 
  useSaveDraftOrderMutation, 
  useLazyGetOrderByIdQuery,
   useGetOrderByIdQuery, 
   useUpdateOrderMutation } = foodCounterApiSlice
