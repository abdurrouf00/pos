import api from "@/lib/redux/api";

const leavePolicyRulesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicyRules: builder.query({
      query: () => ({
        url: "leave-policy-rule",
        method: "GET",
      }),
      providesTags: ["leavePolicyRules"],
    }),
    addLeavePolicyRule: builder.mutation({
      query: (data) => ({
        url: "leave-policy-rule",
        method: "POST",
        data,
      }),
      invalidatesTags: ["leavePolicyRules"],
    }),
    updateLeavePolicyRule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `leave-policy-rule/${id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["leavePolicyRules"],
    }),
    deleteLeavePolicyRule: builder.mutation({
      query: (id) => ({
        url: `leave-policy-rule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leavePolicyRules"],
    }),
    getLeavePolicyRuleById: builder.query({
      query: (id) => ({
        url: `leave-policy-rule/${id}`,
        method: "GET",
      }),
      providesTags: ["leavePolicyRules"],
    }),
  }),
});

export const { useGetLeavePolicyRulesQuery, useAddLeavePolicyRuleMutation, useUpdateLeavePolicyRuleMutation, useDeleteLeavePolicyRuleMutation, useGetLeavePolicyRuleByIdQuery } = leavePolicyRulesEndpoints;