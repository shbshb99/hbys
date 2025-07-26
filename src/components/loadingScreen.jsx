import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

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
  margin-top: 24px;
  font-size: 1rem;
  color: #5d5d5d;
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