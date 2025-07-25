import React, { useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";

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

const Wrapper = styled.div`
  padding-top: 42px;
  width: 95%;
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

const images = [
  { original: GalleryPhoto1, thumbnail: GalleryPhoto1 },
  { original: GalleryPhoto2, thumbnail: GalleryPhoto2 },
  { original: GalleryPhoto3, thumbnail: GalleryPhoto3 },
  { original: GalleryPhoto4, thumbnail: GalleryPhoto4 },
  { original: GalleryPhoto5, thumbnail: GalleryPhoto5 },
  { original: GalleryPhoto6, thumbnail: GalleryPhoto6 },
  { original: GalleryPhoto7, thumbnail: GalleryPhoto7 },
  { original: GalleryPhoto8, thumbnail: GalleryPhoto8 },
  { original: GalleryPhoto9, thumbnail: GalleryPhoto9 },
  { original: GalleryPhoto10, thumbnail: GalleryPhoto10 },
  { original: GalleryPhoto11, thumbnail: GalleryPhoto11 },
  { original: GalleryPhoto12, thumbnail: GalleryPhoto12 },
  { original: GalleryPhoto13, thumbnail: GalleryPhoto13 },
  { original: GalleryPhoto14, thumbnail: GalleryPhoto14 },
];

const Gallery = () => {
  const imageGalleryRef = useRef(null);
  const galleryWrapperRef = useRef(null); // ImageGallery를 감싸는 Wrapper DOM 요소에 대한 ref
  const touchStartX = useRef(0); // 터치 시작 X 좌표 저장
  const touchStartY = useRef(0); // 터치 시작 Y 좌표 저장

  const handleImageClick = () => {
    if (imageGalleryRef.current) {
      if (imageGalleryRef.current.isFullscreen()) {
        imageGalleryRef.current.exitFullScreen();
      } else {
        imageGalleryRef.current.fullScreen();
      }
    }
  };

  useEffect(() => {
    const wrapperElement = galleryWrapperRef.current;

    if (wrapperElement) {
      // 휠 이벤트는 ImageGallery 내에서 항상 사진 슬라이드에만 집중하도록 상위 전파를 막습니다.
      const handleWheel = (e) => {
        e.stopPropagation();
        // e.preventDefault(); // 휠 스크롤 자체가 ImageGallery 내에서 사진 전환에만 사용되도록 막을 수 있습니다.
      };

      // 터치 시작 시 좌표 저장
      const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        // passive: false가 설정되어 있으므로, 초기 터치에서도 기본 동작을 막을 수 있습니다.
      };

      // 터치 이동 시 방향에 따라 이벤트 전파 제어
      const handleTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const deltaX = currentX - touchStartX.current;
        const deltaY = currentY - touchStartY.current;

        // 이동량의 절댓값을 비교하여 주된 이동 방향을 판단합니다.
        // 수평 이동(deltaX)이 수직 이동(deltaY)보다 큰 경우 (좌우 스와이프)
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // 이벤트를 ImageGallery로 전달하여 좌우 슬라이드가 작동하게 합니다.
          // 이 때 FullPage로의 전파를 막아 수직 스크롤이 발생하지 않도록 합니다.
          e.stopPropagation();
          // 브라우저의 기본 스크롤 동작도 막아야 FullPage가 반응하지 않습니다.
          e.preventDefault();
        } else {
          // 수직 이동이 수평 이동보다 크거나 같은 경우 (위아래 스크롤)
          // 이벤트를 상위로 전파시켜 FullPage가 페이지 전환을 처리하도록 허용합니다.
          // e.stopPropagation()과 e.preventDefault()를 호출하지 않습니다.
        }
      };

      // 이벤트 리스너 추가
      // passive: false는 이벤트 핸들러 내에서 preventDefault()를 호출할 수 있도록 허용합니다.
      wrapperElement.addEventListener('wheel', handleWheel, { passive: false });
      wrapperElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      wrapperElement.addEventListener('touchmove', handleTouchMove, { passive: false });

      // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
      return () => {
        wrapperElement.removeEventListener('wheel', handleWheel);
        wrapperElement.removeEventListener('touchstart', handleTouchStart);
        wrapperElement.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <Wrapper ref={galleryWrapperRef}>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <ImageGallery
        ref={imageGalleryRef}
        showPlayButton={false}
        showFullscreenButton={true}
        autoPlay={true}
        items={images}
      />
    </Wrapper>
  );
};

export default Gallery;