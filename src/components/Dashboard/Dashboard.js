'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { rollup, sum } from 'd3-array';
import {
  interpolateOranges,
  interpolateReds,
} from 'd3-scale-chromatic';
import { min, max, least, greatest, extent } from 'd3-array';
import { scaleBand, scaleSequential, scaleLinear } from 'd3-scale';
import { throttle } from 'lodash';

import LeafletMap from '../LeafletMap';
import KategBarChart from '../KategBarChart';
// import LichtBarChart from '../LichtBarChart';
// import StrasseBarChart from '../StrasseBarChart';
import Number from '../Number';
import WeekHourHeatmap from '../WeekHourHeatmap';
import TreeMap from '../TreeMap';
import LineChart from '../LineChart';
import { timeParse } from 'd3-time-format';
import LineChartYear from '../LineChartYear';
import LineChartMonth from '../LineChartMonth';
import MonthYearHeatmap from '../MonthYearHeatmap';
import FilterCheckboxes from '../FilterCheckboxes';
import LeafletHeatCheckbox from '../LeafletHeatCheckbox';
import ArtBarChart from '../ArtBarChart';
// import KategStackedBarChart from '../KategStackedBarChart';
// import LichtLollipopChart from '../LichtLollipopChart';
import LichtDonutChart from '../LichtDonutChart';
import StrasseDonutChart from '../StrasseDonutChart';
// import ColumnChart from '../ColumnChart';
import ColumnChartSmallMultiple from '../ColumnChartSmallMultiple';
import styled from 'styled-components';
import useChartDimensions from '../../hooks/useChartDimensions';
// import { lato } from '../../utils/fonts';
import { window } from 'd3-selection';
import Header from '../Header';
import Footer from '../Footer';
import useScrollbarWidth from '@/hooks/useScrollbarWidth';
// import {
//   SpringConfigContext,
//   springConfig,
// } from '@/contextProvider/SpringConfigContextProvider';
import {
  AnimationProvider,
  AnimationContext,
} from '@/context/AnimationContext';
import { Triangle } from 'react-loader-spinner';
import { COLORS } from '@/utils/constants';
import Note from '../Note';
// import { SVGFontSizeContext } from '@/contextProvider/SVGFontSizeContextProvider';
// import { tidy, select } from '@tidyjs/tidy';
// import { Quattrocento, Lato } from 'next/font/google';

// import { timeParse } from 'd3-time-format';
// import dynamic from 'next/dynamic';

