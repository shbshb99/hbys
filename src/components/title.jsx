import React from "react";
import styled from "styled-components";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config.js";
import GroovePaper from "../assets/GroovePaper.png"; // GroovePaper 임포트 유지
import Backgroundphoto from "../assets/Backgroundphoto.jpg"; // 배경 사진 임포트

// --- Styled-components 정의 ---

// 전체 레이아웃 컨테이너
// 사진이 배경으로 전체를 채우도록 설정합니다.
const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 화면 전체 높이를 차지하도록 (뷰포트 높이 100%) */
  overflow: hidden; /* 내용이 넘치면 숨김 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 타이틀 텍스트를 감싸는 래퍼
const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 15%;
  position: relative; /* 텍스트가 배경 이미지 위에 오도록 */
  z-index: 1; /* 배경 이미지보다 위에 렌더링 */
  /* 배경 사진 위에 글자가 더 잘 보이도록 글자색과 그림자 조정 */
  color: white; /* 텍스트 색상을 흰색으로 변경 */
`;

// 배경 이미지 컴포넌트
const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 부모 영역을 꽉 채우되 비율 유지 */
  position: absolute; /* Layout 내에서 절대 위치 */
  top: 0;
  left: 0;
  z-index: 0; /* 다른 콘텐츠 뒤로 보내기 */
`;

// 기존 폰트 사이즈 및 opacity 유지 (사용자님 제공 코드)
const WeddingInvitation = styled.p`
  font-size: 0.825rem;
  opacity: 0.45;
  margin-bottom: 16px;
`;

const GroomBride = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 16px;
  font-weight: 600;
  text-shadow: 1px 1px 4px rgba(0, 0, 0,0.7); /* 그림자를 더 진하게 하여 가독성 높임 */
`;

const Schedule = styled.p`
  font-size: 1.rem;
  color: white; /* 텍스트 색상을 흰색으로 변경 */
  text-align: center;
  position: absolute; /* Layout을 기준으로 절대 위치 지정 */
  bottom: 5%; /* 하단에서 50px 위로 배치 */
  width: 100%; /* 너비를 100%로 설정하여 가운데 정렬 유지 */
  z-index: 1; /* 다른 콘텐츠 위에 오도록 설정 */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); /* 그림자를 더 진하게 하여 가독성 높임 */
  font-weight: 600;
`;

const CenterText = styled.p`
  font-size: 3rem;
  color: white; /* 텍스트 색상을 흰색으로 변경 */
  text-align: center;
  position: absolute; /* Layout을 기준으로 절대 위치 지정 */
  bottom: 20%; /* 하단에서 50px 위로 배치 */
  width: 100%; /* 너비를 100%로 설정하여 가운데 정렬 유지 */
  z-index: 1; /* 다른 콘텐츠 위에 오도록 설정 */
  font-family: "Ephesis-Regular";
  font-weight: 500;
  // text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); /* 그림자를 더 진하게 하여 가독성 높임 */
`;

// --- Title 컴포넌트 ---
const Title = () => {
  return (
    <Layout>
      <TitleWrapper>
        <GroomBride>
          {GROOM_NAME} &#38; {BRIDE_NAME}
        </GroomBride>
      </TitleWrapper>
      <ImageBackground src={Backgroundphoto} alt="Background Photo" />
      <CenterText>
        We are getting married!
      </CenterText>
        <Schedule>
          {WEDDING_DATE} <br />
          {WEDDING_LOCATION}
        </Schedule>
    </Layout>
  );
};

export default Title;

