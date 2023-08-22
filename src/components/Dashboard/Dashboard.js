'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
// import dynamic from 'next/dynamic';

// const Map = dynamic(() => import('../Map'), {
//   ssr: false,
// });

function Dashboard({ data }) {
  const [visData, setVisData] = useState(data); //data
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

  console.log(weekHourCount);

  const radCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istrad : d.istrad)
    );
  }, [visData]);

  const fussCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istfuss : d.istfuss)
    );
  }, [visData]);

  const pkwCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istpkw : d.istpkw)
    );
  }, [visData]);

  const kradCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istkrad : d.istkrad)
    );
  }, [visData]);

  const sonstCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.istsonst2 : d.istsonst2)
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

  const dataTotal = data.length;

  // console.log('total', dataTotal);
  // console.log('visdata total', visDataTotal);

  // const accidentsTotal = rollup(athletes, v => d3.sum(v, d => d.earnings), d => d.sport)

  const numberData = useMemo(() => {
    return new Map([
      [
        'Fußgänger',
        fussCount.get('Unfall mit Fußgängerbeteiligung') || 0,
      ],
      ['Rad', radCount.get('Unfall mit Fahrradbeteiligung') || 0],
      [
        'Kraftrad',
        kradCount.get('Unfall mit Kraftradbeteiligung') || 0,
      ],
      ['PKW', pkwCount.get('Unfall mit PKW-Beteiligung') || 0],
      [
        'Sonstige',
        sonstCount.get(
          'Unfall mit Beteiligung eines anderen Verkehrsmittels'
        ) || 0,
      ],
    ]);
  }, [fussCount, radCount, kradCount, pkwCount, sonstCount]);

  const treemapDataArray = Array.from(
    numberData,
    ([name, value]) => ({ name, value })
  );

  console.log('numberdata', numberData);
  console.log('treemapdataarray', treemapDataArray);

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

  const numberValues = [
    fussCount.get('Unfall mit Fußgängerbeteiligung') || 0,
    radCount.get('Unfall mit Fahrradbeteiligung') || 0,
    kradCount.get('Unfall mit Kraftradbeteiligung') || 0,
    pkwCount.get('Unfall mit PKW-Beteiligung') || 0,
    sonstCount.get(
      'Unfall mit Beteiligung eines anderen Verkehrsmittels'
    ) || 0,
  ];

  const numberMax = max(numberValues);

  const numberExtentCounts = [0, max(numberValues)];

  const numberExtentCountsZero = [0, 1];

  const numberColorScale = scaleSequential(interpolateOranges).domain(
    numberExtentCounts[1] === 0
      ? numberExtentCountsZero
      : numberExtentCounts
  );

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

  // TODO: check client component in next
  // TODO: dataTotal/visDataTotal performance/correct use of useMemo
  // TODO: gkfz und sonstige mit reinnehmen? ja, als sonstige gesamt
  // TODO: BarChart / Axis abstraction
  // TODO: visData zu Beginn (data bzw. visData)
  // TODO: check d3 with react (useref, etc)
  // TODO: number abstraction
  // TODO: map cursor, zoom etc.
  // TODO: Erklärung fallzahl
  // TODO: transitions

  return (
    <div>
      {/* <Map data={data} setVisData={setVisData} /> */}
      <LeafletMap
        data={data}
        setVisData={setVisData}
        visData={visData}
      />
      <WeekHourHeatmap
        visData={visData}
        weekHourCount={weekHourCount}
      />
      <Number
        width={75}
        height={50}
        number={visDataTotal}
        label={'Gesamt'}
        colorScale={undefined}
        max={undefined}
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
  );
}

export default Dashboard;
