import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CustomDateRangePicker() {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "10px" }}>
        <DatePicker
          label="Check-in"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <span style={{ alignSelf: "center" }}>to</span>
        <DatePicker
          label="Check-out"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </LocalizationProvider>
  );
}
