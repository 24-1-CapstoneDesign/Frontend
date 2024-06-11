import React, { useState, useEffect } from "react";
import "../styles/usertable.css";
import activeLeftIcon from "../icons/active_left.png";
import inactiveLeftIcon from "../icons/inactive_left.png";
import activeRightIcon from "../icons/active_right.png";
import inactiveRightIcon from "../icons/inactive_right.png";
import DownloadModal from "../components/DownloadModal";
import {
  fetchUsers,
  fetchCarsByUserId,
  fetchDrivingSessionsByUser,
  fetchDrivingSessionsByCarNumber,
} from "../services/userTable";

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsersAndCars();
  }, []);

  async function fetchUsersAndCars() {
    try {
      const usersResponse = await fetchUsers();
      if (!usersResponse.success || !usersResponse.data) {
        throw new Error("Failed to fetch users or no data available.");
      }

      const usersWithCarsAndSessions = await Promise.all(
        usersResponse.data.map(async (user) => {
          try {
            const carsResponse = await fetchCarsByUserId(user.id);
            if (!carsResponse.success || !carsResponse.data) {
              return { ...user, cars: "No cars data available" };
            }

            const sessionsResponse = await fetchDrivingSessionsByUser(user.id);
            if (!sessionsResponse.success || !sessionsResponse.data) {
              return {
                ...user,
                cars: carsResponse.data,
                hasActiveError: false,
                sessions: [],
              };
            }

            let hasActiveError = sessionsResponse.data.some(
              (session) => session.ERROR_STATUS !== null
            );
            return {
              ...user,
              cars: carsResponse.data,
              hasActiveError,
              sessions: sessionsResponse.data,
            };
          } catch (error) {
            console.error(`Error fetching data for user ${user.id}:`, error);
            return {
              ...user,
              cars: "Failed to load cars data",
              hasActiveError: false,
              sessions: [],
            };
          }
        })
      );

      setUserData(usersWithCarsAndSessions);
    } catch (error) {
      console.error("Critical error loading data: ", error.message);
      setUserData([]);
    }
  }

  const handleRowClick = (user) => {
    const activeSessions = user.sessions.filter(
      (session) => session.ERROR_STATUS !== null
    );

    if (activeSessions.length > 0) {
      setSelectedSessions(activeSessions);
      setIsModalVisible(true);
    } else {
      setSelectedSessions([]);
      setIsModalVisible(false);
      alert("데이터가 없습니다.");
    }
  };

  const handleSearch = async () => {
    try {
      const sessionsResponse = await fetchDrivingSessionsByCarNumber(
        searchQuery
      );
      if (!sessionsResponse.success || !sessionsResponse.data) {
        alert("해당 차량 번호에 대한 데이터를 찾을 수 없습니다.");
        return;
      }
      const activeSessions = sessionsResponse.data.filter(
        (session) => session.ERROR_STATUS !== null
      );
      if (activeSessions.length > 0) {
        setSelectedSessions(activeSessions);
        setIsModalVisible(true);
      } else {
        alert("해당 차량 번호에 대한 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("Search error: ", error.message);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const totalItems = userData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const maxPageNumberLimit = Math.min(
    totalPages,
    Math.ceil(currentPage / 5) * 5
  );
  const minPageNumberLimit = Math.max(1, maxPageNumberLimit - 4);

  const handleClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePrevSet = () => {
    if (minPageNumberLimit > 1) {
      setCurrentPage(minPageNumberLimit - 1);
    }
  };

  const handleNextSet = () => {
    if (maxPageNumberLimit < totalPages) {
      setCurrentPage(maxPageNumberLimit + 1);
    }
  };

  const pageNumbers = [];
  for (let i = minPageNumberLimit; i <= maxPageNumberLimit; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <DownloadModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        sessions={selectedSessions}
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="차량 번호를 입력하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="container">
        <div className="title">회원 차량 목록</div>
        <div className="divider"></div>
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>차급</th>
              <th>차량 번호</th>
              <th>회원 가입 일자</th>
              <th>회원 탈퇴 일자</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user)}>
                <td>{user.id}</td>
                <td>
                  {user.cars && user.cars.length > 0
                    ? user.cars[0].car_size
                    : "N/A"}
                </td>
                <td>
                  {user.cars && user.cars.length > 0
                    ? user.cars[0].car_number
                    : "N/A"}
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{user.withdrawAt ? formatDate(user.withdrawAt) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevSet} disabled={currentPage === 1}>
            <img
              src={currentPage > 1 ? activeLeftIcon : inactiveLeftIcon}
              alt="Previous"
            />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`button ${number === currentPage ? "active" : ""}`}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          ))}
          <button onClick={handleNextSet} disabled={currentPage === totalPages}>
            <img
              src={
                currentPage < totalPages ? activeRightIcon : inactiveRightIcon
              }
              alt="Next"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default UserTable;
