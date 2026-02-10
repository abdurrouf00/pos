'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCompanies, deleteCompany, getCompanyById, bindCompanyData } from '../store'
import { companyColumn } from './companyColumn'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import DataTable from '@/components/common/DataTable'
import CompanyForm from '../form'
import { FaCirclePlus } from 'react-icons/fa6'
import toast from 'react-hot-toast'

const CompanyList = () => {
  const { companyData, basicCompanyData, loading } = useSelector(({ company }) => company)
  const dispatch = useDispatch()
  const [openForm, setOpenForm] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)

  const handleDelete = rowData => {
    dispatch(deleteCompany(rowData?.id)).then(res => {
      toast.error('Deleted')
      dispatch(getAllCompanies())
    })
  }

  const handleInfo = rowData => {
    dispatch(bindCompanyData({ ...basicCompanyData, id: rowData?.id }))
    // dispatch(getCompanyById(rowData?.id))
    //     .then(() => {

    //     });

    setOpenForm(true)
  }

  useEffect(() => {
    dispatch(getAllCompanies())
  }, [dispatch])

  const extraField = () => {
    return (
      <div>
        <div
          onClick={() => setOpenForm(true)}
          className="border flex items-center gap-2 py-1 px-3 cursor-pointer rounded-sm bg-[#e0ecfe] text-[#227BF6] text-[14px] font-[400]"
        >
          <FaCirclePlus />
          New
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="w-full">
          <div className="p-2 bg-white shadow-lg w-full">
            <DataTable
              data={companyData}
              columns={companyColumn(handleDelete, handleInfo)}
              globalFilterFields={[
                'name',
                'organization_id',
                'email',
                'phone',
                'address',
                'has_overtime',
                'overtime_rate',
              ]}
              emptyMessage="No companies found."
              rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
              showGlobalFilter={true}
              globalFilterPlaceholder="Type here to search..."
              extraField={extraField()}
              className="custom_datatable"
              loading={loading}
            />
          </div>
        </div>
      </div>
      {openForm && <CompanyForm toggle={openForm} setOpenForm={setOpenForm} />}
    </>
  )
}

export default CompanyList
