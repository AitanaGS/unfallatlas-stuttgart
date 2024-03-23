import React from 'react';
import { GitHub } from 'react-feather';
import styled from 'styled-components';

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
            <a
              href="https://github.com/AitanaGS/unfallatlas-stuttgart"
              target="_blank"
              rel="noreferrer"
            >
              <GitHub size="24" color="rgba(255, 179, 0, 1)" />
              <span>github.com/AitanaGS/unfallatlas-stuttgart</span>
            </a>
          </p>
        </CodeInfo>
        <NameInfo>
          <p>
            <a
              href="https://www.github.com/AitanaGS"
              target="_blank"
              rel="noreferrer"
            >
              Aitana Gräbs Santiago
            </a>{' '}
            | 2024
          </p>
        </NameInfo>
      </InfoText>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  margin-top: 40px;
  background-color: rgba(59, 59, 59, 1);
  color: rgba(255, 179, 0, 1);
  padding-top: 20px;
  padding-bottom: 50px;

  a {
    color: rgba(255, 179, 0, 1);
    cursor: pointer;
  }
`;

const InfoText = styled.div`
  width: ${({ chartWidth }) => chartWidth}px;
  margin: 0 auto;
`;

const DataInfo = styled.div``;

const CodeInfo = styled.div`
  margin-top: 20px;

  a {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    word-break: break-all;
  }
`;

const NameInfo = styled.div`
  margin-top: 60px;
`;

export default React.memo(Footer);
