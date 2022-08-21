import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DataGridContainer,
  DataGridFilterContent,
  FilterCol,
  FilterRow
} from "../../assets/demand.css";
import DataGridByPagination from "../../components/common/DataGridByPagination";
import DatePickerInput from "../../components/common/DatePickerInput";
import PageHeader from "../../components/common/PageHeader";
import SearchFilterInput from "../../components/common/SearchFilterInput";
import { getAllAgentChallanList } from "../../redux/actions/books/challanActions";

const requestModel = {
  fromDate: "",
  toDate: "",
  commonId: "",
  searchName: "",
  page: 1,
  pageSize: 10,
};

const Challan = () => {
  const [parameter, setParameter] = useState(requestModel);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storageStore);
  const { agentChallanList } = useSelector((state) => state.bookStore);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    window.scrollTo(0, 0);

    let requestModel = {
      ...parameter,
      commonId: user.id,
    };
    setParameter(requestModel);
    dispatch(getAllAgentChallanList(requestModel));
  }, []);
  const handleChangeParameter = (key, value) =>
    setParameter((prev) => ({ ...prev, [key]: value }));

  const columns = [
    {
      field: "challanNo",
      headerName: "Challan No",
      width: 90,
      renderCell: (params) => {
        let challanNo = params.row.challanNo;
        if (challanNo) {
          return <Link to={`/demand-details${challanNo}`}>{challanNo}</Link>; // after change challan details
        }
      },
    },
    {
      field: "challanDate",
      headerName: "Challan Date",
      width: 110,
      valueGetter: ({ value }) =>
        value && moment(new Date(value)).format("DD-MMM-YYYY"),
    },
    { field: "transportName", headerName: "Transport", width: 120 },
    { field: "rrno", headerName: "RR No", width: 70 },
    { field: "concern", headerName: "Concern", width: 70 },
    { field: "PackingQty", headerName: "Packing Qty", width: 80 },
    {
      field: "orderNo",
      headerName: "Order No",
      width: 90,
      renderCell: (params) => {
        let orderNo = params.row.orderNo;
        if (orderNo) {
          return <Link to={`/confirm-order-details${orderNo}`}>{orderNo}</Link>;
        }
      },
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 110,
      valueGetter: ({ value }) =>
        value && moment(new Date(value)).format("DD-MMM-YYYY"),
    },
    {
      field: "demandNo",
      headerName: "Demand No",
      width: 90,
      renderCell: (params) => {
        let demandNo = params.row.demandNo;
        if (demandNo) {
          return <Link to={`/demand-details${demandNo}`}>{demandNo}</Link>;
        }
      },
    },
    {
      field: "demandDate",
      headerName: "Demand Date",
      width: 110,
      valueGetter: ({ value }) =>
        value && moment(new Date(value)).format("DD-MMM-YYYY"),
    },
    { field: "bookTypeNo", headerName: "Book Type No", width: 70 },
    { field: "totalQty", headerName: "Book Qty", width: 90 },
    { field: "totalAmount", headerName: "Amount", width: 110 },
  ];

  const handelChangeSearch = (event) => {
    let requestModel = {
      ...parameter,
      page: 1,
      searchName: event.target.value,
    };

    dispatch(getAllAgentChallanList(requestModel));
  };
  
  const handleChangeFromDate = (value) => {
    let requestModel = {
      ...parameter,
      page: 1,
      fromDate: value
    };

    if (requestModel.fromDate && requestModel.toDate) {
      dispatch(getAllAgentChallanList(requestModel));
    }
    
  };

  const handleChangeToDate = (value) => {
    let requestModel = {
      ...parameter,
      page: 1,
      toDate: value
    };

    if (requestModel.fromDate && requestModel.toDate) {
      dispatch(getAllAgentChallanList(requestModel));
    }
  };

  const handleOnChangePageSize = (value) => {
    let requestModel = {
      ...parameter,
      pageSize: value,
    };
    dispatch(getAllAgentChallanList(requestModel));
  };
  const handleOnChangePage = (value) => {
    let requestModel = {
      ...parameter,
      page: value,
    };
    dispatch(getAllAgentChallanList(requestModel));
  };

  return (
    <DataGridContainer>
      <PageHeader name={"Challan Status"} />
      <DataGridFilterContent className="round_background">
        <FilterRow className="row">
          <FilterCol className="col">
            <DatePickerInput
              date={parameter.fromDate}
              name={"fromDate"}
              label={"From Date"}
              handleChangeParameter={handleChangeParameter}
              handleChangeDate={handleChangeFromDate}
            />
          </FilterCol>
          <FilterCol className="col">
            <DatePickerInput
              date={parameter.toDate}
              name={"toDate"}
              label={"To Date"}
              handleChangeParameter={handleChangeParameter}
              handleChangeDate={handleChangeToDate}
            />
          </FilterCol>
        </FilterRow>
        <div
          style={{
            minHeight: 630,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SearchFilterInput
            searchName={parameter.searchName}
            handleChangeParameter={handleChangeParameter}
            handelChangeSearch={handelChangeSearch}
          />
          <DataGridByPagination
            listData={agentChallanList}
            pColumns={columns}
            parameter={parameter}
            handleChangeParameter={handleChangeParameter}
            handleOnChangePageSize={handleOnChangePageSize}
            handleOnChangePage={handleOnChangePage}
          />
        </div>
      </DataGridFilterContent>
    </DataGridContainer>
  );
};

export default Challan;
