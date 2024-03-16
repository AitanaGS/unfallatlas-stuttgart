import dataJSON from '../../data/processed/accidents.json';
import { AnimationProvider } from '@/context/AnimationContext';

import React from 'react';
import dynamic from 'next/dynamic';
import { timeParse } from 'd3-time-format';

const Dashboard = dynamic(() => import('../components/Dashboard'), {
  ssr: false,
});

export default function Home() {
  const parseDate = timeParse('%Y-%m-%d');

  const initialData = dataJSON.map((d) => {
    return {
      ...d,
      datum: parseDate(d.datum),
    };
  });

  return (
    <main>
      {initialData && (
        <AnimationProvider>
          <Dashboard data={initialData} />
        </AnimationProvider>
      )}
    </main>
  );
}
