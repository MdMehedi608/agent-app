import { toastr } from "react-redux-toastr";
import { getMenuReport } from "../../../utils/reports/ReportApi";

export const getMenuReportByAll = async (paramData) => {
    const report = await getMenuReport(paramData); 
    if(!report.didError){
        return report;
    }else{
        toastr.error(report.errorMessage);
    }
    
};