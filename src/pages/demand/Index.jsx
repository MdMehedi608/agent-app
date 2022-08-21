import { Chip } from "@mui/material";
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
import { getAllDemandList } from "../../redux/actions/books/agentDemandActions";

const requestModel = {
  fromDate: "",
  toDate: "",
  commonId: "",
  searchName: "",
  page: 1,
  pageSize: 10,
};

const Index = () => {
  const [parameter, setParameter] = useState(requestModel);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storageStore);
  const { demandList } = useSelector((state) => state.bookStore);

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
    dispatch(getAllDemandList(requestModel));
  }, []);
  const handleChangeParameter = (key, value) =>
    setParameter((prev) => ({ ...prev, [key]: value }));

  const columns = [
    {
      field: "demandNo",
      headerName: "Demand No",
      width: 150,
      renderCell: (params) => {
        const demandNo = params.row.demandNo;
        if (demandNo) {
          return <Link to={`/demand-details${demandNo}`}>{demandNo}</Link>;
        }
      },
    },
    {
      field: "demandDate",
      headerName: "Demand Date",
      width: 200,
      valueGetter: ({ value }) =>
        value && moment(new Date(value)).format("DD-MMM-YYYY"),
    },
    { field: "bookTypeNo", headerName: "Book Type No", width: 150 },
    { field: "totalQty", headerName: "Total Qty", width: 200 },
    { field: "totalAmount", headerName: "Total Amount", width: 250 },
    {
      field: "confirmation",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        const value = params.row.confirmation;
        if (value === 0) {
          return <Chip color="info" size="small" label={"Pending"} />;
        } else if (value === 1) {
          return <Chip color="success" size="small" label={"Confirm"} />;
        } else if (value === 2) {
          return <Chip color="error" size="small" label={"Reject"} />;
        }
      },
    },
  ];

  const handelChangeSearch = (event) => {
    let requestModel = {
      ...parameter,
      page: 1,
      searchName: event.target.value,
    };

    dispatch(getAllDemandList(requestModel));
  };
  const handleChangeFromDate = (value) => {
    let requestModel = {
      ...parameter,
      page: 1,
      fromDate: value
    };

    if (requestModel.fromDate && requestModel.toDate) {
      dispatch(getAllDemandList(requestModel));
    }
    
  };

  const handleChangeToDate = (value) => {
    let requestModel = {
      ...parameter,
      page: 1,
      toDate: value
    };

    if (requestModel.fromDate && requestModel.toDate) {
      dispatch(getAllDemandList(requestModel));
    }
  };


  const handleOnChangePageSize = (value) => {
    let requestModel = {
      ...parameter,
      pageSize: value,
    };
    dispatch(getAllDemandList(requestModel));
  };
  const handleOnChangePage = (value) => {
    let requestModel = {
      ...parameter,
      page: value,
    };
    dispatch(getAllDemandList(requestModel));
  };

  const handleClick = () => {
    navigate("/new-demand", { replace: true });
  };
  return (
    <DataGridContainer>
      <PageHeader name={"Demand Status"} handleClick={handleClick}>
        New Demand
      </PageHeader>
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
            listData={demandList}
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

export default Index;
