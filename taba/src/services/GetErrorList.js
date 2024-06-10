export function GetErrorList() {
  const url = `/api/drivingsessions/error/list`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
