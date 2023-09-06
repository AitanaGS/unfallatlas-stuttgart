'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { rollup, sum } from 'd3-array';
import {
  interpolateOranges,
  interpolateReds,
} from 'd3-scale-chromatic';
import { min, max, least, greatest, extent } from 'd3-array';
import { scaleBand, scaleSequential } from 'd3-scale';

import LeafletMap from '../LeafletMap';
import BarChart from '../BarChart';
import LichtBarChart from '../LichtBarChart';
import StrasseBarChart from '../StrasseBarChart';
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
// import { timeParse } from 'd3-time-format';
// import dynamic from 'next/dynamic';

// const Map = dynamic(() => import('../Map'), {
//   ssr: false,
// });

const initialFilter = {
  Fußgänger: true,
  Fahrrad: true,
  Kraftrad: true,
  PKW: true,
  Sonstige: true,
};

// const filterData = (dataToFilter, allFilter, filter) => {
//   return dataToFilter.filter((item) => {
//     if (allFilter) {
//       return true; // If allFilter is true, return all items
//     }

//     // Check each category filter and filter out items accordingly
//     if (!filter.Fußgänger && item.istfussb) {
//       return false; // Filter out items where Fußgänger filter is false and istfussb is true
//     }
//     if (!filter.Fahrrad && item.istradb) {
//       return false; // Filter out items where Fahrrad filter is false and istradb is true
//     }
//     if (!filter.Kraftrad && item.istkradb) {
//       return false; // Filter out items where Kraftrad filter is false and istkradb is true
//     }
//     if (!filter.PKW && item.istpkwb) {
//       return false; // Filter out items where PKW filter is false and istpkwb is true
//     }
//     if (!filter.Sonstige && item.istsonst2b) {
//       return false; // Filter out items where Sonstige filter is false and istsonst2b is true
//     }

//     // If none of the above conditions match, keep the item
//     return true;
//   });
// };

const filterData = (dataToFilter, allFilter, filter) => {
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
};

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

