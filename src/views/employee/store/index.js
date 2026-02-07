import axios from '@/helpers/axios';
import { getImageUrl } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const errorResponse = (err) => {
  console.error('API Error:', err?.response?.data?.message || err.message);
};

export const initialemployeeData = {
  name: "",
  emp_id: "",
  email: "",
  phone_no: "",
  nid_no: "",
  short_name: "",
  gender: "",
  father_name: "",
  mother_name: "",
  permanent_address: "",
  present_address: "",
  image: "",
  signature: "",
  dob: "",
  edu_info: [{
    degree: "",
    ins_name: "",
    passing_year: "",
    result: "",
  }],
  prev_job_info: [{
    joining_date: "",
    resign_date: "",
    position: "",
    company_name: "",
  }],
  current_status: "",
  // team_id: "",
  // team_name: "",
  working_shift_id: '',
  working_shift_id_2: '',
  working_shift_id_3: '',
  working_shift_id_4: '',
  working_shift_id_5: '',
  working_shift_id_6: '',
  device_id: "",
  device_emp_id: "",
  designation_id: "",
  department_id: "",
  emp_category_id: "",
  job_type_id: "",
  proximity_card_no: "",
  bonus_activation: 0,
  pf_status: 0,
  division_id: "",
  section_id: "",
  location: "",
  joinning_designation_id: "",
  cost_center: "",
  last_company: "",
  investment: 0,
  others_tds: 0,
  ait_car: "",
  basic_salary: "",
  payment_type_id: "",
  bank_name: "",
  account_number: "",
  branch_name: "",
  resign_date: "",
  from_probition_date: "",
  to_probition_date: "",
  confirm_date: "",
  probition_month: "",
  retirement_date: "",
  card_in_number: "",
  tin_no: "",
  current_salary: "",
  has_overtime: "",
  overtime_rate: "",
  weekend_day: "",
  report_to: "",
  recommended_by: "",
  approved_by: "",
  others_tds: "",
  ait_car: "",
  has_overtime: 0,
  overtime_rate: "",
  min_overtime_minutes: "",
  pay_scale_id: "",
  joinning_date: "",
  username: "",
  role_id: "",
  password: "",
};

// Thunks
export const getAllEmployee = createAsyncThunk(
  "employee/getAll",
  async (params) => {
    for (const key in params) {
      if (params[key] === null || params[key] === '') {
        delete params[key];
      }
    }
    const url = new URLSearchParams(params);
    const api = `employee?${url.toString()}`;
    const res = await axios.get(api);
    return res.data.data;
  }
);


export const getSingleEmployee = createAsyncThunk(
  "employee/getSingle",
  async (id) => {
    const api = `employee/${id}`;
    const res = await axios.get(api);
    return res.data.data;
  }
);
export const changePassword = createAsyncThunk('employee/changePassword', async (data) => {
  const res = await axios.post(`employee/change-password`, data);
  return res.data;
});

export const changeStatus = createAsyncThunk('employee/changeStatus', async (data) => {
  const res = await axios.post(`employee/change-status`, data);
  return res.data;
});

export const addEmployee = createAsyncThunk("employee/add", async (data) => {
  const res = await axios.post(`employee`, data);
  return res.data;
});

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ data, id }) => {
    // data.append('_method', 'put');
    const res = await axios.post(`employee/${id}`, data);
    return res.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (data) => {
    const res = await axios.delete(`employee/${data.id}`);
    return res.data.data;
  }
);

export const importEmployeeData = createAsyncThunk(
  "employee/import",
  async (data) => {
    const res = await axios.post(`employee/saveFromFile`, data);
    return res.data.data;
  }
);

