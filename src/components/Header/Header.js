import { COLORS } from '@/utils/constants';

import React, { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';

function Header({ chartWidth, layout, chartWidthDomain }) {
  const titleFontSizeScale = useMemo(() => {
    return scaleLinear().domain(chartWidthDomain).range([1.8, 2.7]);
  }, [chartWidthDomain]);

  return (
    <HeaderWrapper colors={COLORS} tabIndex={0}>
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
          Der Unfallatlas Stuttgart bietet eine umfassende Darstellung
          der registrierten Verkehrsunfälle mit verletzten Personen im
          Stadtgebiet von Stuttgart für den Zeitraum von 2016 bis
          2022. <br />
          In der interaktiven Karte kannst du die Ansicht verschieben
          und herein- oder herauszoomen, während sich die
          Datenvisualisierungen automatisch an den ausgewählten
          Bereich anpassen. Zusätzlich hast du die Möglichkeit, nach
          Unfallbeteiligung und Schweregrad zu filtern.
        </p>
      </IntroText>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  width: 100%;
`;

const TitleWrapper = styled.div`
  background-color: ${({ colors }) => colors.yellow.medium};
  margin: ${({ chartWidth, layout }) =>
    layout === 'grid'
      ? `30px 0px 20px -${chartWidth}px`
      : `30px -20px 20px -${chartWidth}px`};
  border-radius: ${({ layout }) =>
    layout === 'grid' ? '10px' : '0px'};

  h1 {
    margin: ${({ chartWidth, layout }) =>
      layout === 'grid'
        ? `30px 0px 20px ${chartWidth}px`
        : `30px 20px 20px ${chartWidth}px`};
    padding: 20px 10px 20px 0px;
    line-height: 1.2;
    font-size: ${({ titleFontSizeScale, chartWidth }) =>
      titleFontSizeScale(chartWidth)};
  }
`;

const IntroText = styled.div`
  text-align: left;
  margin-top: 30px;
`;

export default React.memo(Header);