function Dashboard({ initialData }) {
  // const parseDate = timeParse('%Y-%m-%d');
  const [data, setData] = useState(initialData);
  const [mapData, setMapData] = useState(initialData);
  const [visData, setVisData] = useState(initialData); // Original dataset
  const [filteredData, setFilteredData] = useState(visData); // Initially set to visData
  const [allFilter, setAllFilter] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [filteringMode, setFilteringMode] = useState('none');
  const [selectHeatmap, setSelectHeatmap] = useState(true);
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
    const updatedFilteredData = filterData(
      mapData,
      allFilter,
      filter
    );
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

    setFilteredData(updatedFilteredData);
    setVisData(updatedFilteredData);
    // setData(updatedFilteredData);
  }, [mapData, filter, allFilter]);

  useEffect(() => {
    if (filteringMode === 'none') {
      setFilteredData(mapData);
      setVisData(mapData);
      // setData(mapData);
    } else {
      filterAndSetData();
    }
  }, [filter, allFilter, filteringMode, mapData, filterAndSetData]);

  // useEffect(() => {
  //   // Update visData independently from filteredData
  //   if (filteringMode === 'none') {
  //     setVisData(mapData);
  //   } else {
  //     setVisData(filteredData);
  //   }
  // }, [filteringMode, mapData, filteredData]);

  // const filterData = () => {
  //   const updatedFilteredData = visData.filter((item) => {
  //     if (allFilter) {
  //       return true; // Wenn "Alle" aktiviert ist, alle Elemente zurückgeben
  //     }
  //     // Ansonsten, die individuellen Filter gegen die Eigenschaften der Elemente überprüfen
  //     if (filter['Fußgänger'] && item.istfussb) {
  //       return true;
  //     }
  //     if (filter.Fahrrad && item.istradb) {
  //       return true;
  //     }
  //     if (filter.Kraftrad && item.istkradb) {
  //       return true;
  //     }
  //     if (filter['PKW'] && item.istpkwb) {
  //       return true;
  //     }
  //     if (filter.Sonstige && item.istsonst2b) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   setFilteredData(updatedFilteredData);
  // };

  // useEffect(() => {
  //   if (filteringMode === 'none') {
  //     setFilteredData(visData); // Reset filteredData to visData when filteringMode is 'none'
  //   } else {
  //     filterData();
  //   }
  // }, [filter, allFilter, visData, filteringMode]);

  // const parseDate = timeParse('%Y-%m-%d');
  // const [visData, setVisData] = useState(() => {
  //   return data.map((d) => {
  //     return {
  //       ...d,
  //       datum: parseDate(d.datum),
  //     };
  //   });
  // }); //data

  //   data.forEach(function (d) {
  //   d.datum = parseDate(d.datum);
  // });

  // console.log('dashboard', visData.length);
  // const [kategCount, setKategCount] = useState(new Map());

  // useEffect(() => {
  //   console.log('here einzeln', visibleData[0].kateg);
  //   console.log('here alle', visibleData);
  //   const newKategCount = rollup(
  //     visibleData,
  //     (v) => v.length,
  //     (d) => d.kateg
  //     // (d) => d.options.data.kateg
  //   );

  //   setKategCount(newKategCount);
  // }, [visibleData]);

  // // console.log('dashboard', visibleData);
  // console.log(data);

  // const weekHourCount = useMemo(() => {
  //   return rollup(
  //     visData,
  //     (v) => v.length,
  //     (d) => (d.options ? d.options.data.wochentag : d.wochentag),
  //     (d) => (d.options ? d.options.data.zeit : d.zeit)
  //   );
  // }, [visData]);

  // const weekHourCount = useMemo(() => {
  //   const uniqueWeekdays = [
  //     ...new Set(
  //       visData.map((d) =>
  //         d.options ? d.options.data.wochentag : d.wochentag
  //       )
  //     ),
  //   ];
  //   const uniqueTimes = [
  //     ...new Set(
  //       visData.map((d) => (d.options ? d.options.data.zeit : d.zeit))
  //     ),
  //   ];

  //   const nestedObj = {};

  //   uniqueWeekdays.forEach((weekday) => {
  //     nestedObj[weekday] = {};
  //     uniqueTimes.forEach((time) => {
  //       nestedObj[weekday][time] = 0; // Initialize with 0 cases
  //     });
  //   });

  //   // Populate nestedObj with actual counts
  //   visData.forEach((d) => {
  //     const weekday = d.options
  //       ? d.options.data.wochentag
  //       : d.wochentag;
  //     const time = d.options ? d.options.data.zeit : d.zeit;
  //     nestedObj[weekday][time]++;
  //   });

  //   return nestedObj;
  // }, [visData]);

  const weekHourCount = useMemo(() => {
    // const uniqueWeekdays = [
    //   ...new Set(
    //     visData.map((d) =>
    //       d.options ? d.options.data.wochentag : d.wochentag
    //     )
    //   ),
    // ];

    const uniqueWeekdays = [
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
      'Sonntag',
    ];

    // const uniqueTimes = [
    //   ...new Set(
    //     visData.map((d) => (d.options ? d.options.data.zeit : d.zeit))
    //   ),
    // ];

    const uniqueTimes = [
      '0-6 Uhr',
      '6-12 Uhr',
      '12-18 Uhr',
      '18-0 Uhr',
    ];

    const nestedObj = uniqueWeekdays.reduce((acc, weekday) => {
      acc[weekday] = uniqueTimes.reduce((innerAcc, time) => {
        innerAcc[time] = 0; // Initialize with 0 cases
        return innerAcc;
      }, {});
      return acc;
    }, {});

    // Populate nestedObj with actual counts
    visData.forEach((d) => {
      const weekday = d.options
        ? d.options.data.wochentag
        : d.wochentag;
      const time = d.options ? d.options.data.zeit : d.zeit;
      nestedObj[weekday][time]++;
    });

    return nestedObj;
  }, [visData]);

  // console.log(weekHourCount);

  const radCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istradb : d.istradb)
    );
  }, [visData]);

  const fussCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istfussb : d.istfussb)
    );
  }, [visData]);

  const pkwCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istpkwb : d.istpkwb)
    );
  }, [visData]);

  const kradCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istkradb : d.istkradb)
    );
  }, [visData]);

  const sonstCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istsonst2b : d.istsonst2b)
    );
  }, [visData]);

  const kategCount = useMemo(() => {
    // console.log('check data', data); // d.kateg // d.properties.kateg
    // console.log('check visData', visData); //d.options.data.kateg
    // if (!visData) {
    //   return undefined;
    // }
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
      // d.properties ? d.properties.kateg : d.options.data.kateg
      // (d) => d.options.data.kateg
      // (d) => d.properties.kateg
      // (d) => (d.options ? d.options.data.kateg : d.kateg)
    );
  }, [visData]);

  // console.log(visData);

  const lichtCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.licht2 : d.licht2)
    );
  }, [visData]);

  const strasseCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.strzust2 : d.strzust2)
    );
  }, [visData]);

  // console.log(lichtCount);

  const visDataTotal = useMemo(() => {
    // console.log('check data', data); // d.kateg // d.properties.kateg
    // console.log('check visData', visData); //d.options.data.kateg
    // if (!visData) {
    //   return undefined;
    // }
    return visData.length;
  }, [visData]);

  // const accidentsTotal = useMemo(() => {
  //   return rollup(visData, (v) =>
  //     sum(v, (d) => (d.options ? d.options.data.kateg : d.kateg))
  //   );
  // }, [visData]);

  // console.log('total', dataTotal);
  // console.log('visdata total', visDataTotal);

  // const accidentsTotal = rollup(athletes, v => d3.sum(v, d => d.earnings), d => d.sport)

  // const numberData = useMemo(() => {
  //   return new Map([
  //     [
  //       'Fußgänger',
  //       fussCount.get('Unfall mit Fußgängerbeteiligung') || 0,
  //     ],
  //     ['Rad', radCount.get('Unfall mit Fahrradbeteiligung') || 0],
  //     [
  //       'Kraftrad',
  //       kradCount.get('Unfall mit Kraftradbeteiligung') || 0,
  //     ],
  //     ['PKW', pkwCount.get('Unfall mit PKW-Beteiligung') || 0],
  //     [
  //       'Sonstige',
  //       sonstCount.get(
  //         'Unfall mit Beteiligung eines anderen Verkehrsmittels'
  //       ) || 0,
  //     ],
  //   ]);
  // }, [fussCount, radCount, kradCount, pkwCount, sonstCount]);

  const numberData = useMemo(() => {
    return new Map([
      ['Fußgänger', fussCount.get(true) || 0],
      ['Rad', radCount.get(true) || 0],
      ['Kraftrad', kradCount.get(true) || 0],
      ['PKW', pkwCount.get(true) || 0],
      ['Sonstige', sonstCount.get(true) || 0],
    ]);
  }, [fussCount, radCount, kradCount, pkwCount, sonstCount]);

  const treemapDataArray = Array.from(
    numberData,
    ([name, value]) => ({ name, value })
  );

  // console.log('numberdata', numberData);
  // console.log('treemapdataarray', treemapDataArray);

  // const treeData = {[
  //   [
  //     "Art",
  //     "Parent",
  //     "Count"
  //   ],
  // ]}

  // const treeMapData = Array.from(numberData, ([name, value]) => ({
  //   name,
  //   value,
  // }));

  // const numberData = new Map();

  // useEffect(() => {
  //   // const numberData = new Map();
  //   numberData.set(
  //     'Fußgänger',
  //     fussCount.get('Unfall mit Fußgängerbeteiligung') || 0
  //   );
  //   numberData.set(
  //     'Rad',
  //     radCount.get('Unfall mit Fahrradbeteiligung') || 0
  //   );
  //   numberData.set(
  //     'Kraftrad',
  //     kradCount.get('Unfall mit Kraftradbeteiligung') || 0
  //   );
  //   numberData.set(
  //     'PKW',
  //     pkwCount.get('Unfall mit PKW-Beteiligung') || 0
  //   );
  //   numberData.set(
  //     'Sonstige',
  //     sonstCount.get(
  //       'Unfall mit Beteiligung eines anderen Verkehrsmittels'
  //     ) || 0
  //   );
  // }, [
  //   fussCount,
  //   radCount,
  //   kradCount,
  //   pkwCount,
  //   sonstCount,
  //   numberData,
  // ]);
  // numberData.set(
  //   'Fußgänger',
  //   fussCount.get('Unfall mit Fußgängerbeteiligung') || 0
  // );
  // numberData.set(
  //   'Rad',
  //   radCount.get('Unfall mit Fahrradbeteiligung') || 0
  // );
  // numberData.set(
  //   'Kraftrad',
  //   kradCount.get('Unfall mit Kraftradbeteiligung') || 0
  // );
  // numberData.set(
  //   'PKW',
  //   pkwCount.get('Unfall mit PKW-Beteiligung') || 0
  // );
  // numberData.set(
  //   'Sonstige',
  //   sonstCount.get(
  //     'Unfall mit Beteiligung eines anderen Verkehrsmittels'
  //   ) || 0
  // );

  // console.log('numberdata', numberData);

  const numberLabels = [
    'Fußgänger',
    'Rad',
    'Kraftrad',
    'PKW',
    'Sonstige',
  ];

  // const numberValues = [
  //   fussCount.get('Unfall mit Fußgängerbeteiligung') || 0,
  //   radCount.get('Unfall mit Fahrradbeteiligung') || 0,
  //   kradCount.get('Unfall mit Kraftradbeteiligung') || 0,
  //   pkwCount.get('Unfall mit PKW-Beteiligung') || 0,
  //   sonstCount.get(
  //     'Unfall mit Beteiligung eines anderen Verkehrsmittels'
  //   ) || 0,
  // ];

  const numberValues = [
    fussCount.get(true) || 0,
    radCount.get(true) || 0,
    kradCount.get(true) || 0,
    pkwCount.get(true) || 0,
    sonstCount.get(true) || 0,
  ];

  const numberMax = max(numberValues);

  const numberExtentCounts = [0, max(numberValues)];

  const numberExtentCountsZero = [0, 1];

  const numberColorScale = scaleSequential(interpolateOranges).domain(
    numberExtentCounts[1] === 0
      ? numberExtentCountsZero
      : numberExtentCounts
  );

  // console.log(
  //   'sonstige',
  //   numberData,
  //   sonstCount,
  //   treemapDataArray,
  //   numberValues
  // );

  // const numberColorScale = scaleSequential(interpolateOranges).domain(
  //   numberMax
  //     ? numberExtentCountsZero
  //     : numberExtentCounts
  // );

  // const numberColorScale = scaleSequential(interpolateOranges).domain(
  //   [0, max(numberValues)]
  // );

  // console.log(
  //   'color',
  //   numberColorScale(0),
  //   numberColorScale(max(numberValues)),
  //   max(numberValues)
  // );

  const dataTotal = data.length;

  // const parseDate = timeParse('%Y-%m-%d');

  const aggregatedTimeData = useMemo(() => {
    return rollup(
      data,
      (v) => v.length, // Aggregation function: count the length of each group
      (d) => d.datum // Grouping key: the "datum" property representing the month
    );
  }, [data]); // Recalculate when data changes

  // const timeDataDates = useMemo(() => {
  //   return Array.from(aggregatedTimeData.keys());
  // }, [aggregatedTimeData]); // Recalculate when aggregatedTimeData changes

  const timeDataDates = useMemo(() => {
    const keys = Array.from(aggregatedTimeData.keys());
    keys.sort((a, b) => new Date(a) - new Date(b));
    return keys;
  }, [aggregatedTimeData]);

  // const aggregatedTimeData = rollup(
  //   data,
  //   (v) => v.length, // Aggregation function: count the length of each group
  //   (d) => d.datum // Grouping key: the "datum" property representing the month
  // );
  // const timeDataDates = Array.from(aggregatedTimeData.keys()); // Assuming keys are Date objects
  const timeDataCounts = Array.from(aggregatedTimeData.values());

  // const dataDatumMin = parseDate(min(data, (d) => d.datum)); //data[0].datum
  // const dataDatumMax = parseDate(max(data, (d) => d.datum)); //data[dataTotal - 1].datum

  // const countExtent = [0, dataTotal];
  // const timeExtent = [dataDatumMin, dataDatumMax];

  const timeDateExtent = extent(timeDataDates);
  // const countExtent = extent(timeDataCounts);
  const timeCountExtent = [0, max(timeDataCounts)];
  // console.log(timeDateExtent, timeCountExtent);

  // TODO: check client component in next
  // TODO: dataTotal/visDataTotal performance/correct use of useMemo
  // TODO: gkfz und sonstige mit reinnehmen? ja, als sonstige gesamt
  // TODO: BarChart / Axis abstraction
  // TODO: visData zu Beginn (data bzw. visData)
  // TODO: check d3 with react (useref, etc)
  // TODO: number abstraction
  // TODO: abstraction, chart component, see d3.js in action
  // TODO: map cursor, zoom etc.
  // TODO: Erklärung fallzahl
  // TODO: transitions (check wattenberger)
  // TODO: responsiveness (see wattenberger etc.)
  // TODO: time variables more efficient (page.js)
  // TODO: check which calculations in components vs. here
  // TODO: Line Chart mean (und sd) statt count (?)

  // console.log(timeDataDates);

  // console.log('tree', numberData, treemapDataArray, pkwCount);

  return (
    visData && (
      <div>
        {/* <Map data={data} setVisData={setVisData} /> */}
        <LeafletMap
          data={data}
          setVisData={setVisData}
          setMapData={setMapData}
          filteredData={filteredData}
          filteringMode={filteringMode}
          setData={setData}
          filterData={filterData}
          allFilter={allFilter}
          filter={filter}
          selectHeatmap={selectHeatmap}
        />
        <LeafletHeatCheckbox
          selectHeatmap={selectHeatmap}
          setSelectHeatmap={setSelectHeatmap}
        />
        <FilterCheckboxes
          filter={filter}
          setFilter={setFilter}
          allFilter={allFilter}
          setAllFilter={setAllFilter}
          setFilteringMode={setFilteringMode}
        />
        <Number
          width={75}
          height={50}
          number={visDataTotal}
          label={'Gesamt'}
          colorScale={undefined}
          max={undefined}
        />
        <MonthYearHeatmap visData={visData} />
        <LineChartYear visData={visData} />
        <LineChartMonth visData={visData} />
        <LineChart
          visData={visData}
          dataTotal={dataTotal}
          aggregatedTimeData={aggregatedTimeData}
          timeDateExtent={timeDateExtent}
          timeCountExtent={timeCountExtent}
          timeDataDates={timeDataDates}
        />
        <WeekHourHeatmap
          visData={visData}
          weekHourCount={weekHourCount}
        />
        <TreeMap treeData={treemapDataArray} />
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
        <BarChart
          variableCount={kategCount}
          visDataTotal={visDataTotal}
        />
        <LichtBarChart
          variableCount={lichtCount}
          visDataTotal={visDataTotal}
        />
        <StrasseBarChart
          variableCount={strasseCount}
          visDataTotal={visDataTotal}
        />
      </div>
    )
  );
}

export default Dashboard;
