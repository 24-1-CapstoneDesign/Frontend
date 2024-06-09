const BASE_URL = "/api/managers";

export function registerUser(loginId, password, name, managerType) {
  const url = `${BASE_URL}/register`;
  const data = {
    login_id: loginId,
    password: password,
    name: name,
    manager_type: managerType,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export function loginUser(loginId, password) {
  const url = `${BASE_URL}/login`;
  const data = {
    login_id: loginId,
    password: password,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export function fetchProtectedData() {
  const url = `${BASE_URL}/protected`;
  const jwt = localStorage.getItem("jwt"); // LocalStorage에서 JWT 가져오기

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`, // Authorization 헤더에 JWT 추가
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
