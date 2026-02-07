import api from "@/lib/redux/api";

const leavePolicyEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicies: builder.query({
      query: () => ({
        url: "leave-policy",
        method: "GET",
      }),
      providesTags: ["leavePolicies"],
    }),
    getLeavePolicyById: builder.query({
      query: (id) => ({
        url: `leave-policy/${id}`,
        method: "GET",
      }),
    }),
    addLeavePolicy: builder.mutation({
      query: (data) => ({
        url: "leave-policy",
        method: "POST",
        data,
      }),
      invalidatesTags: ["leavePolicies"],
    }),
    updateLeavePolicy: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `leave-policy/${id}`,
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
        url: `leave-policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leavePolicies"],
    }),
  }),
});

export const { useGetLeavePoliciesQuery, useAddLeavePolicyMutation, useUpdateLeavePolicyMutation, useDeleteLeavePolicyMutation, useGetLeavePolicyByIdQuery } = leavePolicyEndpoints;