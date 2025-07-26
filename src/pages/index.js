import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import "antd/dist/antd.css";
import Gallery from "../components/gallery";
import Greeting from "../components/greeting";
import Title from "../components/title";
import "../styles/index.css";

import GroovePaper from "../assets/GroovePaper.png";
import Location from "../components/location";
import CongratulatoryMoney from "../components/congratulatoryMoney";
import Share from "../components/share";
import Quote from "../components/quote";
import Song from "../assets/song.mp3";
import LoadingScreen from "../components/loadingScreen"; 

import AOS from "aos";
import "aos/dist/aos.css";

import { FullPage, Slide } from 'react-full-page';

// markup
const { Footer } = Layout;

const Wrapper = styled.div`
  background: #efebe9;
  background-image: url(${GroovePaper});
`;

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5초 후에 로딩 화면을 숨깁니다. (시간은 조절 가능)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <FullPage>
      <audio autoPlay loop>
        <source src={Song} />
      </audio>
      <Slide>
        <Title />
      </Slide>
      <Slide>
        <Greeting />
        <Quote />
      </Slide>
      <Slide>
        <Gallery />
      </Slide>
      <Slide>
        <Location />
      </Slide>
      <Slide>
        <CongratulatoryMoney />
        <Share />
      </Slide>
    </FullPage>
  );
};

export default IndexPage;