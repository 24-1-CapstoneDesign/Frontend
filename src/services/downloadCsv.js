const baseUrl = "http://localhost:3000/api";

// 특정 드라이빙 세션 ID에 대한 센서 데이터를 가져오는 함수
export const fetchSensorDataBySessionId = async (sessionId) => {
  const response = await fetch(`${baseUrl}/sensordata/${sessionId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sensor data for session ${sessionId}`);
  }
  const data = await response.json();
  return data.data; // 데이터가 response.data에 있을 경우 이 부분을 수정
};

// CSV 파일 생성 및 다운로드를 위한 유틸리티 함수
export const downloadCSV = (data, filename) => {
  const headers = Object.keys(data[0]).join(",") + "\n"; // CSV 헤더 추가
  const csvData =
    headers + data.map((row) => Object.values(row).join(",")).join("\n");
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
