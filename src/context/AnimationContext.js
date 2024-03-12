'use client';
import React, { createContext, useState, useEffect } from 'react';

const AnimationContext = createContext();

const AnimationProvider = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const listener = (event) => {
      setReduceMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);
    setReduceMotion(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  const springConfig = {
    mass: 1,
    tension: reduceMotion ? 0 : 120,
    friction: reduceMotion ? 0 : 20,
  };

  return (
    <AnimationContext.Provider value={{ reduceMotion, springConfig }}>
      {children}
    </AnimationContext.Provider>
  );
};

export { AnimationProvider, AnimationContext };
