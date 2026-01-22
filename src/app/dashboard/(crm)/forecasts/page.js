import React from 'react'
import NewForecastForm from '@/views/crm/forecasts/index'
import ForecastTable from '@/views/crm/forecasts/list/table'

export default function ForecastPage () {
  return (
    <>
      <NewForecastForm />
      <ForecastTable />
    </>
  )
}
