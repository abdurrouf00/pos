import api from "@/lib/redux/api";

const accountItemEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    addItem: builder.mutation({
      query: (data) => ({
        url: "item",
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["items"],
    }),
    getItems: builder.query({
      providesTags: ["items"],
      query: () => ({
        url: "item",
        method: "GET",
      }),
    }),
    getItemById: builder.query({
      query: (id) => ({
        url: `item/${id}`,
        method: "GET",
      }),
    }),
    updateItem: builder.mutation({
      query: (data) => ({
        url: `item/${data.id}`,
        method: "PUT",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["items"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["items"],
    }),
  })
});

export const { useAddItemMutation, useGetItemsQuery, useGetItemByIdQuery, useUpdateItemMutation, useDeleteItemMutation } = accountItemEndpoints;