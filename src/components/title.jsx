import React from "react";
import styled from "styled-components";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config.js";
// BackgroundVideo는 이 파일에서 사용되지 않으므로 제거했습니다.
import GroovePaper from "../assets/GroovePaper.png"; // GroovePaper 임포트 유지
import Backgroundphoto from "../assets/Backgroundphoto.png"; // 배경 사진 임포트

// --- Styled-components 정의 ---

// 전체 레이아웃 컨테이너
// 사진이 배경으로 전체를 채우도록 설정합니다.
const Layout = styled.div`
  position: relative; /* ImageBackground가 absolute로 위치할 기준점 */
  width: 100%;
  height: 100vh; /* 화면 전체 높이를 차지하도록 (뷰포트 높이 100%) */
  overflow: hidden; /* 내용이 넘치면 숨김 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 텍스트 콘텐츠를 수직/수평 중앙에 배치 */
  /* background-color: #f0f0f0;  배경 이미지가 로드되기 전을 위한 기본색 (필요시 사용) */
`;

// 타이틀 텍스트를 감싸는 래퍼
const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 42px;
  font-weight: 500 !important;
  color: var(--title-color); /* 기존 색상 변수 사용 */
  animation: fadein 3s; /* 기존 애니메이션 유지 */
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */
  position: relative; /* 텍스트가 배경 이미지 위에 오도록 */
  z-index: 1; /* 배경 이미지보다 위에 렌더링 */
  /* 배경 사진 위에 글자가 더 잘 보이도록 글자색과 그림자 조정 */
  color: white; /* 텍스트 색상을 흰색으로 변경 */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); /* 그림자를 더 진하게 하여 가독성 높임 */
`;

// 배경 이미지 컴포넌트
const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 부모 영역을 꽉 채우되 비율 유지 */
  position: absolute; /* Layout 내에서 절대 위치 */
  top: 0;
  left: 0;
  z-index: -1; /* 다른 콘텐츠 뒤로 보내기 */
`;

// 기존 폰트 사이즈 및 opacity 유지 (사용자님 제공 코드)
const WeddingInvitation = styled.p`
  font-size: 0.825rem;
  opacity: 0.45;
  margin-bottom: 16px;
`;

const GroomBride = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 16px;
`;

const Schedule = styled.p`
  font-size: 1.06rem;
  opacity: 0.65;
  margin-bottom: 24px;
`;

// --- Title 컴포넌트 ---
const Title = () => {
  return (
    <Layout>
      <TitleWrapper>
        <WeddingInvitation>WEDDING INVITATION</WeddingInvitation>
        <GroomBride>
          {GROOM_NAME} &#38; {BRIDE_NAME}
        </GroomBride>
        <Schedule>
          {WEDDING_DATE} <br />
          {WEDDING_LOCATION}
        </Schedule>
      </TitleWrapper>
      {/* Backgroundphoto.png 파일을 src로 사용하여 배경 이미지 렌더링 */}
      <ImageBackground src={Backgroundphoto} alt="Background Photo" />
    </Layout>
  );
};

export default Title;

