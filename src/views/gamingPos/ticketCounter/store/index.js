import api from "@/lib/redux/api";

const productsPosApi = 'inventory/products/pos/products';
const couponApi = 'inventory/coupons';
const customerApi = 'contacts'; // Placeholder - update when API is ready

const productsPosEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTicketCounter: builder.query({
      query: () => ({
        url: productsPosApi,
        method: "GET",
      }),
      providesTags: ["ticketCounter"],
    }),
    getProductPosById: builder.query({
      query: (id) => ({
        url: `${productsPosApi}/${id}`,
        method: "GET",
      }),
    }),
    addProductPos: builder.mutation({
      query: (data) => ({
        url: productsPosApi,
        method: "POST",
        data,
      }),
      invalidatesTags: ["productsPos"],
    }),
    updateProductPos: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${productsPosApi}/${id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["productsPos"],
    }),
    deleteProductPos: builder.mutation({
      query: (id) => ({
        url: `${productsPosApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productsPos"],
    }),
    // Check coupon validity
    checkCoupon: builder.mutation({
      query: (couponCode) => ({
        url: `${couponApi}/${couponCode}/find`,
        method: "POST",
      }),
    }),
    // Find customer by mobile number (placeholder - update endpoint when API is ready)
    findCustomerByMobile: builder.mutation({
      query: (mobileNo) => ({
        url: `${customerApi}/find-by-mobile`,
        method: "POST",
        data: { mobile: mobileNo },
      }),
    }),
  }),
});

export const { 
  useGetTicketCounterQuery, 
  useAddProductPosMutation, 
  useUpdateProductPosMutation, 
  useDeleteProductPosMutation, 
  useGetProductPosByIdQuery,
  useCheckCouponMutation,
  useFindCustomerByMobileMutation,
} = productsPosEndpoints;