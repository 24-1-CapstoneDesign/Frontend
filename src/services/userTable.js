const baseUrl = "api";

// 모든 사용자 정보를 가져오는 함수
export const fetchUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};

// 특정 사용자 ID에 대한 모든 차량 정보를 가져오는 함수
export const fetchCarsByUserId = async (userId) => {
  const response = await fetch(`${baseUrl}/cars/user/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cars for user ${userId}`);
  }
  return await response.json();
};

// 특정 사용자 ID에 대한 모든 운전 세션 정보를 가져오는 함수
export const fetchDrivingSessionsByUser = async (userId) => {
  const response = await fetch(
    `${baseUrl}/drivingsessions/findbyuser/${userId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch driving sessions for user ${userId}`);
  }
  return await response.json();
};

// 특정 차량 번호에 대한 모든 운전 세션 정보를 가져오는 함수
export const fetchDrivingSessionsByCarNumber = async (carNumber) => {
  const response = await fetch(
    `${baseUrl}/drivingsessions/findbycar/${carNumber}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch driving sessions for car ${carNumber}`);
  }
  return await response.json();
};
