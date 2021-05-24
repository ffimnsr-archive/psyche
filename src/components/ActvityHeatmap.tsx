/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as d3 from "d3";
import { useD3, D3BaseSelection } from "@/hooks/UseD3";

interface DataMap {
  [key: string]: string;
}

interface Item {
  startDate: number;
  dates: DataMap;
  maxCount: number;
}

interface Props {
  data: Item;
  startYear: number;
  endYear: number;
}

function ActivityHeatmap({ data, startYear, endYear }: Props): JSX.Element {
  const ref = useD3((svg) => {
    const height = 900;
    const width = 110;
    const dx = 35;
    const cellSize = 14;
    const numOfColors = 6;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const formatColor = d3
      .scaleQuantize<string, never>()
      .domain([0, data.maxCount])
      .range(d3.range(numOfColors).map((d) => `color${d}`));

    const heatmapSvg = d3
      .select(".r-heatmap")
      .selectAll("svg.heatmap")
      .enter()
      .append("svg")
      .data(d3.range(startYear, endYear))
      .enter()
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "color");

    const dates = Object.keys(data.dates);
    const rect = heatmapSvg.append("g").attr("transform", `translate(${dx}, 0)`);

    rect
      .append("text")
      .attr("transform", `translate(-9, ${cellSize * 3.5}) rotate(-90)`)
      .style("text-anchor", "middle")
      .text((d) => d);

    rect
      .selectAll(".day")
      .data((d) => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", (d) => parseInt(d3.timeFormat("%U")(d)) * cellSize)
      .attr("y", (d) => d.getDay() * cellSize)
      .attr("data-toggle", "tooltip")
      .datum(d3.timeFormat("%Y-%m-%d"))
      .attr("title", (d) => {
        const countData = data.dates[d];
        const date = d3.timeFormat("%b %d, %Y")(new Date(d));
        if (!countData || !countData.count) return `No contribution on ${date}`;
        else if (countData.count === 1) return `1 contribution on ${date}`;
        else return `${countData.count} posts on ${date}`;
      })
      .attr("date", (d) => d)
      // .call(() => $("[data-toggle='tooltip'").tooltip({
      //     container: "body",
      //     placement: "top",
      //     position: { my: "top" },
      //   }),
      // )
      .filter((d) => dates.indexOf(d) > -1)
      .attr("class", (d) => `day ${formatColor(data.dates[d].count)}`);

    d3.select(".r-month")
      .selectAll("svg.months")
      .enter()
      .append("svg")
      .data([1])
      .enter()
      .append("svg")
      .attr("width", 800)
      .attr("height", 20)
      .append("g")
      .attr("transform", "translate(0, 10)")
      .selectAll(".month")
      .data(() => d3.range(12))
      .enter()
      .append("text")
      .attr("x", (d) => d * (4.5 * cellSize) + dx)
      .text((d) => d3.timeFormat("%b")(new Date(0, d + 1, 0)));

    d3.select(".r-legend")
      .selectAll("svg.legend")
      .enter()
      .append("svg")
      .data([1])
      .enter()
      .append("svg")
      .attr("width", 800)
      .attr("height", 20)
      .append("g")
      .attr("transform", "translate(644, 0)")
      .selectAll(".legend-grid")
      .data(() => d3.range(7))
      .enter()
      .append("rect")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", (d) => d * cellSize + dx)
      .attr("class", (d) => `day color${d - 1}`);
  }, []);

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

export default ActivityHeatmap;
