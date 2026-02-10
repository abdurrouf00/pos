'use client'
import { Button } from '@/components/ui/button'
import { getAllDepartment } from '@/views/department/store'
import { getAllDesignations } from '@/views/designation/store'
import { getAllDivisions } from '@/views/division/store'
import { getAllEmployeeCategories } from '@/views/employee-category/store'
import { getAllJobTypes } from '@/views/job-type/store'
import { getAllPayScale } from '@/views/pay-scale/store'
import { getAllPaymentTypes } from '@/views/payment-type/store'
import { getAllSections } from '@/views/section/store'
import { getAllWorkingShifts } from '@/views/working-shift/store'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import { useRouter } from 'nextjs-toploader/app'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import {
  addEmployee,
  bindEmployeeData,
  getAllEmployee,
  getSingleEmployee,
  initialemployeeData,
  setImageUrl,
  setSignatureUrl,
  updateEmployee,
} from '../store'
import BasicInfo from './EmpBasic'
import EducationInfo from './EmpEducation'
import ExperienceInfo from './EmpExperice'
import EmployeeTabs from './EmployeeTabs'
import OfficialInfo from './EmpOfficial'
import PersonalInfo from './EmpPersonal'
import LegalInfo from './EpmLegalInfo'

const formErrorsTabNumber = {
  name: 0,
  department_id: 1,
  designation_id: 1,
  nid_no: 0,
  basic_salary: 1,
  role_id: 5,
  email: 0,
  password: 5,
}

