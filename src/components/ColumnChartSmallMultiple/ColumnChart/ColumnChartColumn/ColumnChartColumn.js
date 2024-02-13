import React, { useEffect, useState, useContext } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { COLORS } from '@/utils/constants';
// import { SpringConfigContext } from '@/contextProvider/SpringConfigContextProvider';
import { AnimationContext } from '@/context/AnimationContext';

function ColumnChartColumn({
  monat,
  innerHeight,
  yScale,
  monthData,
  xScale,
  maxValue,
}) {
  // const spring = useSpring({
  //   from: {
  //     // y: 0,
  //     // y: yScale(monthData.get(d) || 0),
  //     y: innerHeight, // innerHeight
  //     height: 0,
  //   },
  //   to: {
  //     y: yScale(monthData),
  //     // y: yScale(monthData.get(monat) || 0),
  //     // height: innerHeight - yScale(monthData.get(monat) || 0),
  //     height: innerHeight - yScale(monthData),
  //     // height: Math.max(
  //     //   innerHeight - yScale(monthData.get(monat) || 0),
  //     //   0
  //     // ),
  //     // y: Math.min(yScale(monthData.get(monat) || 0), innerHeight),
  //     // height: Math.max(
  //     //   innerHeight - yScale(monthData.get(monat) || 0),
  //     //   0
  //     // ),
  //   },
  //   // config: {
  //   //   friction: 10,
  //   // },
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });

  // const springConfig = React.useContext(SpringConfigContext);
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    from: {
      y: innerHeight,
      height: 0,
    },
    to: {
      y: yScale(monthData),
      height: innerHeight - yScale(monthData),
    },
    config: springConfig,
    immediate: reduceMotion,
  });

  // const spring = useSpring({
  //   from: {
  //     y: innerHeight,
  //     height: 0,
  //   },
  //   to: async (next, cancel) => {
  //     await next({
  //       y: yScale(monthData),
  //       height: innerHeight - yScale(monthData),
  //       config: springConfig,
  //     }); // Smooth transition for non-reduced motion
  //     if (reduceMotion) {
  //       await next({ immediate: true }); // Apply properties immediately for reduced motion
  //     }
  //   },
  //   config: config.default, // Default config for smoother transition
  // });

  // const [isAnimating, setIsAnimating] = useState(false);

  // const [springs, api] = useSpring(() => ({
  //   from: { y: innerHeight, height: 0 },
  //   onRest: () => setIsAnimating(false),
  // }));
  // const [springs, api] = useSpring(
  //   () => ({
  //     from: {
  //       // y: 0,
  //       // y: yScale(monthData.get(d) || 0),
  //       y: innerHeight, // innerHeight
  //       height: 0,
  //     },
  //     to: {
  //       y: yScale(monthData.get(monat) || 0),
  //       height: innerHeight - yScale(monthData.get(monat) || 0),
  //     },
  //   }),
  //   [monthData]
  // );

  // const [springs, api] = useSpring(
  //   () => ({
  //     from: {
  //       // y: 0,
  //       // y: yScale(monthData.get(d) || 0),
  //       y: innerHeight,
  //       height: 0,
  //     },
  //     // to: {
  //     //   y: yScale(monthData.get(monat) || 0),
  //     //   height: innerHeight - yScale(monthData.get(monat) || 0),
  //     // },
  //   }),
  //   [monthData]
  // );

  // useEffect(() => {
  //   api.start({
  //     from: {
  //       // y: 0,
  //       // y: yScale(monthData.get(d) || 0),
  //       y: innerHeight,
  //       height: 0,
  //     },
  //     to: {
  //       y: yScale(monthData.get(monat) || 0),
  //       height: innerHeight - yScale(monthData.get(monat) || 0),
  //     },
  //   });
  // }, [monthData]); // , innerHeight, monat, yScale, api
  // console.log(
  //   'monat',
  //   monat,
  //   'springs y',
  //   springs.y,
  //   'springs height',
  //   springs.height
  // );
  // console.log(
  //   'monthdata',
  //   monthData,
  //   'monthdata get monat',
  //   monthData.get(monat),
  //   'yscale',
  //   yScale(monthData.get(monat))
  // );

  // useEffect(() => {
  //   api.start({
  //     from: {
  //       // y: 0,
  //       // y: yScale(monthData.get(d) || 0),
  //       y: innerHeight,
  //       height: 0,
  //     },
  //     to: {
  //       y: yScale(monthData.get(monat) || 0),
  //       height: innerHeight - yScale(monthData.get(monat) || 0),
  //     },
  //   });
  // }, [monthData]);

  // TODO: bars out of chart when rapid zooming
  // TODO: check friction value in config of usespring (because of overshooting, see above)
  // TODO: check error because of negative height (appears only when friction is on)
  // TODO: condition afte rreturn necessary (console errors)?
  // TODO: monthdata.get(monat) > 0 && notwendig?

  return (
    // monthData.get(monat) > 0 && (
    <animated.rect
      // {...springs}
      x={xScale(monat)}
      // y={yScale(monthData.get(monat) || 0)} //yScale(monthData.get(d) || 0)
      width={xScale.bandwidth()}
      // height={innerHeight - yScale(monthData.get(monat) || 0)} //innerHeight - yScale(monthData.get(d) || 0)
      fill={COLORS.yellowOrange.medium}
      // y={reduceMotion ? yScale(monthData) : spring.y}
      y={spring.y}
      height={
        reduceMotion ? innerHeight - yScale(monthData) : spring.height
      }
      // height={spring.height}
      // y={yScale(monthData)}
      // height={innerHeight - yScale(monthData)}
    />
    // <rect
    //   x={xScale(monat)}
    //   y={yScale(monthData.get(monat) || 0)} //yScale(monthData.get(d) || 0)
    //   width={xScale.bandwidth()}
    //   height={innerHeight - yScale(monthData.get(monat) || 0)} //innerHeight - yScale(monthData.get(d) || 0)
    //   fill="#69b3a2"
    // />
    // )
  );
}

export default ColumnChartColumn;
