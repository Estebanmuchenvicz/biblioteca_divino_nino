import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

export default function CalendarMini() {
  const [date, setDate] = useState(new Date());

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Calendario
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
