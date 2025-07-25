import React, { useEffect, useRef, useCallback } from "react"; // useRef 추가
import { Divider, Button, message } from "antd";
import styled from "styled-components";
import Flower from "../assets/flower2.png";
import CopyToClipboard from "react-copy-to-clipboard";

// Wrapper: FullPage.Slide의 높이를 채우고 내부 콘텐츠를 flex로 관리
const Wrapper = styled.div`
  padding-top: 42px; /* 상단 여백 유지 */
  width: 95%;
  margin: 0 auto;
  
  height: 100%; /* ✨ 부모(FullPage.Slide)의 높이를 100% 채우도록 설정 */
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 가운데 정렬 (width: 95%인 상태에서 내부 콘텐츠 정렬) */
  box-sizing: border-box; /* padding이 height 계산에 포함되도록 */
`;

const Title = styled.span`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 15px;
  flex-shrink: 0; /* 이미지는 줄어들지 않도록 */
`;

// Content: 스크롤될 실제 내용 (이 영역은 FullPage 스크롤과 연동)
const Content = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.75;
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;

  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
  overflow-y: auto; /* 이 영역에 스크롤바가 생기도록 (PC 휠 스크롤용) */
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */
  box-sizing: border-box;
`;

const Map = styled.div`
  width: 100%;
  padding: 0;
  height: 360px; /* 지도 렌더링을 위한 고정 높이 */
  position: relative;
  flex-shrink: 0; /* 지도는 줄어들지 않도록 */
  overflow: hidden; /* 지도 컨테이너 자체의 불필요한 스크롤바 방지 */
`;

const MapOverlayButton = styled.a`
  position: absolute;
  bottom: 5px;
  left: 5px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white !important;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const CopyButton = styled(Button)`
  font-size: 0.9rem;
  color: #565656ff;
  font-weight: 600;
`;

const Location = () => {
  const MAP_CONTAINER_ID = "daumRoughmapContainer1753177339390";
  const MAP_TIMESTAMP = "1753177339390";
  const MAP_KEY = "5ouqucras9i";
  const MAP_DESTINATION_ADDRESS = "서울 강동구 천호대로 1102"; 

  const mapRef = useRef(null); // 지도 DOM 요소를 참조하기 위한 ref 추가

  const handleCopySuccess = () => {
    message.success("주소가 복사되었습니다.");
  };

  const executeScript = useCallback(() => {
    if (window.daum && window.daum.roughmap && window.daum.roughmap.Lander) {
      new window.daum.roughmap.Lander({
        timestamp: MAP_TIMESTAMP,
        key: MAP_KEY,
        mapWidth: "640",
        mapHeight: "360",
      }).render();
    }
  }, [MAP_TIMESTAMP, MAP_KEY]);

  const InstallScript = useCallback(() => {
    if (window.daum && window.daum.roughmap && window.daum.roughmap.cdn) {
      executeScript();
      return;
    }
    const c = window.location.protocol === "https:" ? "https:" : "http:";
    const a = "16137cec";

    window.daum = window.daum || {};
    window.daum.roughmap = {
      cdn: a,
      URL_KEY_DATA_LOAD_PRE: c + "//t1.daumcdn.net/roughmap/",
      url_protocal: c,
    };
    const b = c + "//t1.daumcdn.net/kakaomapweb/place/jscss/roughmap/" + a + "/roughmapLander.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = b;
    scriptTag.async = true;
    scriptTag.charset = "utf-8";
    
    scriptTag.onload = () => {
      executeScript();
    };
    scriptTag.onerror = (error) => {
      console.error("카카오맵 스크립트 로드 실패:", error);
    };

    document.body.appendChild(scriptTag);
  }, [executeScript]);

  useEffect(() => {
    InstallScript();

    const mapElement = mapRef.current; // 지도 DOM 요소 참조
    if (mapElement) {
      // ✨ 지도 영역 내에서 발생하는 모든 이벤트의 전파를 막습니다. ✨
      // 이렇게 하면 FullPage가 이 영역 내의 스크롤/터치/클릭에 반응하지 않게 됩니다.
      // 지도의 기능(드래그, 확대/축소 등)은 카카오맵 자체적으로 처리하려 시도합니다.
      // 하지만 roughmap의 한계로 지도 드래그/스크롤이 안 될 수 있습니다.

      const preventFullPageScroll = (e) => {
        // e.stopPropagation()만 사용하고 e.preventDefault()는 사용하지 않습니다.
        // e.preventDefault()를 사용하면 지도 자체의 스크롤/드래그가 막힙니다.
        e.stopPropagation(); 
      };

      // 마우스/터치 다운 이벤트 (클릭/드래그 시작 시)
      mapElement.addEventListener('pointerdown', preventFullPageScroll, { passive: false });
      // 마우스 휠 이벤트 (확대/축소 시도)
      mapElement.addEventListener('wheel', preventFullPageScroll, { passive: false });
      // 터치 이동 이벤트 (드래그/핀치 줌 시도)
      mapElement.addEventListener('touchmove', preventFullPageScroll, { passive: false });
      
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        mapElement.removeEventListener('pointerdown', preventFullPageScroll);
        mapElement.removeEventListener('wheel', preventFullPageScroll);
        mapElement.removeEventListener('touchmove', preventFullPageScroll);
      };
    }
  }, [InstallScript]);

  const createKakaoMapLink = () => {
    const encodedAddress = encodeURIComponent(MAP_DESTINATION_ADDRESS);
    return `https://map.kakao.com/link/search/${encodedAddress}`;
  };

  return (
    <Wrapper>
      <Divider plain style={{ marginTop: 0, marginBottom: 10 }}>
        <Title>오시는 길</Title>
      </Divider>
      <Image src={Flower} />
      <Map
        ref={mapRef} // ✨ Map styled-component에 ref 연결 ✨
        id={MAP_CONTAINER_ID}
        className="root_daum_roughmap root_daum_roughmap_landing"
      >
        <MapOverlayButton
          href={createKakaoMapLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up"
        >
          길찾기
        </MapOverlayButton>
      </Map>
      <Content>
        <CopyToClipboard text={MAP_DESTINATION_ADDRESS} onCopy={handleCopySuccess}>
          <CopyButton type="text">
            {MAP_DESTINATION_ADDRESS}
          </CopyButton>
        </CopyToClipboard><br/>
        <Title style={{color:'#000000'}}>KDW웨딩홀 2층 마이더스홀</Title>
        <br />
        <br />
        <Title>대중교통 이용시</Title>
        <br />
        지하철 : 5호선 강동역 하차 3번출구 바로 앞
        <br />
        버스 : 강동역(중) 정류장 하차
        <br />
        <br />
        <Title>자가용 이용시</Title>
        <br />
        주차장 안내 : 건물 내 (지하 1층 ~ 지하 3층)
        <br />
        옥외 주차장 및 지하철 환승 주차장 이용
      </Content>
    </Wrapper>
  );
};

export default Location;