// services/carService.js

export async function fetchCarData(carId) {
  try {
    const response = await fetch(`/api/cars/${carId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    return null;
  }
}
