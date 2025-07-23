import React from "react";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";

// 이미지 파일 import (기존 코드와 동일)
import GalleryPhoto1 from "../assets/1.jpg";
import GalleryPhoto2 from "../assets/2.jpg";
import GalleryPhoto3 from "../assets/3.jpg";
import GalleryPhoto4 from "../assets/4.jpg";
import GalleryPhoto5 from "../assets/5.jpg";
import GalleryPhoto6 from "../assets/6.jpg";
import GalleryPhoto7 from "../assets/7.jpg";
import GalleryPhoto8 from "../assets/8.jpg";
import GalleryPhoto9 from "../assets/9.jpg";
import GalleryPhoto10 from "../assets/10.jpg";
import GalleryPhoto11 from "../assets/11.jpg";
import GalleryPhoto12 from "../assets/12.jpg";
import GalleryPhoto13 from "../assets/13.jpg";
import GalleryPhoto14 from "../assets/14.jpg";

// 스타일드 컴포넌트 (기존 코드와 동일)
const Wrapper = styled.div`
  padding-top: 42px;
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

// 이미지 데이터 (기존 코드와 동일)
const images = [
  {
    original: GalleryPhoto1,
    thumbnail: GalleryPhoto1,
  },
  {
    original: GalleryPhoto2,
    thumbnail: GalleryPhoto2,
  },
  {
    original: GalleryPhoto3,
    thumbnail: GalleryPhoto3,
  },
  {
    original: GalleryPhoto4,
    thumbnail: GalleryPhoto4,
  },
  {
    original: GalleryPhoto5,
    thumbnail: GalleryPhoto5,
  },
  { // 이 부분에 오류가 있었습니다. 이전 코드에서 { original: GalleryPhoto5, thumbnail: GalleryPhoto5, original: GalleryPhoto6, ... } 형태로 중복되어 있었으므로, GalleryPhoto5 이후부터 다시 시작합니다.
    original: GalleryPhoto6,
    thumbnail: GalleryPhoto6,
  },
  {
    original: GalleryPhoto7,
    thumbnail: GalleryPhoto7,
  },
  {
    original: GalleryPhoto8,
    thumbnail: GalleryPhoto8,
  },
  {
    original: GalleryPhoto9,
    thumbnail: GalleryPhoto9,
  },
  {
    original: GalleryPhoto10,
    thumbnail: GalleryPhoto10,
  },
  {
    original: GalleryPhoto11,
    thumbnail: GalleryPhoto11,
  },
  {
    original: GalleryPhoto12,
    thumbnail: GalleryPhoto12,
  },
  {
    original: GalleryPhoto13,
    thumbnail: GalleryPhoto13,
  },
  {
    original: GalleryPhoto14,
    thumbnail: GalleryPhoto14,
  },
];

const Gallery = () => {
  // ImageGallery 인스턴스에 대한 ref 생성
  const imageGalleryRef = React.useRef(null);

  // 이미지를 클릭했을 때 전체 화면 토글 함수
  const handleImageClick = () => {
    if (imageGalleryRef.current) {
      // isFullscreen()을 사용하여 현재 전체 화면 모드인지 확인
      if (imageGalleryRef.current.isFullscreen()) {
        imageGalleryRef.current.exitFullScreen(); // 전체 화면 종료
      } else {
        imageGalleryRef.current.fullScreen(); // 전체 화면 시작
      }
    }
  };

  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <ImageGallery
        ref={imageGalleryRef} // ref를 ImageGallery에 연결
        showPlayButton={false}
        // showFullscreenButton={false} // 이 부분을 주석 처리하거나 true로 변경하면 기본 버튼이 나타납니다.
                                    // 이미지를 직접 클릭하여 전체 화면을 제어하므로 버튼은 숨겨도 됩니다.
        items={images}
        onClick={handleImageClick} // 이미지 클릭 시 handleImageClick 함수 호출
        // onScreenChange={this._onScreenChange.bind(this)} // 전체 화면 상태 변화 감지 필요 시 추가
      />
    </Wrapper>
  );
};

export default Gallery;
