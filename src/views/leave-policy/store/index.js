import api from "@/lib/redux/api";

const leavePolicyApi = 'settings/leave-policy-groups';
const leavePolicyEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicies: builder.query({
      query: () => ({
        url: leavePolicyApi,
        method: "GET",
      }),
      providesTags: ["leavePolicies"],
    }),
    getLeavePolicyById: builder.query({
      query: (id) => ({
        url: `${leavePolicyApi}/${id}`,
        method: "GET",
      }),
    }),
    addLeavePolicy: builder.mutation({
      query: (data) => ({
        url: leavePolicyApi,
        method: "POST",
        data,
      }),
      invalidatesTags: ["leavePolicies"],
    }),
    updateLeavePolicy: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${leavePolicyApi}/${id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["leavePolicies"],
    }),
    deleteLeavePolicy: builder.mutation({
      query: (id) => ({
        url: `${leavePolicyApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leavePolicies"],
    }),
  }),
});

export const { useGetLeavePoliciesQuery, useAddLeavePolicyMutation, useUpdateLeavePolicyMutation, useDeleteLeavePolicyMutation, useGetLeavePolicyByIdQuery } = leavePolicyEndpoints;