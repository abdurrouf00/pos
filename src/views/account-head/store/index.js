import api from "@/lib/redux/api";

const accountHeadEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountHeadsByQuery: builder.query({
      providesTags: ["accountHeads"],
      query: () => ({
        url: "acc-head",
        method: "GET",
      }),
    }),
    getAccountHeadById: builder.query({
      query: (id) => ({
        url: `acc-head/${id}`,
        method: "GET",
      }),

    }),
    addAccountHead: builder.mutation({
      query: ({ data }) => ({
        url: "acc-head",
        method: "POST",
        data,
      }),
      invalidatesTags: ["accountHeads"],
    }),
    updateAccountHead: builder.mutation({
      query: ({ data }) => ({
        url: `acc-head/${data.id}`,
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
        url: "acc-type",
        method: "GET",
      }),
    }),
    deleteAccountHead: builder.mutation({
      query: (id) => ({
        url: `acc-head/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["accountHeads"],
    }),
  }),
});

export const { useGetAccountHeadByIdQuery, useAddAccountHeadMutation, useUpdateAccountHeadMutation, useDeleteAccountHeadMutation, useGetAccountTypesQuery, useGetAccountHeadsByQueryQuery } = accountHeadEndpoints;