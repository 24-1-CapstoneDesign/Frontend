import React, { useEffect, useState } from "react";
import "../styles/table.css";
import activeLeftIcon from "../icons/active_left.png";
import inactiveLeftIcon from "../icons/inactive_left.png";
import activeRightIcon from "../icons/active_right.png";
import inactiveRightIcon from "../icons/inactive_right.png";

import { GetErrorList } from "../services/GetErrorList";

function CarTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [carData, setcarData] = useState([]);
  const itemsPerPage = 5;
  const totalItems = carData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { naver } = window;

  function removeFirstPart(address) {
    const parts = address.split(" ", 3); // 주소를 처음 두 번째 공백까지 나누기
    if (parts.length > 1) {
      return address.substring(address.indexOf(parts[2])); // 두 번째 부분부터 반환
    }
    return address; // 공백이 없으면 원래 주소 반환
  }

  function reversecoord(latitude, longitude) {
    return new Promise((resolve, reject) => {
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(latitude, longitude),
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            console.error("Reverse geocoding failed with status:", status);
            reject(status);
            return;
          }

          var result = response.v2; // 검색 결과의 컨테이너
          var address = result.address; // 검색 결과로 만든 주소
          var formattedAddress = removeFirstPart(address.jibunAddress); // 주소의 앞부분 제거

          resolve(formattedAddress);
        }
      );
    });
  }

  const GetErrorLocation = async () => {
    try {
      const response = await GetErrorList();
      if (response.success) {
        const ErrorData = response.data; // 응답에서 사용자 데이터 추출
        const formattedData = await Promise.all(
          ErrorData.map(async (item) => ({
            id: item.id,
            size:
              item.car_size === "SMALL"
                ? "소형"
                : item.car_size === "MEDIUM"
                ? "중형"
                : "대형", // 차급 변환
            number: item.car_number,
            location: await reversecoord(item.latitude, item.longitude), // 예시로 위도와 경도를 location 필드에 저장
            solved: item.status === "ERROR" ? "미해결" : "해결완료", // 상태에 따라 해결 여부 설정
          }))
        );
        console.log(formattedData);
        setcarData(formattedData);
      } else {
        alert("Error Location failed.");
      }
    } catch (error) {
      console.error("Location Error:", error);
    }
  };

  useEffect(() => {
    GetErrorLocation();
  }, []);

  // 현재 페이지 집합 계산
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

  // 페이지 번호 배열 계산
  const pageNumbers = [];
  for (let i = minPageNumberLimit; i <= maxPageNumberLimit; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = carData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <div className="title">사건 리스트</div>
      <div className="divider"></div>
      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>차급</th>
            <th>차량 번호</th>
            <th>사건 발생 장소</th>
            <th>사건 해결 여부</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.size}</td>
              <td>{item.number}</td>
              <td>{item.location}</td>
              <td>{item.solved}</td>
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
            src={currentPage < totalPages ? activeRightIcon : inactiveRightIcon}
            alt="Next"
          />
        </button>
      </div>
    </div>
  );
}

export default CarTable;
