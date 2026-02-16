import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { baseURL } from '@/helpers/axios'
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
// Define a service using a base URL and expected endpoints
const api = createApi({
  tagTypes: [
    'PaymentMethod',
    'manualJournals',
    'RecurringJournals',
    'TaxSettings',
    'FoodCounter',
    'holidays',
    'accountHeads',
    'attendanceDevices',
    'items',
    'leavePolicies',
    'leavePolicyRules',
    'employeeLeavePolicies',
    'users',
    'currencies',
    'ProductTypes',
    'UnitStyles',
    'Units',
    'Manufacturers',
    'PaymentTerms',
    'TaxRates',
    'warehouses',
    'chartOfAccounts',
    'Products',
    'ProductCategories',
    'Vendors',
    'channels',
    'ticketCounter',
    'membership',
    'membershipPackage',
    'Coupons',
    'denominationCount',
    'Requisitions',
    'PurchaseOrders',
  ],
  reducerPath: 'base-api',
  baseQuery: axiosBaseQuery({ baseUrl: baseURL }),
  endpoints: () => ({}),
})

export default api
