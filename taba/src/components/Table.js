import React, { useState } from "react";
import "../styles/table.css";
import activeLeftIcon from "../icons/active_left.png";
import inactiveLeftIcon from "../icons/inactive_left.png";
import activeRightIcon from "../icons/active_right.png";
import inactiveRightIcon from "../icons/inactive_right.png";

const carData = [
  {
    id: 1,
    size: "대형",
    number: "395누 2537",
    location: "당산교 1번출구",
    solved: "해결완료",
  },
  {
    id: 2,
    size: "중형",
    number: "154러 7070",
    location: "상수대교교",
    solved: "해결완료",
  },
  {
    id: 3,
    size: "소형",
    number: "294가 3018",
    location: "삼청로마트",
    solved: "미해결",
  },
  {
    id: 4,
    size: "대형",
    number: "333이 9194",
    location: "충무로 4번출구",
    solved: "미해결",
  },
  {
    id: 5,
    size: "소형",
    number: "233구 0087",
    location: "광안오션마트",
    solved: "미해결",
  },
  {
    id: 6,
    size: "중형",
    number: "100가 2000",
    location: "논현역",
    solved: "해결완료",
  },
  {
    id: 7,
    size: "소형",
    number: "123가 4567",
    location: "강남역 5번출구",
    solved: "미해결",
  },
  {
    id: 8,
    size: "대형",
    number: "789가 1011",
    location: "홍대입구역",
    solved: "미해결",
  },
  {
    id: 9,
    size: "중형",
    number: "555가 6666",
    location: "이태원역",
    solved: "해결완료",
  },
  {
    id: 10,
    size: "소형",
    number: "777가 8888",
    location: "명동역",
    solved: "해결완료",
  },
  {
    id: 11,
    size: "대형",
    number: "222가 3333",
    location: "잠실역",
    solved: "미해결",
  },
  {
    id: 12,
    size: "중형",
    number: "444가 5555",
    location: "신촌역",
    solved: "미해결",
  },
  {
    id: 13,
    size: "소형",
    number: "999가 0000",
    location: "역삼역",
    solved: "해결완료",
  },
  {
    id: 14,
    size: "대형",
    number: "888가 9999",
    location: "성수역",
    solved: "미해결",
  },
  {
    id: 15,
    size: "중형",
    number: "111가 2222",
    location: "건대입구역",
    solved: "미해결",
  },
  {
    id: 16,
    size: "소형",
    number: "666가 7777",
    location: "서울역",
    solved: "미해결",
  },
  {
    id: 17,
    size: "대형",
    number: "333가 4444",
    location: "시청역",
    solved: "미해결",
  },
  {
    id: 18,
    size: "중형",
    number: "222가 1111",
    location: "종각역",
    solved: "해결완료",
  },
  {
    id: 19,
    size: "소형",
    number: "555가 4444",
    location: "광화문역",
    solved: "미해결",
  },
  {
    id: 20,
    size: "대형",
    number: "444가 3333",
    location: "을지로입구역",
    solved: "해결완료",
  },
  {
    id: 21,
    size: "중형",
    number: "333가 2222",
    location: "노원역",
    solved: "미해결",
  },
  {
    id: 22,
    size: "소형",
    number: "111가 0000",
    location: "청량리역",
    solved: "미해결",
  },
  {
    id: 23,
    size: "대형",
    number: "666가 5555",
    location: "영등포역",
    solved: "미해결",
  },
  {
    id: 24,
    size: "중형",
    number: "777가 6666",
    location: "동대문역",
    solved: "미해결",
  },
  {
    id: 25,
    size: "소형",
    number: "888가 7777",
    location: "신림역",
    solved: "미해결",
  },
  {
    id: 26,
    size: "대형",
    number: "199누 0001",
    location: "천호역",
    solved: "해결완료",
  },
  {
    id: 27,
    size: "중형",
    number: "200러 0002",
    location: "강남역",
    solved: "미해결",
  },
  {
    id: 28,
    size: "소형",
    number: "201가 0003",
    location: "잠실역",
    solved: "해결완료",
  },
  {
    id: 29,
    size: "대형",
    number: "202이 0004",
    location: "홍대입구역",
    solved: "미해결",
  },
  {
    id: 30,
    size: "중형",
    number: "203구 0005",
    location: "신림역",
    solved: "미해결",
  },
  {
    id: 31,
    size: "소형",
    number: "204누 0006",
    location: "명동역",
    solved: "해결완료",
  },
  {
    id: 32,
    size: "대형",
    number: "205러 0007",
    location: "서울역",
    solved: "미해결",
  },
  {
    id: 33,
    size: "중형",
    number: "206가 0008",
    location: "강변역",
    solved: "미해결",
  },
  {
    id: 34,
    size: "소형",
    number: "207이 0009",
    location: "노원역",
    solved: "해결완료",
  },
  {
    id: 35,
    size: "대형",
    number: "208구 0010",
    location: "여의도역",
    solved: "해결완료",
  },
  {
    id: 36,
    size: "중형",
    number: "209누 0011",
    location: "수원역",
    solved: "미해결",
  },
  {
    id: 37,
    size: "소형",
    number: "210러 0012",
    location: "분당역",
    solved: "미해결",
  },
  {
    id: 38,
    size: "대형",
    number: "211가 0013",
    location: "판교역",
    solved: "해결완료",
  },
  {
    id: 39,
    size: "중형",
    number: "212이 0014",
    location: "구로디지털단지역",
    solved: "미해결",
  },
  {
    id: 40,
    size: "대형",
    number: "213구 0015",
    location: "사당역",
    solved: "미해결",
  },
  {
    id: 41,
    size: "소형",
    number: "214누 0016",
    location: "신도림역",
    solved: "해결완료",
  },
  {
    id: 42,
    size: "중형",
    number: "215러 0017",
    location: "동대문역",
    solved: "미해결",
  },
  {
    id: 43,
    size: "대형",
    number: "216가 0018",
    location: "서울대입구역",
    solved: "미해결",
  },
  {
    id: 44,
    size: "소형",
    number: "217이 0019",
    location: "방배역",
    solved: "해결완료",
  },
  {
    id: 45,
    size: "중형",
    number: "218구 0020",
    location: "고속터미널역",
    solved: "해결완료",
  },
  {
    id: 46,
    size: "대형",
    number: "219누 0021",
    location: "서초역",
    solved: "미해결",
  },
  {
    id: 47,
    size: "소형",
    number: "220러 0022",
    location: "양재역",
    solved: "미해결",
  },
  {
    id: 48,
    size: "중형",
    number: "221가 0023",
    location: "낙성대역",
    solved: "해결완료",
  },
  {
    id: 49,
    size: "대형",
    number: "222이 0024",
    location: "사당역",
    solved: "미해결",
  },
  {
    id: 50,
    size: "소형",
    number: "223구 0025",
    location: "방화역",
    solved: "미해결",
  },
  {
    id: 51,
    size: "중형",
    number: "224누 0026",
    location: "영등포역",
    solved: "해결완료",
  },
  {
    id: 52,
    size: "대형",
    number: "225러 0027",
    location: "신설동역",
    solved: "미해결",
  },
  {
    id: 53,
    size: "소형",
    number: "226가 0028",
    location: "잠원역",
    solved: "미해결",
  },
  {
    id: 54,
    size: "중형",
    number: "227이 0029",
    location: "마포역",
    solved: "해결완료",
  },
  {
    id: 55,
    size: "대형",
    number: "228구 0030",
    location: "홍대입구역",
    solved: "해결완료",
  },
  {
    id: 56,
    size: "소형",
    number: "229누 0031",
    location: "이태원역",
    solved: "미해결",
  },
  {
    id: 57,
    size: "중형",
    number: "230러 0032",
    location: "한강진역",
    solved: "미해결",
  },
  {
    id: 58,
    size: "대형",
    number: "231가 0033",
    location: "연신내역",
    solved: "해결완료",
  },
  {
    id: 59,
    size: "소형",
    number: "232이 0034",
    location: "불광역",
    solved: "미해결",
  },
  {
    id: 60,
    size: "중형",
    number: "233구 0035",
    location: "가산디지털단지역",
    solved: "미해결",
  },
  {
    id: 61,
    size: "대형",
    number: "234누 0036",
    location: "구파발역",
    solved: "해결완료",
  },
  {
    id: 62,
    size: "소형",
    number: "235러 0037",
    location: "신촌역",
    solved: "미해결",
  },
  {
    id: 63,
    size: "중형",
    number: "236가 0038",
    location: "여의도역",
    solved: "미해결",
  },
  {
    id: 64,
    size: "대형",
    number: "237이 0039",
    location: "노량진역",
    solved: "해결완료",
  },
  {
    id: 65,
    size: "소형",
    number: "238구 0040",
    location: "당산역",
    solved: "해결완료",
  },
  {
    id: 66,
    size: "중형",
    number: "239누 0041",
    location: "올림픽공원역",
    solved: "미해결",
  },
  {
    id: 67,
    size: "대형",
    number: "240러 0042",
    location: "방이역",
    solved: "미해결",
  },
  {
    id: 68,
    size: "소형",
    number: "241가 0043",
    location: "오금역",
    solved: "해결완료",
  },
  {
    id: 69,
    size: "중형",
    number: "242이 0044",
    location: "개롱역",
    solved: "미해결",
  },
  {
    id: 70,
    size: "대형",
    number: "243구 0045",
    location: "거여역",
    solved: "미해결",
  },
  {
    id: 71,
    size: "소형",
    number: "244누 0046",
    location: "보라매역",
    solved: "해결완료",
  },
  {
    id: 72,
    size: "중형",
    number: "245러 0047",
    location: "서울대입구역",
    solved: "미해결",
  },
  {
    id: 73,
    size: "대형",
    number: "246가 0048",
    location: "방배역",
    solved: "해결완료",
  },
  {
    id: 74,
    size: "소형",
    number: "247이 0049",
    location: "사당역",
    solved: "미해결",
  },
  {
    id: 75,
    size: "중형",
    number: "248구 0050",
    location: "낙성대역",
    solved: "미해결",
  },
];

function CarTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = carData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
