import React, { useState } from "react";
import { DataTable as PrimeDataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import TableSkeleton from "../ui/TableSkeleton";

const DataTable = ({
  data,
  columns,
  paginator = true,
  rows = 10,
  sortable = true,
  filterable = true,
  globalFilterFields = [],
  emptyMessage = "No records found",
  className = "",
  stripedRows = true,
  showGridlines = true,
  responsiveLayout = "scroll",
  selectionMode = null,
  onSelectionChange = null,
  selectedItems = null,
  loading = false,
  onRowClick = null,
  rowClassName = null,
  showGlobalFilter = false,
  globalFilterPlaceholder = "Search in all fields...",
  extraField,
  expandable = false,
  rowExpansionTemplate = null,
  ...props
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="relative flex justify-between ">
        <input
          type="text"
          className="border bg-white pr-3 py-2 rounded-md text-sm pl-8 focus:outline-none focus:ring-2 focus:ring-blue-300 font-normal"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder={globalFilterPlaceholder}
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <div>{extraField ? extraField : null}</div>
      </div>
    );
  };

  const renderColumn = (column) => {
    const {
      field,
      header,
      body,
      sortable: columnSortable = sortable,
      filterable: columnFilterable = filterable,
      style,
      className: columnClassName,
      ...rest
    } = column;

    return (
      <Column
        key={field || header}
        field={field}
        header={header}
        body={body}
        sortable={columnSortable}
        filter={columnFilterable}
        style={style}
        className={columnClassName}
        {...rest}
      />
    );
  };

  const normalizedData = Array.isArray(data) ? data : data ? [data] : [];
  const allowExpansion = (rowData) => {
    return normalizedData.length > 0;
  };

  const expandedColumn = {
    expander: allowExpansion,
    style: { width: "100px" },
  };
  const updatedColumns = expandable ? [expandedColumn, ...columns] : columns;

  return (
    <>
      {" "}
      {loading ? (
        <TableSkeleton columns={columns} />
      ) : (
        <PrimeDataTable
          value={normalizedData}
          paginator={paginator}
          rows={rows}
          globalFilter={globalFilterValue}
          header={showGlobalFilter ? renderHeader : null}
          filterDisplay="menu"
          globalFilterFields={globalFilterFields}
          emptyMessage={emptyMessage}
          className={`p-datatable-sm custom_datatable ${className}`}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
          // stripedRows={stripedRows}
          showGridlines={showGridlines}
          responsiveLayout={responsiveLayout}
          selectionMode={selectionMode}
          onSelectionChange={onSelectionChange}
          selection={selectedItems}
          loading={loading}
          onRowClick={onRowClick}
          rowClassName={rowClassName}
          expandedRowIcon={<ChevronDown size={14} />}
          collapsedRowIcon={<ChevronRight size={14} />}
          // expandableRowGroups={expandable}
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          {...props}
        >
          {updatedColumns.map(renderColumn)}
        </PrimeDataTable>
      )}
    </>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      header: PropTypes.string.isRequired,
      body: PropTypes.func,
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      style: PropTypes.object,
      className: PropTypes.string,
    })
  ).isRequired,
  paginator: PropTypes.bool,
  rows: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  globalFilterFields: PropTypes.arrayOf(PropTypes.string),
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  stripedRows: PropTypes.bool,
  showGridlines: PropTypes.bool,
  responsiveLayout: PropTypes.oneOf(["stack", "scroll"]),
  selectionMode: PropTypes.oneOf(["single", "multiple", null]),
  onSelectionChange: PropTypes.func,
  selectedItems: PropTypes.any,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.func,
  showGlobalFilter: PropTypes.bool,
  globalFilterPlaceholder: PropTypes.string,
};

export default DataTable;
