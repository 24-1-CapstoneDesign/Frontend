import axios from "axios";

export const fetchSessionData = async (startDate, endDate) => {
  const formattedStartDate = `${startDate.getFullYear()}-${(
    startDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
  const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;
  try {
    const response = await axios.get(
      `/api/drivingsessions/search?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null; // 실패 시 null 반환
  }
};
