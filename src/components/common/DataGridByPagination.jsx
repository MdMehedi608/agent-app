import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledDataGrid } from "../../hooks/data-grid/data-grid-style";
const DataGridByPagination = ({
  listData,
  pColumns,
  parameter,
  handleChangeParameter,
  handleOnChangePageSize,
  handleOnChangePage,
}) => {
  const { totalcount } = useSelector((state) => state.commonStore);
  const dispatch = useDispatch();

  return (
    <StyledDataGrid
      disableColumnMenu
      paginationMode="server"
      rows={listData}
      columns={pColumns}
      getRowId={(rows) => rows.id}
      pageSize={parameter.pageSize}
      page={parameter.page - 1}
      onPageSizeChange={(newPageSize) => {
        handleChangeParameter("pageSize", newPageSize);
        handleOnChangePageSize(newPageSize);
      }}
      onPageChange={(newPage) => {
        handleChangeParameter("page", newPage + 1);
        handleOnChangePage(newPage + 1);
      }}
      rowsPerPageOptions={[10, 20, 50]}
      rowCount={totalcount}
      pagination
    />
  );
};

export default DataGridByPagination;
