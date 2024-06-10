// 실제 환경에서는 이 URL을 실제 서버의 URL로 바꿔야 함
const baseUrl = "http://localhost:3000/api";

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
