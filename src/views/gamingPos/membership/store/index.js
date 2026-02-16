import api from "@/lib/redux/api";

const membershipApi = 'gamezone-pos/membership';

const membershipEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getMemberships: builder.query({
      query: () => ({
        url: membershipApi,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),
    getMemberByContact: builder.query({
      query: (contact) => ({
        url: `gamezone-pos/membership-search-by-mobile?mobile=${contact}`,
        method: "GET",
      }),
      providesTags: ["membership"],
    }),
    getMembershipById: builder.query({
      query: (id) => ({
        url: `${membershipApi}/${id}`,
        method: "GET",
      }),
    }),
    addMembership: builder.mutation({
      query: (data) => ({
        url: membershipApi,
        method: "POST",
        data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["membership"],
    }),
    updateMembership: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${membershipApi}/${id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
        invalidatesTags: ["membership"],
    }),
    deleteMembership: builder.mutation({
      query: (id) => ({
        url: `${membershipApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["membership"],
    }),
    
  }),
});

export const { 
  useGetMembershipsQuery, 
  useAddMembershipMutation, 
  useUpdateMembershipMutation, 
  useDeleteMembershipMutation, 
  useGetMembershipByIdQuery,
} = membershipEndpoints;