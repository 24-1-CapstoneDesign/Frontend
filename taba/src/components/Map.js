import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { LocationData } from "../services/LocationService";

import "../styles/map.css";

import PositiveMarker from "./PositiveMarker";
import NegativeMarker from "./NegativeMarker";

const Map = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const attemptCountRef = useRef(0);
  const [myLocation, setMyLocation] = useState({});
  const [ErrorLocation, setErrorLocation] = useState([]);
  const [newMap, setNewMap] = useState(null);
  const [createMarkerList, setCreateMarkerList] = useState([]); // 상태로 관리

  useEffect(() => {
    getLocation();
    GetErrorLocation();
    const intervalId = setInterval(() => {
      GetErrorLocation();
    }, 10000); // 10초마다 데이터 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    setNewMap(map);
  }, [mapElement, myLocation, naver]);

  useEffect(() => {
    if (newMap) {
      const MoveEventListner = naver.maps.Event.addListener(
        newMap,
        "idle",
        idleHandler
      );
      return () => {
        naver.maps.Event.removeListener(MoveEventListner);
        setCreateMarkerList([]); // 컴포넌트 unmount 시 배열 초기화
      };
    }
  }, [newMap]);

  useEffect(() => {
    if (newMap) {
      addMarkers();
    }
  }, [ErrorLocation, newMap]);

  const GetErrorLocation = () => {
    LocationData()
      .then((response) => {
        if (response.success) {
          const ErrorData = response.data; // 응답에서 사용자 데이터 추출
          setErrorLocation(ErrorData);
        } else {
          alert("Error Location failed.");
        }
      })
      .catch((error) => {
        console.error("Location Error:", error);
      });
  };

  function Position_success(position) {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    attemptCountRef.current = 0;
  }

  function Position_error() {
    if (attemptCountRef.current < 1) {
      attemptCountRef.current += 1;
      getLocation();
    } else {
      console.error("위치 정보를 가져오는 데 실패했습니다.");
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        Position_success,
        Position_error
      );
    }
  };

  const addMarkers = () => {
    if (!newMap) return;

    // 기존 마커 제거
    createMarkerList.forEach((marker) => marker.setMap(null));

    const newMarkerList = []; // 새로운 배열 생성

    ErrorLocation.forEach((location) => {
      let markerHtml;

      if (location.status === "NORMAL") {
        markerHtml = ReactDOMServer.renderToString(
          <PositiveMarker id={location.id} />
        );
      } else {
        markerHtml = ReactDOMServer.renderToString(
          <NegativeMarker id={location.id} />
        );
      }

      const newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(location.latitude, location.longitude),
        map: newMap,
        title: location.car_number,
        clickable: true,
        icon: {
          content: markerHtml,
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35),
        },
      });

      newMarker.setTitle(location.car_number);
      newMarkerList.push(newMarker);
    });

    setCreateMarkerList(newMarkerList); // 새로운 마커 리스트 설정
  };

  const idleHandler = () => {
    updateMarkers(newMap, createMarkerList);
  };

  const updateMarkers = (map, markers) => {
    if (!map) return;
    const mapBounds = map.getBounds();
    markers.forEach((marker) => {
      const position = marker.getPosition();
      if (mapBounds.hasPoint(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(marker);
      }
    });
  };

  const showMarker = (map, marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };

  const hideMarker = (marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
  };

  return (
    <div className="map-container">
      <div ref={mapElement} className="custom-map" />
    </div>
  );
};

export default Map;
