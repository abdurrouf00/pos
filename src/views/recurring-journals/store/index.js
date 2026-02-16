import api from '@/lib/redux/api'

const recurringJournalsApi = 'accounts/recurring-journals'

const recurringJournalsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getRecurringJournals: builder.query({
      query: () => ({ url: recurringJournalsApi, method: 'GET' }),
      providesTags: ['RecurringJournals'],
    }),
    createRecurringJournal: builder.mutation({
      query: data => ({ url: recurringJournalsApi, method: 'POST', data }),
      invalidatesTags: ['RecurringJournals'],
    }),
    updateRecurringJournal: builder.mutation({
      query: ({ id, data }) => ({ url: `${recurringJournalsApi}/${id}`, method: 'PUT', data }),
      invalidatesTags: ['RecurringJournals'],
    }),
    deleteRecurringJournal: builder.mutation({
      query: id => ({ url: `${recurringJournalsApi}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['RecurringJournals'],
    }),
    getRecurringJournalById: builder.query({
      query: id => ({ url: `${recurringJournalsApi}/${id}`, method: 'GET' }),
      providesTags: ['RecurringJournals'],
    }),
  }),
})

export const {
  useGetRecurringJournalsQuery,
  useCreateRecurringJournalMutation,
  useUpdateRecurringJournalMutation,
  useDeleteRecurringJournalMutation,
  useGetRecurringJournalByIdQuery,
} = recurringJournalsEndpoints
