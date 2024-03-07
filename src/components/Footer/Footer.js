'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/constants';
import { GitHub } from 'react-feather';

function Footer({ chartWidth }) {
  return (
    <FooterWrapper chartWidth={chartWidth} tabIndex={0}>
      <InfoText chartWidth={chartWidth}>
        <DataInfo>
          <h3>Daten</h3>
          <p>
            <a
              href="https://unfallatlas.statistikportal.de/"
              target="_blank"
              rel="noreferrer"
            >
              Unfallatlas
            </a>{' '}
            der Statistischen Ämter des Bundes und der Länder
          </p>
        </DataInfo>
        <CodeInfo>
          <h3>Code</h3>
          <p style={{ marginTop: '5px' }}>
            {/* <span 
        class="githubIconWrapper" 
        style="
        --githubColor: {COLORS.primary["600"]};
        --githubHoverColor: {COLORS.primary["800"]};
        "> */}
            <a
              href="https://github.com/AitanaGS/unfallatlas-stuttgart"
              target="_blank"
              rel="noreferrer"
            >
              {/* <GithubIcon size="24"/> */}
              <GitHub size="24" color="rgba(255, 179, 0, 1)" />
              <span
              // style={{ flex: 1 }}
              >
                github.com/AitanaGS/unfallatlas-stuttgart
              </span>
            </a>
            {/* </span> */}
          </p>
        </CodeInfo>
      </InfoText>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  /* width: ${(props) => props.chartWidth}px; */
  width: 100%;
  /* margin: 0 auto; */
  margin-top: 40px;
  background-color: rgba(59, 59, 59, 1);
  color: rgba(255, 179, 0, 1);
  /* padding: 20px; */
  padding-top: 20px;
  padding-bottom: 50px;
  /* margin-bottom: 50px; */
  /* border-radius: 10px; */
`;

const InfoText = styled.div`
  width: ${(props) => props.chartWidth}px;
  margin: 0 auto;
`;

const DataInfo = styled.div`
  a {
    color: rgba(255, 179, 0, 1);
  }
`;

const CodeInfo = styled.div`
  margin-top: 20px;
  /* margin-bottom: 50px; */
  a {
    color: rgba(255, 179, 0, 1);
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    word-break: break-all;
    /* flex: 1; */
    /* Prevent the link from overflowing its container */
    /* max-width: 100%; */
  }
`;

export default React.memo(Footer);
