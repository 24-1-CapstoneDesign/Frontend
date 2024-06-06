export function LocationData() {
  const url = `/api/drivingsessions/error/list`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function ChangePW(id, ori_pw, new_pw, check_pw) {
  const url = `/api/managers/update`;

  if (new_pw != check_pw) {
    alert("비밀번호를 확인해주세요.");
    return Promise.resolve(false);
  }

  const data = {
    login_id: id,
    password: new_pw,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