export const addUserToDevice = createAsyncThunk(
  "employee/addUserToDevice",
  async (data) => {
    const res = await axios.post(`add_user_to_device`, data);
    return res.data;
  }
);
export const enrollUserToDevice = createAsyncThunk(
  "employee/enrollUserToDevice",
  async (data) => {
    const res = await axios.post(`enrole_to_device`, data);
    return res.data;
  }
);
export const createUser = createAsyncThunk(
  "employee/user-update",
  async (data) => {
    const res = await axios.post(`user-update`, data);
    return res.data;
  }
);
// Slice
export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeData: [],
    totalPages: 0,
    currentPage: 1,
    perPage: 10,
    firstRow: 0,
    singleEmployeeData: {},
    loading: false,
    error: null,
    basicEmployeeData: initialemployeeData,
    profileImage: "",
    signatureImage: "",
    mutationLoading: false,


  },
  reducers: {
    bindEmployeeData: (state, action) => {
      state.basicEmployeeData = { ...initialemployeeData, ...action.payload } || initialemployeeData;
    },
    setMetaData: (state, action) => {
      state.currentPage = action.payload.current_page;
      state.perPage = action.payload.per_page;
      // state.totalPages = action.payload.total;
      state.firstRow = action.payload.firstRow;
    },
    setImageUrl: (state, action) => {
      state.profileImage = action.payload;
    },
    setSignatureUrl: (state, action) => {
      state.signatureImage = action.payload;
    },
    bindSingleEmployeeData: (state, action) => {
      state.singleEmployeeData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder.addCase(getAllEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllEmployee.fulfilled, (state, action) => {
      state.employeeData = action.payload.data;
      state.currentPage = action.payload.current_page;
      state.perPage = action.payload.per_page;
      state.totalPages = action.payload.total;
      state.loading = false;
    });
    builder.addCase(getAllEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add
    builder.addCase(addEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employeeData.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update
    builder.addCase(updateEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.employeeData = state.employeeData.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
      state.loading = false;
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete
    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employeeData = state.employeeData.filter(
        (emp) => emp.id !== action.meta.arg.id
      );
      state.loading = false;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.mutationLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.mutationLoading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.mutationLoading = false;
    });
    builder.addCase(changeStatus.pending, (state) => {
      state.mutationLoading = true;
    });
    builder.addCase(changeStatus.fulfilled, (state, action) => {
      state.mutationLoading = false;
    });
    builder.addCase(changeStatus.rejected, (state, action) => {
      state.mutationLoading = false;
    });

    // Get Single
    builder.addCase(getSingleEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      if (action.payload) {
        const {
          // devision,
          id,
          department,
          created_at,
          updated_at,
          organization_id,
          project_id,
          deleted_at,
          serial,
          serial_number,
          previous_company,
          joinning_designation,
          pay_scale,
          job_type,
          division,
          section,
          category_id,
          category,
          designation,
          payment_type,
          branch_id,
          ...data
        } = action.payload
        // const { degree = [], ins_name = [], passing_year = [], result = [] } = data?.edu_info
        const degree = data?.edu_info?.degree || []
        const ins_name = data?.edu_info?.ins_name || []
        const passing_year = data?.edu_info?.passing_year || []
        const result = data?.edu_info?.result || []
        const edu_info_length = Math.max(
          degree.length,
          ins_name.length,
          passing_year.length,
          result.length
        )
        const company_name = data?.prev_job_info?.company_name || []
        const position = data?.prev_job_info?.position || []
        const joining_date = data?.prev_job_info?.joining_date || []
        const resign_date = data?.prev_job_info?.resign_date || []
        // const prev_job_info_length = Math.max(
        //   company_name.length,
        //   position.length,
        //   joining_date.length,
        //   resign_date.length
        // )
        // const {
        //   company_name = [],
        //   position = [],
        //   joining_date = [],
        //   resign_date = [],
        // } = data.prev_job_info
        const prev_job_info_length = Math.max(
          company_name.length,
          position.length,
          joining_date.length,
          resign_date.length
        )
        state.basicEmployeeData = {
          ...data,
          current_salary: data.current_salary ?? '',
          payment_type_id: data.payment_type_id ?? '',
          resign_date: data.resign_date ?? '',
          confirm_date: data.confirm_date ?? '',
          gender: data.gender ?? '',
          account_number: data.account_number ?? '',
          ait_car: data.ait_car ?? '',
          approved_by: data.approved_by ?? '',
          bank_name: data.bank_name ?? '',
          branch_name: data.branch_name ?? '',
          card_in_number: data.card_in_number ?? '',
          department_id: data.department_id ?? '',
          designation_id: data.designation_id ?? '',
          dob: data.dob ?? '',
          father_name: data.father_name ?? '',
          emp_category_id: data.emp_category_id ?? '',
          job_type_id: data.job_type_id ?? '',
          min_overtime_minutes: data.min_overtime_minutes ?? '',
          mother_name: data.mother_name ?? '',
          nid_no: data.nid_no ?? '',
          overtime_rate: data.overtime_rate ?? '',
          location: data.location ?? '',
          pay_scale_id: data.pay_scale_id ?? '',
          permanent_address: data.permanent_address ?? '',
          phone_no: data.phone_no ?? '',
          present_address: data.present_address ?? '',
          probition_month: data.probition_month ?? '',
          working_shift_id: data.working_shift_id ?? '',
          working_shift_id_2: data.working_shift_id_2 ?? '',
          working_shift_id_3: data.working_shift_id_3 ?? '',
          working_shift_id_4: data.working_shift_id_4 ?? '',
          working_shift_id_5: data.working_shift_id_5 ?? '',
          working_shift_id_6: data.working_shift_id_6 ?? '',
          email: data.email ?? '',
          last_company: data.last_company ?? '',
          joinning_date: data.joinning_date ?? '',
          joinning_designation_id: data.joinning_designation_id ?? '',
          from_probition_date: data.from_probition_date ?? '',
          to_probition_date: data.to_probition_date ?? '',
          retirement_date: data.retirement_date ?? '',
          tin_no: data.tin_no ?? '',
          weekend_day: data.weekend_day ?? '',
          report_to: data.report_to ?? '',
          recommended_by: data.recommended_by ?? '',
          proximity_card_no: data.proximity_card_no ?? '',
          image: data.image ?? '',
          signature: data.signature ?? '',
          short_name: data.short_name ?? '',
          division_id: data.division_id ?? '',
          section_id: data.section_id ?? '',
          cost_center: data.cost_center ?? '',
          job_type_id: data.job_type_id ?? '',
          pay_scale_id: data.pay_scale_id ?? '',
          prev_job_info: !Array.isArray(data.prev_job_info)
            ? Array.from({ length: prev_job_info_length }, (_, index) => {
                return {
                  company_name: data.prev_job_info.company_name[index],
                  position: data.prev_job_info.position[index] ?? '',
                  joining_date: data.prev_job_info.joining_date[index] ?? '',
                  resign_date: data.prev_job_info.resign_date[index] ?? '',
                }
              })
            : initialemployeeData.prev_job_info,
          edu_info: !Array.isArray(data.edu_info)
            ? Array.from({ length: edu_info_length }, (_, index) => ({
                degree: degree[index] ?? '',
                ins_name: ins_name[index] ?? '',
                passing_year: passing_year[index] ?? '',
                result: result[index] ?? '',
              }))
            : initialemployeeData.edu_info,
          device_id: data.device_id ?? '',
          device_emp_id: data.device_emp_id ?? '',
          weekend_day: data.weekend_day ?? '',
          company_id: data.company_id ?? '',
          report_to: data.report_to ? data.report_to?.id : '',
          recommended_by: data.recommended_by ? data.recommended_by?.id : '',
          approved_by: data.approved_by ? data.approved_by?.id : '',
          // password: data.password ?? '',
        }
        state.profileImage = data.image ? getImageUrl(data.image) : ''
        state.signatureImage = data.signature ? getImageUrl(data.signature) : ''
        state.singleEmployeeData = action.payload
        state.loading = false
      } else {
        state.loading = false
        state.error = 'No data found'
      }
    })
    builder.addCase(getSingleEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Import
    builder.addCase(importEmployeeData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(importEmployeeData.fulfilled, (state, action) => {
      state.employeeData = [...state.employeeData, ...action.payload];
      state.loading = false;
    });
    builder.addCase(importEmployeeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  },
});

export const { bindEmployeeData, setMetaData, setImageUrl, setSignatureUrl, bindSingleEmployeeData } = employeeSlice.actions;

export default employeeSlice.reducer;
