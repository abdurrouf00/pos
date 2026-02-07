import api from "@/lib/redux/api";

const employeeLeavePolicyEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeLeavePolicies: builder.query({
      query: () => ({
        url: "employee-leave-policy",
        method: "GET",
      }),
      providesTags: ["employeeLeavePolicies"],
    }),
    addEmployeeLeavePolicy: builder.mutation({
      query: (data) => ({
        url: "employee-leave-policy",
        method: "POST",
        data,
      }),
      invalidatesTags: ["employeeLeavePolicies"],
    }),
    updateEmployeeLeavePolicy: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `employee-leave-policy/${id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["employeeLeavePolicies"],

    }),
    deleteEmployeeLeavePolicy: builder.mutation({
      query: (id) => ({
        url: `employee-leave-policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employeeLeavePolicies"],
    }),
    getEmployeeLeavePolicyById: builder.query({
      query: (id) => ({
        url: `employee-leave-policy/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEmployeeLeavePoliciesQuery, useAddEmployeeLeavePolicyMutation, useUpdateEmployeeLeavePolicyMutation, useDeleteEmployeeLeavePolicyMutation, useGetEmployeeLeavePolicyByIdQuery } = employeeLeavePolicyEndpoints;