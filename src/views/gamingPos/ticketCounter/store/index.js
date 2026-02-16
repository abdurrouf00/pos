import api from "@/lib/redux/api";

const productsPosApi = 'inventory/products/pos/products';
const couponApi = 'inventory/coupons';
const gamezoneApi = 'gamezone-pos';

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
    // Check coupon validity (optional - buy with or without)
    checkCoupon: builder.mutation({
      query: (couponCode) => ({
        url: `${couponApi}/${couponCode}/find`,
        method: "POST",
      }),
    }),
    // Find member/customer by mobile - gamezone-pos
    searchMemberByMobile: builder.query({
      query: (mobile) => ({
        url: `${gamezoneApi}/membership-search-by-mobile?mobile=${encodeURIComponent(mobile || '')}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),
    // Store package purchase - buy membership package
    storePackagePurchase: builder.mutation({
      query: ({ membershipId, ...data }) => ({
        url: `${gamezoneApi}/membership/${membershipId}/store-package-purchase`,
        method: "POST",
        data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["membership", "ticketCounter"],
    }),
    // Create ticket counter sale (tickets/products)
    createTicketCounterSale: builder.mutation({
      query: (data) => ({
        url: `${gamezoneApi}/ticket-counter`,
        method: "POST",
        data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["ticketCounter"],
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
  useSearchMemberByMobileQuery,
  useLazySearchMemberByMobileQuery,
  useStorePackagePurchaseMutation,
  useCreateTicketCounterSaleMutation,
} = productsPosEndpoints;