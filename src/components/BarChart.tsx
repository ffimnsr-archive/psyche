/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as d3 from "d3";
import { useD3, D3BaseSelection } from "../hooks/UseD3";

interface DataItem {
  year: number;
  sales: number;
}

interface Props {
  data: DataItem[];
}

function BarChart({ data }: Props): JSX.Element {
  const ref = useD3(
    (svg) => {
      const height = 400;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand<number>()
        .domain(data.map((d: DataItem) => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => (d.sales as any) ?? 0)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g: D3BaseSelection) => {
        const p = d3.extent(x.domain());
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(p[0] ?? 0, p[1] ?? 0, width / 40)
                .filter((v) => x(v) !== undefined),
            )
            .tickSizeOuter(0),
        );
      };

      const y1Axis = (g: D3BaseSelection) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g: D3BaseSelection) => g.select(".domain").remove())
          .call((g: D3BaseSelection) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text("Hello"),
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.year) ?? 0)
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.sales))
        .attr("height", (d) => y1(0) - y1(d.sales));
    },
    [data.length],
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 400,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;
