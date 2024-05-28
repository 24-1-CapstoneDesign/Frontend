import React, { useState, useEffect } from "react";
import "../styles/calendar.css"; // CSS 스타일 임포트
import downArrow from "../icons/down.png"; // 다운 아이콘 추가
import rightArrow from "../icons/tail_right.png"; // 오른쪽 화살표 이미지 추가

function Calendar() {
  const [startDate, setStartDate] = useState(new Date(2024, 3, 16));
  const [endDate, setEndDate] = useState(new Date(2024, 3, 18));
  const [currentYear, setCurrentYear] = useState(startDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(startDate.getMonth() + 1);

  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const handleDateChange = (setter, year, month, day) => {
    setter(new Date(year, month - 1, day));
  };

  const isSelected = (day) => {
    const date = new Date(currentYear, currentMonth - 1, day);
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  const renderDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    for (let i = 1; i <= daysInMonth(currentYear, currentMonth); i++) {
      const dayOfWeek = new Date(currentYear, currentMonth - 1, i).getDay();
      const dayClass =
        dayOfWeek === 0
          ? "sun"
          : dayOfWeek === 6
          ? "sat"
          : ["mon", "tue", "wed", "thu", "fri"][dayOfWeek - 1];
      days.push(
        <div
          key={i}
          className={`day ${dayClass} ${isSelected(i) ? "selected" : ""}`}
        >
          <span>{i}</span>
        </div>
      );
    }
    return days;
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    setCurrentYear(startDate.getFullYear());
    setCurrentMonth(startDate.getMonth() + 1);
  }, [startDate]);

  useEffect(() => {
    setCurrentYear(endDate.getFullYear());
    setCurrentMonth(endDate.getMonth() + 1);
  }, [endDate]);

  return (
    <div className="custom-calendar">
      <div className="date-selectors">
        <div className="start-date">
          {["Year", "Month", "Day"].map((type, index) => (
            <div className="selector-with-icon" key={`start-${type}`}>
              <select
                value={
                  index === 0
                    ? startDate.getFullYear()
                    : index === 1
                    ? startDate.getMonth() + 1
                    : startDate.getDate()
                }
                onChange={(e) =>
                  handleDateChange(
                    setStartDate,
                    index === 0
                      ? parseInt(e.target.value)
                      : startDate.getFullYear(),
                    index === 1
                      ? parseInt(e.target.value)
                      : startDate.getMonth() + 1,
                    index === 2 ? parseInt(e.target.value) : startDate.getDate()
                  )
                }
              >
                {Array.from(
                  {
                    length:
                      index === 0
                        ? 10
                        : index === 1
                        ? 12
                        : daysInMonth(
                            startDate.getFullYear(),
                            startDate.getMonth() + 1
                          ),
                  },
                  (_, i) => {
                    const value = index === 0 ? currentYear - 5 + i : i + 1;
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  }
                )}
              </select>
              {index === 2 && <img src={downArrow} alt="Down" />}
            </div>
          ))}
        </div>
        <img src={rightArrow} className="arrow-right" alt="Right Arrow" />
        <div className="end-date">
          {["Year", "Month", "Day"].map((type, index) => (
            <div className="selector-with-icon" key={`end-${type}`}>
              <select
                value={
                  index === 0
                    ? endDate.getFullYear()
                    : index === 1
                    ? endDate.getMonth() + 1
                    : endDate.getDate()
                }
                onChange={(e) =>
                  handleDateChange(
                    setEndDate,
                    index === 0
                      ? parseInt(e.target.value)
                      : endDate.getFullYear(),
                    index === 1
                      ? parseInt(e.target.value)
                      : endDate.getMonth() + 1,
                    index === 2 ? parseInt(e.target.value) : endDate.getDate()
                  )
                }
              >
                {Array.from(
                  {
                    length:
                      index === 0
                        ? 10
                        : index === 1
                        ? 12
                        : daysInMonth(
                            endDate.getFullYear(),
                            endDate.getMonth() + 1
                          ),
                  },
                  (_, i) => {
                    const value = index === 0 ? currentYear - 5 + i : i + 1;
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  }
                )}
              </select>
              {index === 2 && <img src={downArrow} alt="Down" />}
            </div>
          ))}
        </div>
      </div>
      <div className="week-days">
        {weekDays.map((day) => (
          <div key={day} className="week-day">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">{renderDays()}</div>
    </div>
  );
}

export default Calendar;
