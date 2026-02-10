import api from "@/lib/redux/api";

const leavePolicyRulesApi = 'settings/leave-policy-group-rules';
const leavePolicyRulesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicyRules: builder.query({
      query: () => ({
        url: leavePolicyRulesApi,
        method: "GET",
      }),
      providesTags: ["leavePolicyRules"],
    }),
    addLeavePolicyRule: builder.mutation({
      query: (data) => ({
        url: leavePolicyRulesApi,
        method: "POST",
        data,
      }),
      invalidatesTags: ["leavePolicyRules"],
    }),
    updateLeavePolicyRule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${leavePolicyRulesApi}/${id}`,
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
        url: `${leavePolicyRulesApi}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leavePolicyRules"],
    }),
    getLeavePolicyRuleById: builder.query({
      query: (id) => ({
        url: `${leavePolicyRulesApi}/${id}`,
        method: "GET",
      }),
      providesTags: ["leavePolicyRules"],
    }),
  }),
});

export const { useGetLeavePolicyRulesQuery, useAddLeavePolicyRuleMutation, useUpdateLeavePolicyRuleMutation, useDeleteLeavePolicyRuleMutation, useGetLeavePolicyRuleByIdQuery } = leavePolicyRulesEndpoints;