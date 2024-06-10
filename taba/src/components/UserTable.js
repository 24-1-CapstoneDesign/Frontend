import React, { useState, useEffect } from "react";
import "../styles/usertable.css";
import activeLeftIcon from "../icons/active_left.png";
import inactiveLeftIcon from "../icons/inactive_left.png";
import activeRightIcon from "../icons/active_right.png";
import inactiveRightIcon from "../icons/inactive_right.png";
import DownloadModal from "../components/DownloadModal";
import { fetchUsers, fetchCarsByUserId } from "../services/userTable";

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsersAndCars();
  }, []);

  async function fetchUsersAndCars() {
    try {
      const usersResponse = await fetchUsers();
      if (!usersResponse.success || !usersResponse.data) {
        throw new Error("No users found or unable to fetch users.");
      }

      const usersWithCars = await Promise.all(
        usersResponse.data.map(async (user) => {
          try {
            const carsResponse = await fetchCarsByUserId(user.id);
            if (
              !carsResponse.success ||
              !carsResponse.data ||
              carsResponse.data.length === 0
            ) {
              return { ...user, cars: "No cars data available." };
            }
            return { ...user, cars: carsResponse.data };
          } catch (error) {
            console.error(`Error fetching cars for user ${user.id}:`, error);
            return {
              ...user,
              cars: "Failed to load cars data. " + error.message,
            };
          }
        })
      );

      setUserData(usersWithCars);
    } catch (error) {
      console.error("Critical error loading data: ", error.message);
      setUserData([]);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const totalItems = userData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumberLimit = Math.min(
    totalPages,
    Math.ceil(currentPage / 5) * 5
  );
  const minPageNumberLimit = maxPageNumberLimit - 4;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const handleRowClick = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <DownloadModal isVisible={isModalVisible} onClose={handleClose} />
      <div className="search-bar">
        <input type="text" placeholder="차량 번호를 입력하세요." />
        <div className="search-icon"></div>
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
            {currentItems.length > 0 ? (
              currentItems.map((user) =>
                typeof user.cars === "string" ? (
                  <tr key={`user-no-cars-${user.id}`}>
                    <td colSpan="5">{user.cars}</td>
                  </tr>
                ) : (
                  user.cars.map((car) => (
                    <tr key={`${user.id}-${car.id}`} onClick={handleRowClick}>
                      <td>{user.id}</td>
                      <td>{car.car_size}</td>
                      <td>{car.car_number}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        {user.withdrawAt ? formatDate(user.withdrawAt) : "N/A"}
                      </td>
                    </tr>
                  ))
                )
              )
            ) : (
              <tr>
                <td colSpan="5">No user data available.</td>
              </tr>
            )}
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
