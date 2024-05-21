import React, { useState } from "react";
import "../styles/usertable.css";
import activeLeftIcon from "../icons/active_left.png";
import inactiveLeftIcon from "../icons/inactive_left.png";
import activeRightIcon from "../icons/active_right.png";
import inactiveRightIcon from "../icons/inactive_right.png";
import DownloadModal from "../components/DownloadModal";

const userData = [
  {
    id: 1,
    size: "대형",
    number: "395누 2537",
    registrationDate: "2020/03/12",
    cancellationDate: "N",
  },
  {
    id: 2,
    size: "중형",
    number: "154러 7070",
    registrationDate: "2012/04/08",
    cancellationDate: "2024/03/18",
  },
  {
    id: 3,
    size: "소형",
    number: "294가 3018",
    registrationDate: "2007/08/02",
    cancellationDate: "N",
  },
  {
    id: 4,
    size: "대형",
    number: "333이 9194",
    registrationDate: "2018/11/10",
    cancellationDate: "N",
  },
  {
    id: 5,
    size: "중형",
    number: "233구 0087",
    registrationDate: "2006/01/08",
    cancellationDate: "2024/04/30",
  },
  {
    id: 6,
    size: "소형",
    number: "100가 2000",
    registrationDate: "2011/06/15",
    cancellationDate: "N",
  },
  {
    id: 7,
    size: "대형",
    number: "123가 4567",
    registrationDate: "2013/07/21",
    cancellationDate: "N",
  },
  {
    id: 8,
    size: "중형",
    number: "789가 1011",
    registrationDate: "2008/09/04",
    cancellationDate: "N",
  },
  {
    id: 9,
    size: "소형",
    number: "555가 6666",
    registrationDate: "2019/02/27",
    cancellationDate: "2024/05/30",
  },
  {
    id: 10,
    size: "대형",
    number: "777가 8888",
    registrationDate: "2014/03/17",
    cancellationDate: "N",
  },
  {
    id: 11,
    size: "중형",
    number: "222가 3333",
    registrationDate: "2015/08/25",
    cancellationDate: "N",
  },
  {
    id: 12,
    size: "소형",
    number: "444가 5555",
    registrationDate: "2010/05/19",
    cancellationDate: "N",
  },
  {
    id: 13,
    size: "대형",
    number: "999가 0000",
    registrationDate: "2016/04/22",
    cancellationDate: "2025/01/15",
  },
  {
    id: 14,
    size: "중형",
    number: "888가 9999",
    registrationDate: "2009/07/11",
    cancellationDate: "N",
  },
  {
    id: 15,
    size: "소형",
    number: "111가 2222",
    registrationDate: "2017/10/30",
    cancellationDate: "N",
  },
  {
    id: 16,
    size: "대형",
    number: "666가 7777",
    registrationDate: "2018/12/24",
    cancellationDate: "2023/11/09",
  },
  {
    id: 17,
    size: "중형",
    number: "333가 4444",
    registrationDate: "2005/01/15",
    cancellationDate: "N",
  },
  {
    id: 18,
    size: "소형",
    number: "222가 1111",
    registrationDate: "2011/03/10",
    cancellationDate: "2024/02/20",
  },
  {
    id: 19,
    size: "대형",
    number: "555가 4444",
    registrationDate: "2003/04/05",
    cancellationDate: "N",
  },
  {
    id: 20,
    size: "중형",
    number: "444가 3333",
    registrationDate: "2012/09/01",
    cancellationDate: "2025/07/03",
  },
  {
    id: 21,
    size: "소형",
    number: "333가 2222",
    registrationDate: "2004/06/17",
    cancellationDate: "N",
  },
  {
    id: 22,
    size: "대형",
    number: "111가 0000",
    registrationDate: "2013/02/12",
    cancellationDate: "N",
  },
  {
    id: 23,
    size: "중형",
    number: "666가 5555",
    registrationDate: "2001/10/23",
    cancellationDate: "N",
  },
  {
    id: 24,
    size: "소형",
    number: "777가 6666",
    registrationDate: "2007/11/29",
    cancellationDate: "N",
  },
  {
    id: 25,
    size: "대형",
    number: "888가 7777",
    registrationDate: "2002/03/18",
    cancellationDate: "N",
  },
  {
    id: 26,
    size: "중형",
    number: "199누 0001",
    registrationDate: "2009/05/10",
    cancellationDate: "N",
  },
  {
    id: 27,
    size: "소형",
    number: "200러 0002",
    registrationDate: "2008/07/24",
    cancellationDate: "N",
  },
  {
    id: 28,
    size: "대형",
    number: "201가 0003",
    registrationDate: "2006/09/19",
    cancellationDate: "2023/10/05",
  },
  {
    id: 29,
    size: "중형",
    number: "202이 0004",
    registrationDate: "2018/01/13",
    cancellationDate: "N",
  },
  {
    id: 30,
    size: "소형",
    number: "203구 0005",
    registrationDate: "2011/11/22",
    cancellationDate: "N",
  },
  {
    id: 31,
    size: "대형",
    number: "204누 0006",
    registrationDate: "2003/07/27",
    cancellationDate: "2025/03/18",
  },
  {
    id: 32,
    size: "중형",
    number: "205러 0007",
    registrationDate: "2017/06/15",
    cancellationDate: "N",
  },
  {
    id: 33,
    size: "소형",
    number: "206가 0008",
    registrationDate: "2005/02/11",
    cancellationDate: "N",
  },
  {
    id: 34,
    size: "대형",
    number: "207이 0009",
    registrationDate: "2019/08/29",
    cancellationDate: "2024/12/12",
  },
  {
    id: 35,
    size: "중형",
    number: "208구 0010",
    registrationDate: "2020/03/10",
    cancellationDate: "N",
  },
  {
    id: 36,
    size: "소형",
    number: "209누 0011",
    registrationDate: "2014/04/18",
    cancellationDate: "N",
  },
  {
    id: 37,
    size: "대형",
    number: "210러 0012",
    registrationDate: "2016/05/07",
    cancellationDate: "N",
  },
  {
    id: 38,
    size: "중형",
    number: "211가 0013",
    registrationDate: "2001/12/20",
    cancellationDate: "N",
  },
  {
    id: 39,
    size: "소형",
    number: "212이 0014",
    registrationDate: "2015/07/30",
    cancellationDate: "N",
  },
  {
    id: 40,
    size: "대형",
    number: "213구 0015",
    registrationDate: "2004/10/04",
    cancellationDate: "N",
  },
  {
    id: 41,
    size: "중형",
    number: "214누 0016",
    registrationDate: "2002/08/16",
    cancellationDate: "2024/01/19",
  },
  {
    id: 42,
    size: "소형",
    number: "215러 0017",
    registrationDate: "2003/03/12",
    cancellationDate: "N",
  },
  {
    id: 43,
    size: "대형",
    number: "216가 0018",
    registrationDate: "2010/06/21",
    cancellationDate: "N",
  },
  {
    id: 44,
    size: "중형",
    number: "217이 0019",
    registrationDate: "2009/04/25",
    cancellationDate: "N",
  },
  {
    id: 45,
    size: "소형",
    number: "218구 0020",
    registrationDate: "2012/12/05",
    cancellationDate: "N",
  },
  {
    id: 46,
    size: "대형",
    number: "219누 0021",
    registrationDate: "2018/08/18",
    cancellationDate: "N",
  },
  {
    id: 47,
    size: "중형",
    number: "220러 0022",
    registrationDate: "2013/11/13",
    cancellationDate: "N",
  },
  {
    id: 48,
    size: "소형",
    number: "221가 0023",
    registrationDate: "2019/09/22",
    cancellationDate: "N",
  },
  {
    id: 49,
    size: "대형",
    number: "222이 0024",
    registrationDate: "2017/03/17",
    cancellationDate: "N",
  },
  {
    id: 50,
    size: "중형",
    number: "223구 0025",
    registrationDate: "2016/01/20",
    cancellationDate: "2024/11/10",
  },
  {
    id: 51,
    size: "소형",
    number: "224누 0026",
    registrationDate: "2000/10/31",
    cancellationDate: "N",
  },
  {
    id: 52,
    size: "대형",
    number: "225러 0027",
    registrationDate: "2014/05/14",
    cancellationDate: "N",
  },
  {
    id: 53,
    size: "중형",
    number: "226가 0028",
    registrationDate: "2015/07/19",
    cancellationDate: "N",
  },
  {
    id: 54,
    size: "소형",
    number: "227이 0029",
    registrationDate: "2018/02/11",
    cancellationDate: "N",
  },
  {
    id: 55,
    size: "대형",
    number: "228구 0030",
    registrationDate: "2011/12/24",
    cancellationDate: "N",
  },
  {
    id: 56,
    size: "중형",
    number: "229누 0031",
    registrationDate: "2007/08/08",
    cancellationDate: "N",
  },
  {
    id: 57,
    size: "소형",
    number: "230러 0032",
    registrationDate: "2016/10/17",
    cancellationDate: "N",
  },
  {
    id: 58,
    size: "대형",
    number: "231가 0033",
    registrationDate: "2013/04/12",
    cancellationDate: "N",
  },
  {
    id: 59,
    size: "중형",
    number: "232이 0034",
    registrationDate: "2017/05/26",
    cancellationDate: "N",
  },
  {
    id: 60,
    size: "소형",
    number: "233구 0035",
    registrationDate: "2009/03/15",
    cancellationDate: "N",
  },
  {
    id: 61,
    size: "대형",
    number: "234누 0036",
    registrationDate: "2005/11/29",
    cancellationDate: "N",
  },
  {
    id: 62,
    size: "중형",
    number: "235러 0037",
    registrationDate: "2019/01/07",
    cancellationDate: "N",
  },
  {
    id: 63,
    size: "소형",
    number: "236가 0038",
    registrationDate: "2006/06/18",
    cancellationDate: "N",
  },
  {
    id: 64,
    size: "대형",
    number: "237이 0039",
    registrationDate: "2014/07/14",
    cancellationDate: "N",
  },
  {
    id: 65,
    size: "중형",
    number: "238구 0040",
    registrationDate: "2003/08/09",
    cancellationDate: "N",
  },
  {
    id: 66,
    size: "소형",
    number: "239누 0041",
    registrationDate: "2012/12/21",
    cancellationDate: "N",
  },
  {
    id: 67,
    size: "대형",
    number: "240러 0042",
    registrationDate: "2015/09/25",
    cancellationDate: "N",
  },
  {
    id: 68,
    size: "중형",
    number: "241가 0043",
    registrationDate: "2001/02/28",
    cancellationDate: "N",
  },
  {
    id: 69,
    size: "소형",
    number: "242이 0044",
    registrationDate: "2003/03/15",
    cancellationDate: "N",
  },
  {
    id: 70,
    size: "대형",
    number: "243구 0045",
    registrationDate: "2019/04/08",
    cancellationDate: "N",
  },
  {
    id: 71,
    size: "중형",
    number: "244누 0046",
    registrationDate: "2017/10/29",
    cancellationDate: "N",
  },
  {
    id: 72,
    size: "소형",
    number: "245러 0047",
    registrationDate: "2010/06/20",
    cancellationDate: "N",
  },
  {
    id: 73,
    size: "대형",
    number: "246가 0048",
    registrationDate: "2011/07/22",
    cancellationDate: "N",
  },
  {
    id: 74,
    size: "중형",
    number: "247이 0049",
    registrationDate: "2008/12/03",
    cancellationDate: "N",
  },
  {
    id: 75,
    size: "소형",
    number: "248구 0050",
    registrationDate: "2016/03/17",
    cancellationDate: "N",
  },
];

function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const itemsPerPage = 5;
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
        <div className="title">회원 목록</div>
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
            {currentItems.map((item) => (
              <tr key={item.id} onClick={handleRowClick}>
                <td>{item.id}</td>
                <td>{item.size}</td>
                <td>{item.number}</td>
                <td>{item.registrationDate}</td>
                <td>{item.cancellationDate}</td>
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