function Dashboard({ initialData }) {
  // const parseDate = timeParse('%Y-%m-%d');
  const [data, setData] = useState(initialData);
  const [totalMapData, setTotalMapData] = useState(initialData);
  const [mapData, setMapData] = useState(initialData);
  const [visData, setVisData] = useState(initialData); // Original dataset
  const [filteredData, setFilteredData] = useState(visData); // Initially set to visData
  const [allFilter, setAllFilter] = useState(true);
  const [allKategFilter, setAllKategFilter] = useState(true); // added filter

  // console.log('data', data, 'visData', visData);

  const initialFilter = {
    Fußgänger: true,
    Fahrrad: true,
    Kraftrad: true,
    PKW: true,
    Sonstige: true,
  };

  // added filter
  const initialKategFilter = {
    'Unfall mit Leichtverletzten': true, // new
    'Unfall mit Schwerverletzten/Getöteten': true, // new
  };

  const [filter, setFilter] = useState(initialFilter);
  const [kategFilter, setKategFilter] = useState(initialKategFilter); // added filter
  const [filteringMode, setFilteringMode] = useState('none');
  const [kategFilteringMode, setKategFilteringMode] =
    useState('none');
  const [selectHeatmap, setSelectHeatmap] = useState(false); // true
  // const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [layout, setLayout] = useState('grid'); // grid flex
  // const [dashboardPaddingX, setDashboardPaddingX] = useState(50);

  // TODO: check mapdata, filtereddata, etc. - is it used?

  const [windowWidth, setWindowWidth] = useState(1000); // 1000 700 window.innerWidth || 700

  const [loading, setLoading] = useState(true);
  // Step 2: State to hold window width
  // const [dashboardWidth, setDashboardWidth] = useState(windowWidth);
  const mobileBreakpoint = 700; // 700

  const smallMobileBreakpoint = 400;

  const chartWidthDomain = [200, 700];

  const [dashboardWidth, setDashboardWidth] = useState(
    windowWidth > mobileBreakpoint ? windowWidth : windowWidth
  ); // layout
  const [chartWidth, setChartWidth] = useState(
    windowWidth > mobileBreakpoint ? windowWidth / 2 : windowWidth
  ); // layout  * 0.75

  // const dashboardWrapperRef = useRef(null); // Step 2: Create a ref for Resize Observer
  // const spinnerWrapperRef = useRef(null);
  const wrapperRef = useRef(null);

  // const [windowHeight, setWindowHeight] = useState(100);
  // const [totalWindowHeight, setTotalWindowHeight] = useState(100);

  // console.log(
  //   'windowheight',
  //   windowHeight,
  //   'totalwindowheight',
  //   totalWindowHeight
  // );

  // const dashboardPaddingScale = scaleLinear()
  //   .domain([300, 1000])
  //   .range([10, 50])
  //   .clamp(true);

  const textFontSizeScale = scaleLinear()
    .domain(chartWidthDomain) //based on width
    .range([0.75, 1])
    .clamp(true);

  const titleFontSizeScale = scaleLinear()
    .domain(chartWidthDomain) //based on width
    .range([0.9, 1.3])
    .clamp(true);

  const svgFontSize = useMemo(() => {
    return {
      text: textFontSizeScale(chartWidth),
      title: titleFontSizeScale(chartWidth),
    };
  }, [chartWidth, textFontSizeScale, titleFontSizeScale]);

  // const svgFontSize = fontSizeScale(chartWidth)

  // const filterData = (dataToFilter, allFilter, filter) => {
  //   // console.log(dataToFilter);
  //   return dataToFilter.filter((item) => {
  //     if (allFilter) {
  //       return true; // If allFilter is true, return all items
  //     }

  //     // Check each category filter and filter out items accordingly
  //     if (filter.Fußgänger && item.istfussb) {
  //       return true; // Filter out items where Fußgänger filter is false and istfussb is true
  //     }
  //     if (filter.Fahrrad && item.istradb) {
  //       return true; // Filter out items where Fahrrad filter is false and istradb is true
  //     }
  //     if (filter.Kraftrad && item.istkradb) {
  //       return true; // Filter out items where Kraftrad filter is false and istkradb is true
  //     }
  //     if (filter.PKW && item.istpkwb) {
  //       return true; // Filter out items where PKW filter is false and istpkwb is true
  //     }
  //     if (filter.Sonstige && item.istsonst2b) {
  //       return true; // Filter out items where Sonstige filter is false and istsonst2b is true
  //     }
  //     // If none of the above conditions match, keep the item
  //     return false;
  //   });
  // };

  // // added filter
  // const filterKategData = (dataToFilter, allFilter, filter) => {
  //   // console.log(dataToFilter);
  //   const data = dataToFilter.filter((item) => {
  //     if (allFilter) {
  //       return true; // If allFilter is true, return all items
  //     }

  //     if (
  //       filter['Unfall mit Leichtverletzten'] &&
  //       item.kateg2 === 'Unfall mit Leichtverletzten'
  //     ) {
  //       return true;
  //     }

  //     if (
  //       filter['Unfall mit Schwerverletzten/Getöteten'] &&
  //       item.kateg2 === 'Unfall mit Schwerverletzten/Getöteten'
  //     ) {
  //       return true;
  //     }

  //     // If none of the above conditions match, keep the item
  //     return false;
  //   });
  //   // console.log('data in function', data);
  //   return data;
  // };

  const filterData = useCallback(
    (dataToFilter, allFilter, filter) => {
      // console.log(dataToFilter);
      return dataToFilter.filter((item) => {
        if (allFilter) {
          return true; // If allFilter is true, return all items
        }

        // Check each category filter and filter out items accordingly
        if (filter.Fußgänger && item.istfussb) {
          return true; // Filter out items where Fußgänger filter is false and istfussb is true
        }
        if (filter.Fahrrad && item.istradb) {
          return true; // Filter out items where Fahrrad filter is false and istradb is true
        }
        if (filter.Kraftrad && item.istkradb) {
          return true; // Filter out items where Kraftrad filter is false and istkradb is true
        }
        if (filter.PKW && item.istpkwb) {
          return true; // Filter out items where PKW filter is false and istpkwb is true
        }
        if (filter.Sonstige && item.istsonst2b) {
          return true; // Filter out items where Sonstige filter is false and istsonst2b is true
        }
        // If none of the above conditions match, keep the item
        return false;
      });
    },
    []
  );

  const filterKategData = useCallback(
    (dataToFilter, allFilter, filter) => {
      // console.log(dataToFilter);
      const data = dataToFilter.filter((item) => {
        if (allFilter) {
          return true; // If allFilter is true, return all items
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

        // If none of the above conditions match, keep the item
        return false;
      });
      // console.log('data in function', data);
      return data;
    },
    []
  );

  const scrollbarWidth = useScrollbarWidth();

  // here
  useEffect(() => {
    // const handleResize = throttle((entries) => {
    //   for (let entry of entries) {
    //     if (
    //       entry.target === dashboardWrapperRef.current &&
    //       entry.contentRect
    //     ) {
    //       setWindowWidth(entry.contentRect.width);
    //       setDashboardWidth(Math.min([entry.contentRect.width, 700]));
    //     }
    //   }
    // }, 200); // Adjust the throttle duration (in milliseconds) as needed

    // if (dashboardWrapperRef.current) {
    //   const resizeObserver = new ResizeObserver(handleResize);
    //   resizeObserver.observe(dashboardWrapperRef.current);

    //   return () => {
    //     resizeObserver.disconnect();
    //   };
    // }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (
          entry.target === wrapperRef.current &&
          entry.contentRect
          // (entry.target === dashboardWrapperRef.current ||
          //   entry.target === spinnerWrapperRef.current) &&
          // entry.contentRect
        ) {
          const sizeWidth = entry.contentRect.width; // + 12
          setWindowWidth(sizeWidth); // layout
          // setDashboardWidth(min([entry.contentRect.width, 700])); // layout
          setDashboardWidth(
            sizeWidth <= mobileBreakpoint
              ? min([sizeWidth, mobileBreakpoint])
              : sizeWidth
          );

          // const newChartWidth =
          //   sizeWidth <= mobileBreakpoint
          //     ? min([sizeWidth, mobileBreakpoint])
          //     : sizeWidth / 2;

          const newChartWidth =
            sizeWidth <= mobileBreakpoint
              ? min([sizeWidth, mobileBreakpoint]) -
                scrollbarWidth * 2
              : sizeWidth / 2 - scrollbarWidth * 2;

          setChartWidth(newChartWidth);

          setLayout(sizeWidth <= mobileBreakpoint ? 'flex' : 'grid');

          // const sizeHeight = entry.contentRect.height;
          // setWindowHeight(sizeHeight);
          // const wrapperHeight = wrapperRef.current.scrollHeight;
          // setTotalWindowHeight(wrapperHeight);

          // setLoading(false);
          const delay = 1500;
          const timer = setTimeout(() => {
            setLoading(false);
          }, delay);

          return () => clearTimeout(timer);
        }
      }
    });

    const observerOptions = {
      box: 'border-box',
    };

    // if (dashboardWrapperRef.current) {
    //   resizeObserver.observe(
    //     dashboardWrapperRef.current,
    //     observerOptions
    //   );
    // }

    // if (loading && spinnerWrapperRef.current) {
    //   resizeObserver.observe(
    //     spinnerWrapperRef.current,
    //     observerOptions
    //   );
    // } else if (!loading && dashboardWrapperRef.current) {
    //   resizeObserver.observe(
    //     dashboardWrapperRef.current,
    //     observerOptions
    //   );
    // }

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current, observerOptions);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    // dashboardWrapperRef,
    windowWidth,
    dashboardWidth,
    chartWidth,
    textFontSizeScale,
    titleFontSizeScale,
    wrapperRef,
    scrollbarWidth,
    // loading,
    // spinnerWrapperRef,
  ]);

  // console.log('mapData', mapData, 'totalMapData', totalMapData);

  // console.log(visData);
  // console.log('visData', visData);

  // const filterData = useCallback(() => {
  //   const updatedFilteredData = mapData.filter((item) => {
  //     if (allFilter) {
  //       return true;
  //     }
  //     if (filter.Fußgänger && item.istfussb) {
  //       return true;
  //     }
  //     if (filter.Fahrrad && item.istradb) {
  //       return true;
  //     }
  //     if (filter.Kraftrad && item.istkradb) {
  //       return true;
  //     }
  //     if (filter.PKW && item.istpkwb) {
  //       console.log(filter.PKW, item.istpkwb);
  //       return true;
  //     }
  //     if (filter.Sonstige && item.istsonst2b) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   setFilteredData(updatedFilteredData);
  //   setVisData(updatedFilteredData);
  // }, [mapData, filter, allFilter]);

  const filterAndSetData = useCallback(() => {
    // const updatedFilteredData = filterData(
    //   totalMapData, // here: mapData
    //   allFilter,
    //   filter
    // );

    // console.log(
    //   'totalmapdata',
    //   totalMapData,
    //   'allkategfilter',
    //   allKategFilter,
    //   'kategfilter',
    //   kategFilter
    // );
    const updatedKategFilteredData = filterKategData(
      totalMapData, // here: mapData
      allKategFilter,
      kategFilter
    ); // added filter

    const updatedFilteredData = filterData(
      updatedKategFilteredData, // here: mapData
      allFilter,
      filter
    ); // old filter but a bit changed because of added filter (input is from above (added filter))

    // const updatedFilteredData = mapData.filter((item) => {
    //   if (allFilter) {
    //     return true; // If allFilter is true, return all items
    //   }

    //   // Check each category filter and filter out items accordingly
    //   if (!filter.Fußgänger && item.istfussb) {
    //     return false; // Filter out items where Fußgänger filter is false and istfussb is true
    //   }
    //   if (!filter.Fahrrad && item.istradb) {
    //     return false; // Filter out items where Fahrrad filter is false and istradb is true
    //   }
    //   if (!filter.Kraftrad && item.istkradb) {
    //     return false; // Filter out items where Kraftrad filter is false and istkradb is true
    //   }
    //   if (!filter.PKW && item.istpkwb) {
    //     return false; // Filter out items where PKW filter is false and istpkwb is true
    //   }
    //   if (!filter.Sonstige && item.istsonst2b) {
    //     return false; // Filter out items where Sonstige filter is false and istsonst2b is true
    //   }

    //   // If none of the above conditions match, keep the item
    //   return true;
    // });

    // console.log('updatedkategfiltereddata', updatedKategFilteredData);
    // console.log('updatedfiltereddata', updatedFilteredData);

    setFilteredData(updatedFilteredData);
    setVisData(updatedFilteredData);
    // setData(updatedFilteredData);
  }, [
    filter,
    allFilter,
    totalMapData,
    allKategFilter,
    kategFilter,
    filterData,
    filterKategData,
  ]); // here: mapData
  // added filter (depencencies and inside function)

  useEffect(() => {
    // if (filteringMode === 'none')
    if (filteringMode === 'none' && kategFilteringMode === 'none') {
      // setFilteredData(mapData); // here
      // setVisData(mapData); // here
      setFilteredData(totalMapData);
      setVisData(totalMapData);
    } else {
      filterAndSetData();
    }
  }, [
    filter,
    allFilter,
    filteringMode,
    filterAndSetData,
    totalMapData,
    allKategFilter,
    kategFilter,
    kategFilteringMode,
  ]); // here: mapData
  // added filter (dependencies)

  const visDataTotal = useMemo(() => {
    // console.log('check data', data); // d.kateg // d.properties.kateg
    // console.log('check visData', visData); //d.options.data.kateg
    // if (!visData) {
    //   return undefined;
    // }
    return visData.length;
  }, [visData]);

  // TODO: check client component in next
  // TODO: dataTotal/visDataTotal performance/correct use of useMemo
  // TODO: gkfz und sonstige mit reinnehmen? ja, als sonstige gesamt
  // TODO: BarChart / Axis abstraction
  // TODO: visData zu Beginn (data bzw. visData)
  // TODO: check d3 with react (useref, etc)
  // TODO: number abstraction
  // TODO: abstraction, chart component, see d3.js in action
  // TODO: map cursor, zoom etc.
  // TODO: Erklärung fallzahl, besonders geringe fallzahl, und um zu vergleichen wäre anzahl fahrzeuge in der jeweiligen gegend relevant
  // TODO: transitions (check wattenberger)
  // TODO: responsiveness (see wattenberger etc.)
  // TODO: time variables more efficient (page.js)
  // TODO: check which calculations in components vs. here
  // TODO: Line Chart mean (und sd) statt count (?)
  // TODO: dashboardwidth and data as context
  // TODO: bei 0 fällen gerüst der einzelnen charts
  // TODO: remove heatmap functionaliy in leaflet
  // TODO: check in R/Daten Unfälle ohne Verletzte
  // TODO: check media query only screen
  // TODO: check all charts for count.get || 0
  // TODO: preferred no motion
  // TODO: info text inkl. data, colorscale, etc.

  // console.log(timeDataDates);

  // console.log('tree', numberData, treemapDataArray, pkwCount);

  // layout: chartWidth instead of dashboadwidth

  const { reduceMotion } = useContext(AnimationContext);

  // console.log('reducemotion', reduceMotion);
  const vizWrapperGap = 40;

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
                // color={COLORS.yellow.medium}
                // color="rgb(255,179,0)"
                color={COLORS.orange.light}
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                // style={{
                //   margin: '0 auto',
                // }}
              />
            )}
          </SpinnerWrapper>
        )}
        {!loading && (
          <>
            <DashboardWrapper
              ref={wrapperRef}
              dashboardWidth={dashboardWidth}
              // scrollbarWidth={scrollbarWidth}
              layout={layout}
              // dashboardPaddingScale={dashboardPaddingScale}
              // mobileBreakpoint={mobileBreakpoint}
              // dashboardPaddingX={dashboardPaddingX}
            >
              <Header
                chartWidth={chartWidth}
                layout={layout}
                chartWidthDomain={chartWidthDomain}
              />
              <InputWrapper
                layout={layout}
                dashboardWidth={dashboardWidth}
              >
                {/* <Map data={data} setVisData={setVisData} /> */}
                <LeafletMap
                  data={data}
                  setVisData={setVisData}
                  setMapData={setMapData}
                  // filteredData={filteredData}
                  filteringMode={filteringMode}
                  // setData={setData}
                  filterData={filterData}
                  allFilter={allFilter}
                  filter={filter}
                  filterKategData={filterKategData}
                  allKategFilter={allKategFilter}
                  kategFilter={kategFilter}
                  selectHeatmap={selectHeatmap}
                  setTotalMapData={setTotalMapData}
                  chartWidth={chartWidth}
                  svgFontSize={svgFontSize}
                  layout={layout}
                />
                {/* <CheckboxWrapper> */}
                {/* <LeafletHeatCheckbox
          selectHeatmap={selectHeatmap}
          setSelectHeatmap={setSelectHeatmap}
          dashboardWidth={dashboardWidth}
        /> */}
                <Number
                  number={visDataTotal}
                  label={'Gesamt'}
                  // colorScale={undefined}
                  // max={undefined}
                />
                {/* <CheckboxWrapper>
                  <FilterCheckboxes
                    filter={filter}
                    setFilter={setFilter}
                    allFilter={allFilter}
                    setAllFilter={setAllFilter}
                    setFilteringMode={setFilteringMode}
                    chartWidth={chartWidth}
                    feature="Unfallbeteiligung"
                  />
                  <FilterCheckboxes
                    filter={kategFilter}
                    setFilter={setKategFilter}
                    allFilter={allKategFilter}
                    setAllFilter={setAllKategFilter}
                    setFilteringMode={setKategFilteringMode}
                    chartWidth={chartWidth}
                    feature="Schweregrad"
                  />
                </CheckboxWrapper> */}
                <FilterCheckboxes
                  filter={filter}
                  setFilter={setFilter}
                  allFilter={allFilter}
                  setAllFilter={setAllFilter}
                  setFilteringMode={setFilteringMode}
                  chartWidth={chartWidth}
                  feature="Unfallbeteiligung"
                />
                <FilterCheckboxes
                  filter={kategFilter}
                  setFilter={setKategFilter}
                  allFilter={allKategFilter}
                  setAllFilter={setAllKategFilter}
                  setFilteringMode={setKategFilteringMode}
                  chartWidth={chartWidth}
                  feature="Schweregrad"
                />
                {/* </CheckboxWrapper> */}

                {/* <Intro /> */}
              </InputWrapper>
              <VizWrapper
                layout={layout}
                dashboardWidth={dashboardWidth}
                vizWrapperGap={vizWrapperGap}
              >
                {/* <SpringConfigContext.Provider value={springConfig}> */}
                {/* <AnimationProvider> */}
                {/* <SVGFontSizeContext.Provider value={SVGFontSize}> */}
                {/* <TestContext.Provider value={springConfig}> */}
                {/* <CheckboxWrapper> */}
                {/* <Note svgFontSize={svgFontSize}>
                    <p>
                      Die Datenvisualisierungen beziehen sich auf den
                      ausgewählten Abschnitt. <br />
                      Verwende die Checkboxen, um die Unfälle nach
                      bestimmten Kriterien zu filtern.
                    </p>
                  </Note> */}
                {/* <FilterCheckboxes
                    filter={filter}
                    setFilter={setFilter}
                    allFilter={allFilter}
                    setAllFilter={setAllFilter}
                    setFilteringMode={setFilteringMode}
                    chartWidth={chartWidth}
                    feature="Unfallbeteiligung"
                  />
                  <FilterCheckboxes
                    filter={kategFilter}
                    setFilter={setKategFilter}
                    allFilter={allKategFilter}
                    setAllFilter={setAllKategFilter}
                    setFilteringMode={setKategFilteringMode}
                    chartWidth={chartWidth}
                    feature="Schweregrad"
                  />
                </CheckboxWrapper> */}
                <Note
                  svgFontSize={svgFontSize}
                  margin={`0px 0 -20px ${scrollbarWidth}px`}
                >
                  <p>
                    Bitte beachte, dass die Verkehrsdichte auf den
                    Straßen variiert und somit auch die
                    Wahrscheinlichkeit für Unfälle unterschiedlich
                    ist. Daher sollten Straßen oder Abschnitte nicht
                    direkt miteinander verglichen werden.
                  </p>
                </Note>
                {/* <Number
                  number={visDataTotal}
                  label={'Gesamt'}
                  svgFontSize={svgFontSize}
                  // colorScale={undefined}
                  // max={undefined}
                /> */}

                <TreeMap
                  // treeData={treemapDataArray}
                  chartWidth={chartWidth}
                  visDataTotal={visDataTotal}
                  // chartData={beteiligteData}
                  visData={visData}
                  smallMobileBreakpoint={smallMobileBreakpoint}
                  // fontSizeScale={fontSizeScale}
                  // svgFontSize={svgFontSize}
                  svgFontSize={svgFontSize}
                  chartWidthDomain={chartWidthDomain}
                  vizWrapperGap={vizWrapperGap}
                  scrollbarWidth={scrollbarWidth}
                />
                <KategBarChart
                  // variableCount={kategCount}
                  // visDataTotal={visDataTotal}
                  chartWidth={chartWidth}
                  visData={visData}
                  smallMobileBreakpoint={smallMobileBreakpoint}
                  svgFontSize={svgFontSize}
                  chartWidthDomain={chartWidthDomain}
                  vizWrapperGap={vizWrapperGap}
                  scrollbarWidth={scrollbarWidth}
                />
                <WeekHourHeatmap
                  visData={visData}
                  // weekHourCount={weekHourCount}
                  chartWidth={chartWidth}
                  // smallMobileBreakpoint={smallMobileBreakpoint}
                  svgFontSize={svgFontSize}
                  chartWidthDomain={chartWidthDomain}
                />
                <ColumnChartSmallMultiple
                  visData={visData}
                  chartWidth={chartWidth}
                  svgFontSize={svgFontSize}
                  vizWrapperGap={vizWrapperGap}
                  // chartWidthDomain={chartWidthDomain}
                  scrollbarWidth={scrollbarWidth}
                />
                <LichtDonutChart
                  // variableCount={lichtCount}
                  // visDataTotal={visDataTotal}
                  chartWidth={chartWidth}
                  visData={visData}
                  svgFontSize={svgFontSize}
                  // chartWidthDomain={chartWidthDomain}
                  // mobileBreakpoint={mobileBreakpoint}
                  // smallMobileBreakpoint={smallMobileBreakpoint}
                />
                <StrasseDonutChart
                  // variableCount={strasseCount}
                  // visDataTotal={visDataTotal}
                  chartWidth={chartWidth}
                  visData={visData}
                  svgFontSize={svgFontSize}
                  // chartWidthDomain={chartWidthDomain}
                  // mobileBreakpoint={mobileBreakpoint}
                  // smallMobileBreakpoint={smallMobileBreakpoint}
                />

                <ArtBarChart
                  // variableCount={artCount}
                  // visDataTotal={visDataTotal}
                  chartWidth={chartWidth}
                  visData={visData}
                  svgFontSize={svgFontSize}
                />
                {/* </TestContext.Provider> */}
                {/* </SVGFontSizeContext.Provider> */}
                {/* </SpringConfigContext.Provider> */}
                {/* </AnimationProvider> */}
              </VizWrapper>
              {/* Ab hier Numbers, Line Charts, MonthYearHeatmap */}
              {/* <LichtLollipopChart
          variableCount={lichtCount}
          visDataTotal={visDataTotal}
          dashboardWidth={dashboardWidth}
        />
        <LichtBarChart
          variableCount={lichtCount}
          visDataTotal={visDataTotal}
          dashboardWidth={dashboardWidth}
        /> */}
              {/* <StrasseBarChart
          variableCount={strasseCount}
          visDataTotal={visDataTotal}
          dashboardWidth={dashboardWidth}
        /> */}
              {/* </BarChartWrapper> */}
              {/* <BarChartWrapper dashboardWidth={dashboardWidth}> */}
              {/* <KategStackedBarChart
          variableCount={kategCount}
          visDataTotal={visDataTotal}
          dashboardWidth={dashboardWidth}
        /> */}
              {/* <Number
        width={75}
        height={50}
        number={fussCount.get('Unfall mit Fußgängerbeteiligung') || 0}
        label={'Fußgänger'}
        colorScale={numberColorScale}
        max={numberMax}
      />
      <Number
        width={75}
        height={50}
        number={radCount.get('Unfall mit Fahrradbeteiligung') || 0}
        label={'Rad'}
        colorScale={numberColorScale}
        max={numberMax}
      />
      <Number
        width={75}
        height={50}
        number={kradCount.get('Unfall mit Kraftradbeteiligung') || 0}
        label={'Kraftrad'}
        colorScale={numberColorScale}
        max={numberMax}
      />
      <Number
        width={75}
        height={50}
        number={pkwCount.get('Unfall mit PKW-Beteiligung') || 0}
        label={'PKW'}
        colorScale={numberColorScale}
        max={numberMax}
      />
      <Number
        width={75}
        height={50}
        number={
          sonstCount.get(
            'Unfall mit Beteiligung eines anderen Verkehrsmittels'
          ) || 0
        }
        label={'Sonstige'}
        colorScale={numberColorScale}
        max={numberMax}
      /> */}
              {/* <MonthYearHeatmap visData={visData} /> */}
              {/* <LineChart
          visData={visData}
          dataTotal={dataTotal}
          aggregatedTimeData={aggregatedTimeData}
          timeDateExtent={timeDateExtent}
          timeCountExtent={timeCountExtent}
          timeDataDates={timeDataDates}
        /> */}
              {/* <LineChartYear visData={visData} /> */}
              {/* <LineChartMonth visData={visData} /> */}
            </DashboardWrapper>
            <Footer chartWidth={chartWidth} />
          </>
        )}
      </>
    )
  );
}