const EmployeeForm = ({ id }) => {
  const tabs = [
    'Basic Info',
    'Official Info',
    'Education',
    'Experience',
    'Personal Info',
    ...(id ? [] : ['Legal Info']),
  ]
  const dispatch = useDispatch()
  const router = useRouter()
  const { basicEmployeeData, loading } = useSelector(({ employee }) => employee)

  const [activeTab, setActiveTab] = useState(0)
  const [submitClicked, setSubmitClicked] = useState(false)
  const commonErrorSchema = yup.object().shape({
    name: basicEmployeeData.name ? yup.string() : yup.string().required('Name is required'),
    role_id:
      basicEmployeeData.username && !basicEmployeeData.role_id
        ? yup.string().required('Role is required')
        : yup.string(),
    email:
      basicEmployeeData.username && !basicEmployeeData.email
        ? yup.string().required('Email is required')
        : yup.string(),
    password:
      basicEmployeeData.username && !basicEmployeeData.password
        ? yup.string().required('Password is required')
        : yup.string().min(6, 'Password must be at least 8 characters long'),
  })

  const addSchema = commonErrorSchema

  const updateSchema = commonErrorSchema.shape({
    department_id: basicEmployeeData.department_id
      ? yup.string()
      : yup.string().required('Department is required'),
    designation_id: basicEmployeeData.designation_id
      ? yup.string()
      : yup.string().required('Designation is required'),
    nid_no: basicEmployeeData.nid_no ? yup.string() : yup.string().required('NID is required'),
    basic_salary: basicEmployeeData.basic_salary
      ? yup.string()
      : yup.string().required('Basic salary is required'),
    role_id: basicEmployeeData.username ? yup.string().required('Role is required') : yup.string(),
  })
  const schema = id ? updateSchema : addSchema

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const errorsLength = Object.keys(errors).length
  useEffect(() => {
    if (errorsLength > 0) {
      const errorArray = Object.keys(errors)

      setActiveTab(formErrorsTabNumber[errorArray[0]])
    }
  }, [errorsLength])

  const handleChange = e => {
    const { name, value, files } = e.target
    if (files && files.length > 0) {
      const file = files[0]
      const fileUrl = URL.createObjectURL(file)
      if (name === 'image') {
        dispatch(setImageUrl(fileUrl))
      } else if (name === 'signature') {
        dispatch(setSignatureUrl(fileUrl))
      }
      dispatch(bindEmployeeData({ ...basicEmployeeData, [name]: file }))
    } else {
      dispatch(bindEmployeeData({ ...basicEmployeeData, [name]: value }))
    }
  }
  console.log('errors', errors)

  const onSubmit = async () => {
    setSubmitClicked(true)
    const userDataStr = Cookies.get('user_data')
    const userData = userDataStr ? JSON.parse(userDataStr) : null
    const { prev_job_info, edu_info, image, signature, ...submittedData } = basicEmployeeData

    const formData = new FormData()
    if (!id) {
      formData.append('company_id', userData?.company_id || '')
      formData.append('image', image)
      formData.append('signature', signature)
    }
    if (id) {
      formData.append('_method', 'put')
      formData.delete('username')
      formData.delete('password')
      formData.delete('role_id')
      if (typeof image === 'string') {
        formData.delete('image')
      } else {
        formData.append('image', image)
      }
      if (typeof signature === 'string') {
        formData.delete('signature')
      } else {
        formData.append('signature', signature)
      }
    }
    Object.entries(submittedData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    basicEmployeeData.prev_job_info.forEach((prevJob, index) => {
      Object.entries(prevJob).forEach(([key, value]) => {
        formData.append(`prev_job_info[${index}][${key}]`, value ?? '')
      })
    })
    basicEmployeeData.edu_info.forEach((edu, index) => {
      Object.entries(edu).forEach(([key, value]) => {
        formData.append(`edu_info[${index}][${key}]`, value ?? '')
      })
    })

    // console.log('submittedData', JSON.stringify(submittedData, null, 2))

    try {
      const updateData = {
        data: formData,
        id: basicEmployeeData.id || id,
      }
      console.log('update data', JSON.stringify(updateData))
      const action = basicEmployeeData.id || id ? updateEmployee(updateData) : addEmployee(formData)
      const res = await dispatch(action).unwrap()
      if (res.success) {
        // await dispatch(getAllEmployee(submittedData.department_id || "")).unwrap();
        const toastMsg = basicEmployeeData.id || id ? 'Employee updated' : 'Employee saved'
        toast.success(toastMsg)
        const route = id ? `/dashboard/employees/${id}` : `/dashboard/employees`
        router.push(route)
      } else {
        toast.error(res.msg)
      }

      // setOpenForm(false);
    } catch (err) {
      toast.error('Something went wrong!')
    } finally {
      setSubmitClicked(false)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(bindEmployeeData(initialemployeeData))
    }
  }, [])
  useEffect(() => {
    const params = {
      page: 1,
      per_page: 1000,
    }
    const loadAllData = async () => {
      try {
        await Promise.all([
          dispatch(getAllWorkingShifts(params)),
          dispatch(getAllDesignations(params)),
          dispatch(getAllDepartment(params)),
          dispatch(getAllEmployeeCategories(params)),
          dispatch(getAllJobTypes(params)),
          dispatch(getAllDivisions(params)),
          dispatch(getAllSections(params)),
          dispatch(getAllPayScale(params)),
          dispatch(getAllPaymentTypes(params)),
          // dispatch(getAllProjects(params)),
        ])
      } finally {
        // setFormLoading( false );
      }
    }

    loadAllData()
  }, [dispatch])

  const handleNextMove = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1)
    } else {
      handleSubmit(onSubmit)()
    }
  }

  const handlePreviousMove = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getSingleEmployee(id))
    }
  }, [id])

  return (
    <div className="flex flex-col space-y-4  overflow-y-auto  py-6 bg-white px-4 rounded">
      {/* Tabs */}
      <EmployeeTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {/* Tab Content */}
      <div className="">
        {/* Basic Info */}
        {activeTab === 0 && (
          <BasicInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )}
        {/* Official Info */}
        {activeTab === 1 && (
          <OfficialInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )}
        {/* Education */}
        {activeTab === 2 && (
          <EducationInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
          />
        )}
        {/* Experience */}
        {activeTab === 3 && (
          <ExperienceInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
          />
        )}
        {/* Personal Info */}
        {activeTab === 4 && (
          <PersonalInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
          />
        )}
        {/* Legal Info */}
        {activeTab === 5 && (
          <LegalInfo
            basicEmployeeData={basicEmployeeData}
            handleChange={handleChange}
            loading={loading}
            errors={errors}
          />
        )}
      </div>

      <div className="flex justify-end gap-2">
        {activeTab > 0 && (
          <Button
            variant={'outline'}
            onClick={handlePreviousMove}
            disabled={loading || submitClicked}
          >
            Previous
          </Button>
        )}
        {activeTab === tabs.length - 1 && (
          <Button onClick={handleSubmit(onSubmit)} disabled={loading || submitClicked}>
            {submitClicked ? 'Submitting...' : 'Save'}
          </Button>
        )}
        {activeTab < tabs.length - 1 && (
          <Button onClick={handleNextMove} disabled={loading || submitClicked}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmployeeForm
