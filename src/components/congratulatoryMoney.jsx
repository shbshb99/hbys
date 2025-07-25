import React from "react"; // useState 더 이상 필요 없음
import { Button, Divider, message } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons"; // 이 아이콘들은 더 이상 사용되지 않지만, 다른 곳에서 사용될 수 있으므로 일단 유지합니다.
import styled from "styled-components";
import CopyToClipboard from "react-copy-to-clipboard";
import Flower from "../assets/flower3.png";
import {
  GROOM_NAME,
  GROOM_ACCOUNT_NUMBER,
  GROOM_FATHER_NAME,
  GROOM_FATHER_ACCOUNT_NUMBER,
  GROOM_MOTHER_NAME,
  GROOM_MOTHER_ACCOUNT_NUMBER,
  BRIDE_NAME,
  BRIDE_ACCOUNT_NUMBER,
  BRIDE_FATHER_NAME,
  BRIDE_FATHER_ACCOUNT_NUMBER,
  BRIDE_MOTHER_NAME,
  BRIDE_MOTHER_ACCOUNT_NUMBER,
} from "../../config";

const Wrapper = styled.div`
  padding-top: 42px;
  padding-bottom: 18px;
  width: 95%;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  width: 70%;
`;

const Content = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.75;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.65;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 10px;
`;

// 계좌 정보를 표시할 스타일 컴포넌트는 유지합니다.
const AccountInfoContainer = styled.div`
  margin-top: 24px; /* 기존 버튼 영역과의 간격 */
  padding: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  margin-bottom: 10px; /* 각 계좌 컨테이너 하단 간격 */
`;

const AccountEntry = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountName = styled.b`
  font-size: 0.9rem;
  margin-right: 8px;
  min-width: 60px;
  text-align: right;
`;

const CopyButton = styled(Button)`
  padding: 0;
  margin: 0 0 0 8px;
  font-size: 0.875rem;
  color: #1890ff;
`;


const CongratulatoryMoney = () => {
  // useState 더 이상 필요 없으므로 제거
  // const [activeAccount, setActiveAccount] = useState('none'); 

  const handleCopySuccess = () => {
    message.success("계좌번호가 복사되었습니다.");
  };

  return (
    <Wrapper>
      <Divider
        data-aos="fade-up"
        plain
        style={{ marginTop: 0, marginBottom: 10, width: '70%' }}
      >
        <Title>축하의 마음을 전하세요</Title>
      </Divider>
      <Image src={Flower} />
      <Content data-aos="fade-up">
        축하의 마음을 담아 축의금을 전달해 보세요.
      </Content>

      {/* ✨ 신랑측 계좌 정보 항상 표시 ✨ */}
      <AccountInfoContainer data-aos="fade-up">
        <h3 style={{ color: 'var(--title-color)', marginBottom: '20px' }}>신랑측 계좌번호</h3>
        <AccountEntry>
          <AccountName>부 : {GROOM_FATHER_NAME}</AccountName>
          <CopyToClipboard text={GROOM_FATHER_ACCOUNT_NUMBER} onCopy={handleCopySuccess}>
            <CopyButton type="text">
              {GROOM_FATHER_ACCOUNT_NUMBER}
            </CopyButton>
          </CopyToClipboard>
        </AccountEntry>
        {GROOM_MOTHER_ACCOUNT_NUMBER && GROOM_MOTHER_NAME && ( // config에 모친 정보가 있을 때만 표시
          <AccountEntry>
            <AccountName>모 : {GROOM_MOTHER_NAME}</AccountName>
            <CopyToClipboard text={GROOM_MOTHER_ACCOUNT_NUMBER} onCopy={handleCopySuccess}>
              <CopyButton type="text">
                {GROOM_MOTHER_ACCOUNT_NUMBER}
              </CopyButton>
            </CopyToClipboard>
          </AccountEntry>
        )}
        <AccountEntry>
          <AccountName>신랑 : {GROOM_NAME}</AccountName>
          <CopyToClipboard text={GROOM_ACCOUNT_NUMBER} onCopy={handleCopySuccess}>
            <CopyButton type="text">
              {GROOM_ACCOUNT_NUMBER}
            </CopyButton>
          </CopyToClipboard>
        </AccountEntry>
      </AccountInfoContainer>

      {/* ✨ 신부측 계좌 정보 항상 표시 ✨ */}
      <AccountInfoContainer data-aos="fade-up">
        <h3 style={{ color: 'var(--title-color)', marginBottom: '20px' }}>신부측 계좌번호</h3>
          <AccountEntry>
            <AccountName>모 : {BRIDE_MOTHER_NAME}</AccountName>
            <CopyToClipboard text={BRIDE_MOTHER_ACCOUNT_NUMBER} onCopy={handleCopySuccess}>
              <CopyButton type="text">
                {BRIDE_MOTHER_ACCOUNT_NUMBER}
              </CopyButton>
            </CopyToClipboard>
          </AccountEntry>
        <AccountEntry>
          <AccountName>신부 : {BRIDE_NAME}</AccountName>
          <CopyToClipboard text={BRIDE_ACCOUNT_NUMBER} onCopy={handleCopySuccess}>
            <CopyButton type="text">
              {BRIDE_ACCOUNT_NUMBER}
            </CopyButton>
          </CopyToClipboard>
        </AccountEntry>
      </AccountInfoContainer>
        <Description>
          계좌번호 클릭시 복사됩니다.
        </Description>
    </Wrapper>
  );
};

export default CongratulatoryMoney;