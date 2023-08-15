'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { rollup, sum } from 'd3-array';

import Map from '../Map';
import BarChart from '../BarChart';
import LichtBarChart from '../LichtBarChart';
import StrasseBarChart from '../StrasseBarChart';
import Number from '../Number';
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

  // TODO: check client component in next
  // TODO: dataTotal/visDataTotal performance/correct use of useMemo
  // TODO: gkfz und sonstige mit reinnehmen? ja, als sonstige gesamt
  // TODO: BarChart / Axis abstraction
  // TODO: visData zu Beginn (data bzw. visData)
  return (
    <div>
      {/* <Map data={data} setVisData={setVisData} /> */}
      <Map data={data} setVisData={setVisData} visData={visData} />
      <Number
        width={75}
        height={50}
        number={visDataTotal}
        label={'Gesamt'}
      />
      <Number
        width={75}
        height={50}
        number={fussCount.get('Unfall mit Fußgängerbeteiligung')}
        label={'Fußgänger'}
      />
      <Number
        width={75}
        height={50}
        number={radCount.get('Unfall mit Fahrradbeteiligung')}
        label={'Rad'}
      />
      <Number
        width={75}
        height={50}
        number={kradCount.get('Unfall mit Kraftradbeteiligung')}
        label={'Kraftrad'}
      />
      <Number
        width={75}
        height={50}
        number={pkwCount.get('Unfall mit PKW-Beteiligung')}
        label={'PKW'}
      />
      <Number
        width={75}
        height={50}
        number={sonstCount.get(
          'Unfall mit Beteiligung eines anderen Verkehrsmittels'
        )}
        label={'Sonstige'}
      />
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
