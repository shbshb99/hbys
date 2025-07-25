import React, { useEffect, useCallback } from "react";
import { Divider,Button ,message  } from "antd";
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
  box-sizing: border-box; /* ✨ padding이 height 계산에 포함되도록 */
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
  flex-shrink: 0; /* ✨ 이미지는 줄어들지 않도록 */
`;

// Content: 스크롤될 실제 내용
const Content = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.75;
  width: 100%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;

  flex-grow: 1; /* ✨ 남은 공간을 모두 차지하도록 설정 */
  overflow-y: auto; /* ✨ 이 영역만 스크롤되도록 */
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */
  box-sizing: border-box; /* 패딩 포함 너비 계산 */
`;

const Map = styled.div`
  width: 100%;
  padding: 0;
  height: 360px; /* 지도 렌더링을 위한 고정 높이 */
  position: relative;
  flex-shrink: 0; /* ✨ 지도는 줄어들지 않도록 */
`;

const MapOverlayButton = styled.a`
  position: absolute;
  bottom: 5px;
  right: 5px;
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