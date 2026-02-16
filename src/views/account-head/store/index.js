import api from "@/lib/redux/api";

const accountHeadEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountHeadsByQuery: builder.query({
      providesTags: ["accountHeads"],
      query: () => ({
        url: "accounts/account-heads",
        method: "GET",
      }),
    }),
    getAccountHeadById: builder.query({
      query: (id) => ({
        url: `accounts/account-heads/${id}`,
        method: "GET",
      }),

    }),
    addAccountHead: builder.mutation({
      query: ({ data }) => ({
        url: "accounts/account-heads",
        method: "POST",
        data,
      }),
      invalidatesTags: ["accountHeads"],
    }),
    updateAccountHead: builder.mutation({
      query: ({ data }) => ({
        url: `accounts/account-heads/${data.id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["accountHeads"],
    }),
    getAccountTypes: builder.query({
      query: () => ({
        url: "accounts/account-heads/account-type",
        method: "GET",
      }),
    }),
    deleteAccountHead: builder.mutation({
      query: (id) => ({
        url: `accounts/account-heads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["accountHeads"],
    }),
  }),
});

export const { useGetAccountHeadByIdQuery, useAddAccountHeadMutation, 
  useUpdateAccountHeadMutation, useDeleteAccountHeadMutation, 
  useGetAccountTypesQuery, useGetAccountHeadsByQueryQuery } = accountHeadEndpoints;