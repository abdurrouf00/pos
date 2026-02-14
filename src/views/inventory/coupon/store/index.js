import api from '@/lib/redux/api'
const couponAPI = 'inventory/coupons'

const couponApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCoupons: builder.query({
      query: () => ({
        url: couponAPI,
        method: 'GET',
      }),
      providesTags: ['Coupons'],
    }),
    createCoupon: builder.mutation({
      query: data => ({
        url: couponAPI,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Coupons'],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `${couponAPI}/${id}`,
        method: 'POST',
        data: { ...data, _method: 'PUT' },
      }),
      invalidatesTags: ['Coupons'],
    }),
    deleteCoupon: builder.mutation({
      query: id => ({
        url: `${couponAPI}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupons'],
    }),
    getCouponById: builder.query({
      query: id => ({
        url: `${couponAPI}/${id}`,
        method: 'GET',
      }),
    }),
    changeCouponStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `${couponAPI}/${id}/change-status`,
        method: 'POST',
        data: { is_active: is_active ? '1' : '0', _method: 'PATCH' },
      }),
      invalidatesTags: ['Coupons'],
    }),
  }),
})

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponByIdQuery,
  useChangeCouponStatusMutation,
} = couponApi
