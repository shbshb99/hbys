import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #efebe9;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  margin-top: 24px; /* 스피너와의 간격 */
  font-size: 1rem;
  color: #888; /* 너무 튀지 않는 부드러운 회색 */
`;

const customIcon = (
  <LoadingOutlined
    style={{
      fontSize: 48,
      color: "#F4C2C2", 
    }}
    spin
  />
);

const LoadingScreen = () => {
  return (
    <LoaderWrapper>
      <ContentWrapper>
        <Spin indicator={customIcon} />
        <LoadingText>신현범님과 김예손님의 결혼식에 초대합니다.</LoadingText>
      </ContentWrapper>
    </LoaderWrapper>
  );
};

export default LoadingScreen;
