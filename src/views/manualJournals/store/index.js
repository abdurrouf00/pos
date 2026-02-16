import api from "@/lib/redux/api";

const manualJournalsApi = 'accounts/journals'

const manualJournalsApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAllManualJournals: builder.query({
      query: () => ({ url: manualJournalsApi, method: 'GET' }),
      providesTags: ['manualJournals'],
    }),
    createManualJournal: builder.mutation({
      query: data => ({ url: manualJournalsApi, method: 'POST', data }),
      invalidatesTags: ['manualJournals'],
    }),
  
    getManualJournalById: builder.query({
      query: id => ({ url: `${manualJournalsApi}/${id}`, method: 'GET' }),
    }),
    updateManualJournal: builder.mutation({
      query: ({ id, ...data }) => ({ url: `${manualJournalsApi}/${id}`, method: 'POST', data }),
      invalidatesTags: ['manualJournals'],
    }),
    deleteManualJournal: builder.mutation({
      query: id => ({ url: `${manualJournalsApi}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['manualJournals'],
    }),
  }),
})

export const { useCreateManualJournalMutation, useGetAllManualJournalsQuery, useGetManualJournalByIdQuery, useUpdateManualJournalMutation, useDeleteManualJournalMutation } = manualJournalsApiSlice