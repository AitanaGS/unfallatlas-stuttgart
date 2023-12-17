'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderWrapper>
      <h1>Unfallatlas Stuttgart</h1>
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
  h1 {
    margin: 10px 0px;
  }
`;

export default Header;
