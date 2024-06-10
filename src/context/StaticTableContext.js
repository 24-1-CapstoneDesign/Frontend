import React, { createContext, useState } from "react";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <CalendarContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext };
export default CalendarContext;
