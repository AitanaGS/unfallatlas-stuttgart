'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';
import { COLORS } from '../../utils/constants';

function Header({ chartWidth, layout, chartWidthDomain }) {
  // TODO: css calc margin of titlewrapper
  // TODO: font size responsive
  // TODO: info "Der Unfallatlas enthält Unfälle mit Personenschaden. Unfälle, bei denen nur Sachschaden entsteht, werden nicht dargestellt."
  // TODO: 2016 - 2022
  // console.log('chartwidth', chartWidth);
  // console.log('layout', layout);
  // console.log(chartWidth);

  const titleFontSizeScale = useMemo(() => {
    return scaleLinear().domain(chartWidthDomain).range([1.8, 2.7]);
  }, [chartWidthDomain]);

  return (
    <HeaderWrapper colors={COLORS}>
      <TitleWrapper
        colors={COLORS}
        chartWidth={chartWidth}
        layout={layout}
        titleFontSizeScale={titleFontSizeScale}
      >
        <h1>Unfallatlas Stuttgart</h1>
      </TitleWrapper>
      <IntroText>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua. At vero eos et accusam et
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no
          sea takimata sanctus est Lorem ipsum dolor sit amet.{' '}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua. At vero eos et accusam et
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no
          sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </IntroText>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  /* display: flex;
  flex-direction: column;
  flex-wrap: wrap; */
  /* width: 100%; */
  /* width: ${(props) => props.dashboardWidth}px; */
  /* height: 100%; */
  /* max-width: 600px; // 1000px 500px */
  /* margin: 0 auto; */
  /* position: relative; */
  /* border: 2px solid blue; */
  width: 100%;
  /* h1 {
    /* margin: 30px 0px 20px 0px; */
  /* margin: 30px 0px 20px 0px;
    font-size: 2.8rem;
    background-color: ${(props) => props.colors.yellow.medium}; */
  /* } */
  /* p {
    background-color: rgba(55, 62, 98, 1);
    color: rgba(214, 217, 232, 1);
    padding: 20px;
  } */
`;

const TitleWrapper = styled.div`
  background-color: ${({ colors }) => colors.yellow.medium};
  /* margin: ${(props) => `30px 0px 20px -${props.chartWidth}px`}; */
  margin: ${({ chartWidth, layout }) =>
    layout === 'grid'
      ? `30px 0px 20px -${chartWidth}px`
      : `30px -20px 20px -${chartWidth}px`};
  /* margin: ${(props) =>
    props.layout === 'grid'
      ? `30px 0px 20px -${props.chartWidth}px`
      : `30px 0px 20px -${props.chartWidth}px`}; */
  /* margin: 30px 0px 20px -1000px; */
  /* border-radius: 10px; */
  border-radius: ${({ layout }) =>
    layout === 'grid' ? '10px' : '0px'};
  /* border-radius: 10px; */
  /* padding: 0px 0px 0px 0px; */
  h1 {
    /* margin: 30px 0px 20px 0px; */
    /* margin: 30px 0px 20px 1000px; */
    /* margin: ${({ chartWidth }) =>
      `30px 0px 20px ${chartWidth}px`}; */
    margin: ${({ chartWidth, layout }) =>
      layout === 'grid'
        ? `30px 0px 20px ${chartWidth}px`
        : `30px 20px 20px ${chartWidth}px`};
    /* padding: 20px 10px; */
    padding: 20px 10px 20px 0px;
    /* margin: ${(props) =>
      props.layout === 'grid'
        ? `30px 0px 20px ${props.chartWidth}px`
        : `30px 0px 20px ${props.chartWidth}px`}; */
    /* font-size: 3rem; */
    /* font-size: 2.7rem; */
    line-height: 1.2;
    /* font-size: ${(props) =>
      props.chartWidth > 400 ? '2.5rem' : '2.2rem'}; */
    font-size: ${({ titleFontSizeScale, chartWidth }) =>
      titleFontSizeScale(chartWidth)};
  }
`;

const IntroText = styled.div`
  /* background-color: rgba(55, 62, 98, 1);
  color: rgba(214, 217, 232, 1);
  padding: 20px;
  border-radius: 10px; */
`;

export default React.memo(Header);
