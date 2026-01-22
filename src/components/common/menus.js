const menus = localStorage.getItem('menus');

export const menuData = menus?.map((dd) => ({
  title: dd.menu_name,
  href: "/dashboard",
  isMainCategory: true,
  subItems: dd.children?.map((d1) => ({
    title: d1.menu_name,
    href: "#",
    icon: "/image 19.png",
    subItems: d1.children?.map((d2) => ({
      title: d2.manu_name,
      href:
        d2.menu_name === "Role"
          ? "/dashboard/role"
          : d2.menu_name === "Pay Scale"
            ? "/dashboard/pay-scale"
            : d2.menu_name === "Project"
              ? "/dashboard/project"
              : d2.menu_name === "Section"
                ? "/dashboard/section"
                : d2.menu_name === "Payment Type"
                  ? "/dashboard/payment-type"
                  : d2.menu_name === "Working Shift"
                    ? "/dashboard/working-shift"
                    : d2.menu_name === "Organization"
                      ? "/dashboard/organization"
                      : d2.menu_name === "Company"
                        ? "/dashboard/company"
                        : d2.menu_name === "Branch"
                          ? "/dashboard/branch"
                          : d2.menu_name === "Departments"
                            ? "/dashboard/department"
                            : d2.menu_name === "Designations"
                              ? "/dashboard/designation"
                              : d2.menu_name === "Division"
                                ? "/dashboard/division"
                                : d2.menu_name === "Employee Category"
                                  ? "/dashboard/employee-category"
                                  : d2.menu_name === "Employee"
                                    ? "/dashboard/employee"
                                    : d2.menu_name === "Job Type"
                                      ? "/dashboard/job-type"
                                      : "",
    })),
  })),
}));