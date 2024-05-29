import { useEffect, useRef, useState } from "react";

import "../styles/map.css";

const Map = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const mapInstance = useRef(null);
  const attemptCountRef = useRef(0); // 시도 횟수를 추적하는 ref
  const [myLocation, setMyLocation] = useState({});

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true,
      });
    }
  };

  useEffect(() => {
    getLocation(); // 컴포넌트 마운트 시 위치 정보 요청
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
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [mapElement, myLocation]);

  function success(position) {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    attemptCountRef.current = 0; // 성공 시 시도 횟수 초기화
  }

  function error() {
    if (attemptCountRef.current < 3) {
      // 최대 3번까지 재시도
      attemptCountRef.current += 1;
      getLocation(); // 위치 정보 재요청
    } else {
      console.error("위치 정보를 가져오는 데 실패했습니다.");
    }
  }

  return (
    <div className="map-container">
      <div ref={mapElement} className="custom-map" />
    </div>
  );
};

export default Map;
