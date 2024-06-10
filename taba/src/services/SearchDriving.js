const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export function SearchDriving(startDate, endDate) {
  startDate = formatDate(startDate);
  endDate = formatDate(endDate);

  const url = ` /api/drivingsessions/search?startDate=${startDate}&endDate=${endDate}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
