"use client";

import Alert from "@/components/common/Alert";
import { setMenus, setUser } from "@/lib/redux/userSlice";
import { setLocal } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthButton from "./common/AuthButton";
import AuthInput from "./common/AuthInput";
import AuthTitle from "./common/AuthTitle";

const accountsMenu = {
  id: 41,
  menu_name: "pos",
  menu_uid: "pos",
  parent_id: 0,
  order_no: 11,
  menu_icon: "<i class=\"fa fa-dollar-sign\"></i>",
  has_child: 1,
  children: [
    {
      "id": 41,
      "menu_name": "Accounts Head",
      "menu_uid": "item",
      "parent_id": 42,
      "order_no": 10.1,
      "menu_icon": null,
      "has_child": 0
    },
    {
      "id": 50,
      "menu_name": "Item",
      "menu_uid": "item",
      "parent_id": 42,
      "order_no": 11.21,
      "menu_icon": null,
      "has_child": 0
    },

    {
      "id": 43,
      "menu_name": "Sales",
      "menu_uid": "sales",
      "parent_id": 40,
      "order_no": 11.3,
      "menu_icon": "<i class=\"fa fa-cogs\"></i>",
      "has_child": 1,
      "children": [
        {
          "id": 51,
          "menu_name": "Customers",
          "menu_uid": "customers",
          "parent_id": 43,
          "order_no": 11.31,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 52,
          "menu_name": "Quotes",
          "menu_uid": "quotes",
          "parent_id": 43,
          "order_no": 11.32,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 53,
          "menu_name": "Invoices",
          "menu_uid": "invoices",
          "parent_id": 43,
          "order_no": 11.33,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 54,
          "menu_name": "Sales Receipts",
          "menu_uid": "salesReceipts",
          "parent_id": 43,
          "order_no": 11.34,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 55,
          "menu_name": "Recurring Invoices",
          "menu_uid": "recurringInvoices",
          "parent_id": 43,
          "order_no": 11.35,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 56,
          "menu_name": "Payments Received",
          "menu_uid": "paymentsReceived",
          "parent_id": 43,
          "order_no": 11.36,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 57,
          "menu_name": "Credit Notes",
          "menu_uid": "creditNotes",
          "parent_id": 43,
          "order_no": 11.37,
          "menu_icon": null,
          "has_child": 0
        }
      ]
    },
    {
      "id": 44,
      "menu_name": "Purchases",
      "menu_uid": "purchases",
      "parent_id": 40,
      "order_no": 11.4,
      "menu_icon": "<i class=\"fa fa-cogs\"></i>",
      "has_child": 1,
      "children": [
        {
          "id": 58,
          "menu_name": "Vendors",
          "menu_uid": "vendors",
          "parent_id": 44,
          "order_no": 11.41,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 59,
          "menu_name": "Expenses",
          "menu_uid": "expenses",
          "parent_id": 44,
          "order_no": 11.42,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 60,
          "menu_name": "Recurring Expenses",
          "menu_uid": "recurringExpenses",
          "parent_id": 44,
          "order_no": 11.43,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 61,
          "menu_name": "Bills",
          "menu_uid": "bills",
          "parent_id": 44,
          "order_no": 11.44,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 62,
          "menu_name": "Recurring Bills",
          "menu_uid": "recurringBills",
          "parent_id": 44,
          "order_no": 11.45,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 6,
          "menu_name": "Payments Made",
          "menu_uid": "paymentsMade",
          "parent_id": 44,
          "order_no": 11.46,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 64,
          "menu_name": "Vendor Credits",
          "menu_uid": "vendorCredits",
          "parent_id": 44,
          "order_no": 11.47,
          "menu_icon": null,
          "has_child": 0
        }
      ]
    },
    {
      "id": 45,
      "menu_name": "Time Trecking",
      "menu_uid": "timeTrecking",
      "parent_id": 40,
      "order_no": 11.5,
      "menu_icon": "<i class=\"fa fa-file-invoice\"></i>",
      "has_child": 1,
      "children": [
        {
          "id": 65,
          "menu_name": "Projects",
          "menu_uid": "projects",
          "parent_id": 45,
          "order_no": 11.51,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 66,
          "menu_name": "Timesheet",
          "menu_uid": "timesheet",
          "parent_id": 45,
          "order_no": 11.52,
          "menu_icon": null,
          "has_child": 0
        }
      ]
    },
    {
      "id": 46,
      "menu_name": "Banking",
      "menu_uid": "banking",
      "parent_id": 40,
      "order_no": 11.6,
      "menu_icon": null,
      "has_child": 0
    },
    {
      "id": 47,
      "menu_name": "Accountant",
      "menu_uid": "accountant",
      "parent_id": 40,
      "order_no": 11.7,
      "menu_icon": "<i class=\"fa fa-file-invoice\"></i>",
      "has_child": 1,
      "children": [
        {
          "id": 67,
          "menu_name": "Manual Journals",
          "menu_uid": "manualJournals",
          "parent_id": 47,
          "order_no": 11.71,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 68,
          "menu_name": "Bulk Update",
          "menu_uid": "bulkUpdate",
          "parent_id": 47,
          "order_no": 11.72,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 69,
          "menu_name": "Currency Adjustments",
          "menu_uid": "currencyAdjustments",
          "parent_id": 47,
          "order_no": 11.73,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 70,
          "menu_name": "Chart of Accounts",
          "menu_uid": "chartOfAccounts",
          "parent_id": 47,
          "order_no": 11.74,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 71,
          "menu_name": "Budgets",
          "menu_uid": "budgets",
          "parent_id": 47,
          "order_no": 11.75,
          "menu_icon": null,
          "has_child": 0
        },
        {
          "id": 72,
          "menu_name": "Transaction Looking",
          "menu_uid": "transactionLooking",
          "parent_id": 47,
          "order_no": 11.76,
          "menu_icon": null,
          "has_child": 0
        }
      ]
    },
    {
      "id": 48,
      "menu_name": "Report",
      "menu_uid": "report",
      "parent_id": 40,
      "order_no": 11.8,
      "menu_icon": null,
      "has_child": 0
    },
    {
      "id": 49,
      "menu_name": "Documents",
      "menu_uid": "documents",
      "parent_id": 40,
      "order_no": 11.9,
      "menu_icon": null,
      "has_child": 0
    }

  ]
}

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password }, {
      withCredentials: true
    })
    const res = response.data.response

    const userData = res.user;

    const permissions = res.permissions;
    // setLocal("menus", JSON.stringify(permissions.menu))
    setLocal("menus", JSON.stringify([...permissions.menu, accountsMenu]))
    // setLocal("menus", JSON.stringify(permissions.menu))
    setLocal("accesses", JSON.stringify(permissions.accesses))
    setLocal("user_data", JSON.stringify(userData))
    return res
  } catch (error) {
    return error
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  // useEffect( () => {
  //   if ( user ) {
  //     console.log( 'run' )
  //     router.push( "/organization/modules" );
  //   }
  // }, [user] );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(email, password)
      // console.log('res', res);
      if (!res.user) {
        throw new Error(res.response.data.error.message || 'Login failed');
      } else {
        const userData = res.user;
        const permissions = res.permissions;
        console.log('permissions', permissions);
        setEmail('');
        setPassword('');
        const user = {
          email: userData.email,
          name: userData.name,
          organization_id: userData.organization_id,
          company_id: userData.company_id,
          role: userData.role,
        }
        dispatch(setUser(user));

        dispatch(setMenus(permissions.menu));

        // router.refresh();
        // router.push("/organization/modules");
        window.location.href = "/organization/modules";
      }


    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className='flex items-center justify-center min-h-screen font-inter'>
        <div className='space-y-4 sm:w-md w-full px-4 md:px-0'>
          <div className='w-[200px]  mx-auto'>
            <img src="/logo.png" alt="logo" className='w-full h-full object-cover' />
          </div>
          {error && <Alert message={error} type="error" />}
          <div className=''>
            <AuthTitle>Login Here</AuthTitle>
            <p className='text-neutral-600 text-sm'>No Account? <Link className='text-blue-500 font-medium underline' href="/auth/register">Please Register</Link></p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-2  w-full mt-3'>

            <AuthInput
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <AuthInput
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <AuthButton loading={loading}>{loading ? "Logging in..." : "Login"}</AuthButton>
          </form>
          <div className='flex justify-end'>
            <Link className='text-neutral-600 text-sm text-end hover:underline transition-all duration-500' href="/auth/forgot-password">Forgot password or account?</Link>
          </div>
          <div className="flex items-center my-10 justify-center gap-3">
            <p className='text-neutral-500 text-sm tracking-tight'>Sister Concern By </p>
            <div className='w-[100px]'>
              <img src="/muktodhara-logo.png" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}