// const DashboardWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   gap: 25px;
//   width: 100%;
//   /* width: ${(props) => props.dashboardWidth}px; */
//   height: 100%;
//   max-width: 1000px; // 500px
//   margin: 0 auto;
//   position: relative;
// `;

// layout

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
// style={{
//   width: '100%',
//   maxWidth: '1200px',
//   // maxWidth: '5000px',

//   margin: '0 auto',
//   padding: '1% 5%',
// }}

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
  // grid: `
  // display: grid;
  // display: grid;
  // width: 100%;
  // grid-column: 1 / 3;
  // grid-column-gap: 20px;
  // isolation: isolate;
  // max-width: 1200px;
  // margin: 0 auto;
  // grid-template-columns: auto 1fr; /* Assuming the first column is sticky and the second one can scroll */
  // `,
};

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 25px;
  /* width: ${(props) => props.dashboardWidth}px; */
  width: 100%;
  max-width: 1200px; // 500px
  margin: 0 auto;
  height: 100%;
  /* position: relative; */
  /* padding: 10px 25px; */
  padding: 1% 5%;
  /* padding: 10px 30px 10px 20px; */
  /* padding: ${(props) => `10px ${props.dashboardPaddingX}px`}; */
  // @media (min-width: 820px)
  /* @media only screen and (min-width: ${(props) =>
    `${props.scrollbarWidth + 801}px`}) { */
  /* @media only screen and (min-width: ${(props) =>
    `${
      props.scrollbarWidth +
      (props.layout === 'grid' ? 50 : 15) * 2 +
      props.mobileBreakpoint +
      1
    }px`}) { */
  /* @media only screen and (min-width: ${(props) =>
    `${
      props.scrollbarWidth +
      props.dashboardPaddingX * 2 +
      props.mobileBreakpoint +
      1
    }px`}) { */
  ${(props) =>
    dashboardWrapperVariants[
      props.layout
    ]}/* @media only screen and (min-width: ${(props) =>
    `${
      props.scrollbarWidth + 25 * 2 + props.mobileBreakpoint + 1
    }px`}) {
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
  } */
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
  // grid: `
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-start;
  //   justify-content: start;
  //   grid-column: 1;
  //   height: max-content;
  //   position: sticky;
  //   top: 0px;
  //   z-index: 2;
  //   width: 100%;
  // `,
};

