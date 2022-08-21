import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { useNavigate } from "react-router-dom";
import {
  DataGridContainer,
  DataGridFilterContent
} from "../../../assets/demand.css";
import { ReportCol, ReportRow } from "../../../assets/report.css";
import DatePickerInput from "../../../components/common/DatePickerInput";
import PageHeader from "../../../components/common/PageHeader";
import Spinners from "../../../components/common/Spinners";
import { RdlcReportAssignFormat } from "../../../hooks/rdlc-report-format";
import { getAllZilaList, getLibraryInfoListByZila } from "../../../redux/actions/print/marketing/libraryStatementActions";
import { GlobalVariable } from "../../../utility-class/ApiConnectionClass";
import { getLibraryStatementReport } from "../../../utils/print/marketing/LibraryStatementApi";

const requestModel = {
  docType: "pdf",
  isPortrait: true,
  fromDate: "",
  toDate: "",
  libraryCode: "",
  libraryText: "",
  zilaText:""
};

const LibraryStatement = () => {
  let [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.storageStore);
  const { zilaList } = useSelector((state) => state.libraryStore);
  const { libraryInfoList } = useSelector((state) => state.libraryStore);
  const [reportParam, setReportParam] = useState(requestModel);
  const localRootUrl = GlobalVariable.LOCAL_WEB_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
      navigate('/login', {replace:true});
      return;
    }
    window.scrollTo(0, 0);
    dispatch(getAllZilaList());
  }, [])
  const handleChangeParameter = (key, value) =>
    setReportParam((prev) => ({ ...prev, [key]: value }));

  const handleChangeFromDate = (value) => {};
  const handleChangeToDate = (value) => {};


  const handleClickByReport = async () => {
    if (!reportParam.fromDate || !reportParam.toDate || !reportParam.libraryCode) {
      toastr.error("please Enter All Filed Required!!");
      return;
    };
    setLoading(true);
    let requestModel = {
      ...reportParam,
      fromDate: moment(new Date(reportParam.fromDate)).format("YYYY-MM-DD"),
      toDate: moment(new Date(reportParam.toDate)).format("YYYY-MM-DD")
    };
    let response = await getLibraryStatementReport(requestModel);
    if (!response.didError && response.model !== "Error") {
      setLoading(false);
      RdlcReportAssignFormat(
        reportParam.docType,
        response.model,
        "Library Statement"
      );
    }else{
      setLoading(false);
    }
  };
  const handleChangeLibrary = (param) => {
    let requestParam = {
      ...reportParam,
      libraryCode: param ? param.code : "",
      fromDate: new Date(),
      toDate: new Date(),
    }
    setReportParam(requestParam);
  }
  const filterOptions = createFilterOptions({
    stringify: (option) => option.name + option.code + option.zilaName + option.zilaCode
  });

  return (
    <>
      <DataGridContainer>
        <PageHeader name={"Library Statement"} />
        <DataGridFilterContent className="col-sm-12 col-lg-6 round_background">
          <ReportRow className="row">
            <ReportCol className="col">
              <Autocomplete
              id="combo-box-demo"
              size="small"
                inputValue={reportParam.zilaText}
                getOptionLabel={(option) => option.name}
                onInputChange={(event, value) => handleChangeParameter("zilaText", value)}
                onChange={(event, value) => dispatch(getLibraryInfoListByZila(value ? value.stringId : ""))}              
                options={zilaList}
                renderInput={(params) => <TextField size="small" fullWidth {...params} label="Select Zila" />}
              />
            </ReportCol>
            <ReportCol className="col">
              <Autocomplete
                id="combo-box-demo"
                size="small"
                getOptionLabel={(option) => option.name}
                inputValue={reportParam.libraryText}
                onInputChange={(event, value) => handleChangeParameter("libraryText", value)}
                onChange={(event, value) => handleChangeLibrary(value)}
                
                filterOptions={filterOptions}
                options={libraryInfoList}
                renderInput={(params) => <TextField fullWidth {...params} label="Select Library" />}
              />
            </ReportCol>
            <ReportCol className="col">
              <DatePickerInput
                date={reportParam.fromDate}
                name={"fromDate"}
                label={"From Date"}
                handleChangeParameter={handleChangeParameter}
                handleChangeDate={handleChangeFromDate}
              />
            </ReportCol>
            <ReportCol className="col">
              <DatePickerInput
                date={reportParam.toDate}
                name={"toDate"}
                label={"To Date"}
                handleChangeParameter={handleChangeParameter}
                handleChangeDate={handleChangeToDate}
              />
            </ReportCol>

            <ReportCol className="col text-right">
              <button type="button" className="btn btn-primary" onClick={handleClickByReport}>Ok</button>
            </ReportCol>
          </ReportRow>
        </DataGridFilterContent>
      </DataGridContainer>
      <Spinners left={'26%'} active={loading}></Spinners>
    </>
  );
};

export default LibraryStatement;
