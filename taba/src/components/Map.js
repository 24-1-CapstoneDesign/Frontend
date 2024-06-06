import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

import "../styles/map.css";

import PositiveMarker from "./PositiveMarker";
import NegativeMarker from "./NegativeMarker";

const Map = () => {
  const mapElement = useRef(null);
  const { naver } = window;
  const attemptCountRef = useRef(0);
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
    getLocation();
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
  }, [mapElement, myLocation]);

  function success(position) {
    setMyLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    attemptCountRef.current = 0;
  }

  function error() {
    if (attemptCountRef.current < 3) {
      attemptCountRef.current += 1;
      getLocation();
    } else {
      console.error("위치 정보를 가져오는 데 실패했습니다.");
    }
  }

  const createMarkerList = [];
  const [newMap, setNewMap] = useState(null);

  const totalDataArray = [
    [1, "test1", 37.3595704, 127.105399],
    [2, "test2", myLocation.latitude, myLocation.longitude],
    [3, "test3", 39.3595704, 135.105399],
    [4, "test4", 40.3595704, 135.105399],
    [5, "test5", 41.3595704, 135.105399],
    [6, "test6", 42.3595704, 135.105399],
  ];

  const addMarkers = () => {
    if (!newMap) return;
    for (let i = 0; i < totalDataArray.length; i++) {
      let [id, name, lat, lng] = totalDataArray[i];
      addMarker(id, name, lat, lng);
    }
  };

  // 기존 addMarker 함수 내에서 마커 생성 부분을 수정합니다.
  const addMarker = (id, name, lat, lng) => {
    try {
      // if 해결됐으면
      const markerHtml = ReactDOMServer.renderToString(
        <PositiveMarker id={id} />
      );
      // else: // 해결 안됐으면
      // const markerHtml = ReactDOMServer.renderToString(
      //   <NegativeMarker id={id} />
      // );

      let newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: newMap,
        title: name,
        clickable: true,
        icon: {
          content: markerHtml, // React 컴포넌트를 문자열로 변환하여 여기에 설정
          size: new naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(11, 35),
        },
      });
      newMarker.setTitle(name);
      createMarkerList.push(newMarker);

      // naver.maps.Event.addListener(newMarker, "click", () =>
      //   markerClickHandler(id)
      // );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (newMap) {
      addMarkers(); // 수정: newMap이 설정된 후 마커를 추가합니다.
      const MoveEventListner = naver.maps.Event.addListener(
        newMap,
        "idle",
        idleHandler
      );
      return () => {
        naver.maps.Event.removeListener(MoveEventListner);
      };
    }
  }, [newMap]);

  const idleHandler = () => {
    updateMarkers(newMap, createMarkerList);
  };

  const updateMarkers = (map, markers) => {
    if (!map) return;
    let mapBounds = map.getBounds();
    let marker, position;

    for (let i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();

      if (mapBounds.hasPoint(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(marker);
      }
    }
  };

  const showMarker = (map, marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };

  const hideMarker = (marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
  };

  const navigate = useNavigate();

  // //마커를 클릭했을 때 실행할 이벤트 핸들러
  // const markerClickHandler = (id) => {
  //   navigate(`/ground/${id}`);
  // };

  return (
    <div className="map-container">
      <div ref={mapElement} className="custom-map" />
    </div>
  );
};

export default Map;
