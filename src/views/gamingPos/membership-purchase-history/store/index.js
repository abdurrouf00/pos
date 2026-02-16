import api from "@/lib/redux/api";

const purchaseHistoryApi = 'gamezone-pos/ticket-counter';

const purchaseHistoryEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseHistory: builder.query({
      query: (params = {}) => ({
        url: purchaseHistoryApi,
        method: "GET",
        params: { page: params.page, per_page: params.per_page },
      }),
      providesTags: ["ticketCounter"],
    }),
  }),
});

export const { useGetPurchaseHistoryQuery } = purchaseHistoryEndpoints;
