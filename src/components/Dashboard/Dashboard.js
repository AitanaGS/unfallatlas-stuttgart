'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { rollup, sum } from 'd3-array';

import Map from '../Map';
import BarChart from '../BarChart';
import Number from '../Number';
// import dynamic from 'next/dynamic';

// const Map = dynamic(() => import('../Map'), {
//   ssr: false,
// });

function Dashboard({ data }) {
  const [visData, setVisData] = useState(data);
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

  console.log('total', dataTotal);
  console.log('visdata total', visDataTotal);

  // const accidentsTotal = rollup(athletes, v => d3.sum(v, d => d.earnings), d => d.sport)

  const kategBarChartWidth = 400;

  const kategBarChartHeight = 300;

  const kategBarChartMargin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 180,
  };

  // TODO: check client component in next
  // TODO: dataTotal/visDataTotal performance/correct use of useMemo
  return (
    <div>
      {/* <Map data={data} setVisData={setVisData} /> */}
      <Map data={data} setVisData={setVisData} />
      <Number
        width={75}
        height={50}
        number={visDataTotal}
        label={'Gesamt'}
      />
      <BarChart
        width={kategBarChartWidth}
        height={kategBarChartHeight}
        margin={kategBarChartMargin}
        variableCount={kategCount}
        dataTotal={dataTotal}
        visDataTotal={visDataTotal}
      />
    </div>
  );
}

export default Dashboard;
