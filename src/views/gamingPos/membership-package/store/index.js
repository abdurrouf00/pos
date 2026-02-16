import api from '@/lib/redux/api'

const membershipPackageApi = 'gamezone-pos/membership-package'

const membershipPackageEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getMembershipPackages: builder.query({
      query: params => ({
        url: membershipPackageApi,
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['membershipPackage'],
    }),
    getMembershipPackageById: builder.query({
      query: id => ({
        url: `${membershipPackageApi}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'membershipPackage', id }],
    }),
    createMembershipPackage: builder.mutation({
      query: data => ({
        url: membershipPackageApi,
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['membershipPackage'],
    }),
    updateMembershipPackage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${membershipPackageApi}/${id}`,
        method: 'PUT',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['membershipPackage'],
    }),
    deleteMembershipPackage: builder.mutation({
      query: id => ({
        url: `${membershipPackageApi}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['membershipPackage'],
    }),
  }),
})

export const {
  useGetMembershipPackagesQuery,
  useGetMembershipPackageByIdQuery,
  useCreateMembershipPackageMutation,
  useUpdateMembershipPackageMutation,
  useDeleteMembershipPackageMutation,
} = membershipPackageEndpoints