const InputWrapper = styled.div`
  ${(props) => inputWrapperVariants[props.layout]}
`;
/* @media only screen and (min-width: ${(props) =>
      `${props.scrollbarWidth + 801}px`}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    grid-column: 1;
    height: max-content;
    position: sticky;
    top: 0px;
    z-index: 2;

    width: 100%; */
/* grid-column: 1;
    position: sticky;
    top: 0px;
    z-index: 1;
    isolation: isolate;

    width: 100%;
    border: 2px solid red; */

/* height: 100%; */
/* display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start; */
/* } */
// `;
// const VizWrapper = styled.div`
//   grid-column: 2;
//   margin-top: 40px;
//   @media only screen and (min-width: ${(props) =>
//       `${props.scrollbarWidth + 801}px`}) {
//     grid-column: 2;
//     /* height: 100%; */
//     /* overflow-y: hidden; */
//   }
// `;

const vizWrapperVariants = {
  flex: ``,
  grid: `
    grid-column: 2;
    margin-top: 100px;
  `,
};

const VizWrapper = styled.div`
  ${(props) => vizWrapperVariants[props.layout]}
  display: flex;
  flex-direction: column;
  /* gap: 40px; */
  gap: ${({ vizWrapperGap }) => `${vizWrapperGap}px`};
`;

// const CheckboxWrapper = styled.div``;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%; // 500px
  gap: 5px;
`;

const BarChartWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.dashboardWidth}px;
  /* max-width: 100%; // 500px */
`;

export default Dashboard;
