"use client";

import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDutyRoster } from "../store";

export const columns = () => {
    const columns = [
        {
            header: "Employee",
            field: "employee_id",
            style: {
                width: "100px",
                textAlign: "center",
            },
            sortable: false,
            filter: false,
        },
        {
            field: "shift_id",
            header: "Shift",
            sortable: true,
        },
        {
            field: "start_time",
            header: "Start Time",
            sortable: true,
        },
        {
            field: "end_time",
            header: "End Time",
            sortable: true,
        },


    ];

    return columns;
};

const DutyRosterList = () => {
    const { data, loading } = useSelector((state) => state.dutyRoster);
    const dispatch = useDispatch();

    const router = useRouter();
    useEffect(() => {
        dispatch(getDutyRoster());
    }, []);
    const handleAddNew = () => {
        router.push("/dashboard/duty-roster/create");
    }
    return (
        <div>
            <div className="bg-white px-4 pt-4 pb-8 rounded mx-0.5  border border-gray-100">
                <div className="pb-3 flex justify-end">
                    <Button onClick={handleAddNew} variant={"primary"}>
                        <Plus /> Add New
                    </Button>
                </div>
                <DataTable
                    loading={loading}
                    data={data?.data || []}
                    columns={columns()}
                    globalFilterFields={["name"]}
                    emptyMessage="No data found."
                    rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
                    showGlobalFilter={true}
                    className="custom_datatable"
                    globalFilterPlaceholder="Type here to search..."
                // extraField={extraField()}
                />
            </div>
        </div>
    );
};

export default DutyRosterList;