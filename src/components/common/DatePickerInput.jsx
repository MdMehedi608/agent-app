import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";

const DatePickerInput = ({date, name, label, handleChangeParameter, handleChangeDate}) => {
    
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker 
        label={label}
        value={date}
        onChange={(e) => {
            handleChangeParameter(name, e);
            handleChangeDate(e)
        }}
        renderInput={(params) => <TextField size="small" fullWidth {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
