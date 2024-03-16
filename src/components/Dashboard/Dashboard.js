'use client';

import LeafletMap from '../LeafletMap';
import KategBarChart from '../KategBarChart';
import Number from '../Number';
import WeekHourHeatmap from '../WeekHourHeatmap';
import TreeMap from '../TreeMap';
import FilterCheckboxes from '../FilterCheckboxes';
import ArtBarChart from '../ArtBarChart';
import LichtDonutChart from '../LichtDonutChart';
import StrasseDonutChart from '../StrasseDonutChart';
import ColumnChartSmallMultiple from '../ColumnChartSmallMultiple';
import Header from '../Header';
import Footer from '../Footer';
import useScrollbarWidth from '@/hooks/useScrollbarWidth';
import { AnimationContext } from '@/context/AnimationContext';
import { COLORS } from '@/utils/constants';
import Note from '../Note';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { Triangle } from 'react-loader-spinner';
import styled from 'styled-components';

function Dashboard({ data }) {
  const [totalMapData, setTotalMapData] = useState(data);
  const [visData, setVisData] = useState(data);

  const initialFilter = {
    Fußgänger: true,
    Fahrrad: true,
    Kraftrad: true,
    PKW: true,
    Sonstige: true,
  };
  const initialKategFilter = {
    'Unfall mit Leichtverletzten': true,
    'Unfall mit Schwerverletzten/Getöteten': true,
  };

  const [filter, setFilter] = useState(initialFilter);
  const [kategFilter, setKategFilter] = useState(initialKategFilter);
  const [allFilter, setAllFilter] = useState(true);
  const [allKategFilter, setAllKategFilter] = useState(true);
  const [filteringMode, setFilteringMode] = useState('none');
  const [kategFilteringMode, setKategFilteringMode] =
    useState('none');

  const mobileBreakpoint = 700;
  const smallMobileBreakpoint = 400;
  const chartWidthDomain = [200, 700];

  const [layout, setLayout] = useState('grid');
  const [windowWidth, setWindowWidth] = useState(1000);
  const [chartWidth, setChartWidth] = useState(
    windowWidth > mobileBreakpoint ? windowWidth / 2 : windowWidth
  );

  const textFontSizeScale = scaleLinear()
    .domain(chartWidthDomain)
    .range([0.75, 1])
    .clamp(true);

  const titleFontSizeScale = scaleLinear()
    .domain(chartWidthDomain)
    .range([0.9, 1.3])
    .clamp(true);

  const [svgFontSize, setSvgFontSize] = useState({
    text: textFontSizeScale(chartWidth),
    title: titleFontSizeScale(chartWidth),
  });

  const [loading, setLoading] = useState(true);

  const wrapperRef = useRef(null);

  const { reduceMotion } = useContext(AnimationContext);

  useEffect(() => {
    const delay = 1500;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const scrollbarWidth = useScrollbarWidth();

  const scrollbarWidthGap = scrollbarWidth > 15 ? scrollbarWidth : 20;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (
          entry.target === wrapperRef.current &&
          entry.contentRect
        ) {
          const sizeWidth = entry.contentRect.width;
          setWindowWidth(sizeWidth);

          const newChartWidth =
            sizeWidth <= mobileBreakpoint
              ? min([sizeWidth, mobileBreakpoint]) -
                scrollbarWidthGap * 2
              : sizeWidth / 2 - scrollbarWidthGap * 2;

          setChartWidth(newChartWidth);

          setLayout(sizeWidth <= mobileBreakpoint ? 'flex' : 'grid');

          setSvgFontSize({
            text: textFontSizeScale(newChartWidth),
            title: titleFontSizeScale(newChartWidth),
          });
        }
      }
    });

    const observerOptions = {
      box: 'border-box',
    };

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current, observerOptions);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    textFontSizeScale,
    titleFontSizeScale,
    wrapperRef,
    scrollbarWidthGap,
  ]);

  const filterData = useCallback(
    (dataToFilter, allFilter, filter) => {
      return dataToFilter.filter((item) => {
        if (allFilter) {
          return true;
        }

        if (filter.Fußgänger && item.istfussb) {
          return true;
        }
        if (filter.Fahrrad && item.istradb) {
          return true;
        }
        if (filter.Kraftrad && item.istkradb) {
          return true;
        }
        if (filter.PKW && item.istpkwb) {
          return true;
        }
        if (filter.Sonstige && item.istsonst2b) {
          return true;
        }
        return false;
      });
    },
    []
  );

  const filterKategData = useCallback(
    (dataToFilter, allFilter, filter) => {
      return dataToFilter.filter((item) => {
        if (allFilter) {
          return true;
        }

        if (
          filter['Unfall mit Leichtverletzten'] &&
          item.kateg2 === 'Unfall mit Leichtverletzten'
        ) {
          return true;
        }

        if (
          filter['Unfall mit Schwerverletzten/Getöteten'] &&
          item.kateg2 === 'Unfall mit Schwerverletzten/Getöteten'
        ) {
          return true;
        }

        return false;
      });
    },
    []
  );

  const filterAndSetData = useCallback(() => {
    const updatedKategFilteredData = filterKategData(
      totalMapData,
      allKategFilter,
      kategFilter
    );

    const updatedFilteredData = filterData(
      updatedKategFilteredData,
      allFilter,
      filter
    );

    setVisData(updatedFilteredData);
  }, [
    filter,
    allFilter,
    totalMapData,
    allKategFilter,
    kategFilter,
    filterData,
    filterKategData,
  ]);

  useEffect(() => {
    if (filteringMode === 'none' && kategFilteringMode === 'none') {
      setVisData(totalMapData);
    } else {
      filterAndSetData();
    }
  }, [
    filteringMode,
    filterAndSetData,
    totalMapData,
    kategFilteringMode,
  ]);

  const visDataTotal = useMemo(() => {
    return visData.length;
  }, [visData]);

  const vizWrapperGap = 35;

  return (
    visData && (
      <>
        {loading && (
          <SpinnerWrapper ref={wrapperRef}>
            {!reduceMotion && (
              <Triangle
                visible={true}
                height="80"
                width="80"
                color={COLORS.orange.light}
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </SpinnerWrapper>
        )}
        {!loading && (
          <>
            <DashboardWrapper ref={wrapperRef} layout={layout}>
              <Header
                chartWidth={chartWidth}
                layout={layout}
                chartWidthDomain={chartWidthDomain}
              />
              <InputWrapper layout={layout}>
                <LeafletMap
                  data={data}
                  setTotalMapData={setTotalMapData}
                  filterData={filterData}
                  allFilter={allFilter}
                  filter={filter}
                  filterKategData={filterKategData}
                  allKategFilter={allKategFilter}
                  kategFilter={kategFilter}
                  chartWidth={chartWidth}
                />
                <Number
                  number={visDataTotal}
                  label="Gesamt"
                  description="Gesamt Anzahl von Unfällen"
                />
                <FilterCheckboxes
                  filter={filter}
                  setFilter={setFilter}
                  allFilter={allFilter}
                  setAllFilter={setAllFilter}
                  setFilteringMode={setFilteringMode}
                  chartWidth={chartWidth}
                  description="Unfallbeteiligung"
                />
                <FilterCheckboxes
                  filter={kategFilter}
                  setFilter={setKategFilter}
                  allFilter={allKategFilter}
                  setAllFilter={setAllKategFilter}
                  setFilteringMode={setKategFilteringMode}
                  chartWidth={chartWidth}
                  description="Schweregrad"
                />
              </InputWrapper>
              <VizWrapper
                layout={layout}
                vizWrapperGap={vizWrapperGap}
              >
                <Note
                  svgFontSize={svgFontSize}
                  margin={`0px 0 -20px 10px`}
                >
                  <p>
                    Bitte beachte, dass die Verkehrsdichte auf den
                    Straßen variiert und somit auch die
                    Wahrscheinlichkeit für Unfälle unterschiedlich
                    ist. Daher sollten Straßen oder Abschnitte nicht
                    direkt miteinander verglichen werden.
                  </p>
                </Note>
                <TreeMap
                  chartWidth={chartWidth}
                  visDataTotal={visDataTotal}
                  visData={visData}
                  svgFontSize={svgFontSize}
                  chartWidthDomain={chartWidthDomain}
                  vizWrapperGap={vizWrapperGap}
                />
                <KategBarChart
                  chartWidth={chartWidth}
                  visData={visData}
                  smallMobileBreakpoint={smallMobileBreakpoint}
                  svgFontSize={svgFontSize}
                  chartWidthDomain={chartWidthDomain}
                  vizWrapperGap={vizWrapperGap}
                />
                <WeekHourHeatmap
                  visData={visData}
                  chartWidth={chartWidth}
                  svgFontSize={svgFontSize}
                  chartWidthDomain={chartWidthDomain}
                />
                <ColumnChartSmallMultiple
                  visData={visData}
                  chartWidth={chartWidth}
                  svgFontSize={svgFontSize}
                />
                <LichtDonutChart
                  chartWidth={chartWidth}
                  visData={visData}
                  svgFontSize={svgFontSize}
                />
                <StrasseDonutChart
                  chartWidth={chartWidth}
                  visData={visData}
                  svgFontSize={svgFontSize}
                />

                <ArtBarChart
                  chartWidth={chartWidth}
                  visData={visData}
                  svgFontSize={svgFontSize}
                />
              </VizWrapper>
            </DashboardWrapper>
            <Footer chartWidth={chartWidth} />
          </>
        )}
      </>
    )
  );
}

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 1200px;
  padding: 1% 5%;
  margin: 0 auto;
  height: 100vh;
`;

const dashboardWrapperVariants = {
  flex: ``,
  grid: `
  display: grid;
  display: grid;
  grid-template-columns:
    1fr
    1fr;
  width: 100%;
  grid-column: 1 / 3;
  grid-column-gap: 20px;
  isolation: isolate;
  max-width: 1200px;
  margin: 0 auto;
  `,
};

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 25px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 1% 5%;
  ${({ layout }) => dashboardWrapperVariants[layout]}
`;

const inputWrapperVariants = {
  flex: ``,
  grid: `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    grid-column: 1;
    height: max-content;
    position: sticky;
    top: 0px;
    z-index: 2;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden
  `,
};

const InputWrapper = styled.section`
  ${({ layout }) => inputWrapperVariants[layout]}
`;

const vizWrapperVariants = {
  flex: ``,
  grid: `
    grid-column: 2;
    margin-top: 100px;
  `,
};

const VizWrapper = styled.section`
  ${({ layout }) => vizWrapperVariants[layout]}
  display: flex;
  flex-direction: column;
  gap: ${({ vizWrapperGap }) => `${vizWrapperGap}px`};
`;

export default Dashboard;
