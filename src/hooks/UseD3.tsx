/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export type D3BaseSelection = d3.Selection<any, any, any, any>;

export const useD3 = (
  renderChartFn: (arg0: D3BaseSelection) => void,
  deps: React.DependencyList,
): any => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current ? renderChartFn(d3.select(ref.current)) : {};
    return () => {
      // do nothing
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderChartFn, ...deps]);

  return ref;
};
