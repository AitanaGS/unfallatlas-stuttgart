// import Image from 'next/image';
// import styles from './page.module.css';
// import Map from '../components/Map';
// import React, { useEffect, useState } from 'react';
import React from 'react';
import dataJSON from '../../data/processed/accidents.json';
// import Dashboard from '@/components/Dashboard/';
import dynamic from 'next/dynamic';
// import { json } from 'd3-fetch';
import { timeParse } from 'd3-time-format';

const Dashboard = dynamic(() => import('../components/Dashboard'), {
  ssr: false,
});

// const DATAPATH = '../../data/processed/accidents.json';

export default function Home() {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   json(DATAPATH).then((data) => {
  //     setData(data);
  //     setLoading(false);
  //   });
  // }, []);

  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const dataUrl = '../../data/processed/accidents.json';

  //   json(dataUrl).then((data) => {
  //     setData(data);
  //     setLoading(false);
  //   });
  // }, []);

  // const parseDate = timeParse('%Y-%m-%d');
  // const data = new Promise(function (resolve) {
  //   dataJSON.forEach(function (d) {
  //     d.datum = parseDate(d.datum);
  //   });
  //   resolve(dataJSON);
  // });

  // const dataUrl = '../../data/processed/accidents.json';

  // const data = json(dataUrl).then((data) => {
  //   return data.map((d) => {
  //     return {
  //       ...d,
  //       datum: parseDate(d.datum),
  //     };
  //   });
  // });

  // const data = dataJSON.then(function (data) {
  //   // Parse dates in the loaded data
  //   return dataJSON.map((d) => {
  //     return {
  //       ...d,
  //       datum: parseDate(d.datum),
  //     };
  //   });
  // });

  const parseDate = timeParse('%Y-%m-%d');
  const data = dataJSON.map((d) => {
    return {
      ...d,
      datum: parseDate(d.datum),
    };
  });

  //   const [visData, setVisData] = useState(() => {
  //   return data.map((d) => {
  //     return {
  //       ...d,
  //       datum: parseDate(d.datum),
  //     };
  //   });
  // }); //data

  return (
    <main>
      {data && <Dashboard data={data} />}

      {/* {loading && <div>Loading...</div>} */}
      {/* {!loading && <Dashboard data={data} />} */}

      {/* {!data && <p>Loading...</p>} */}
      {/* className={styles.main} */}
      {/* {!data && <p>loading...</p>} */}
      {/* {data && <Dashboard data={data} />} */}
      {/* {data && <Dashboard data={data} />} */}

      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
