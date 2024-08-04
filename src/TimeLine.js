import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'




export function Timeline() {

    useEffect(() => {
        const PieChart = async () => {
            const dataa =   await fetchUserData(query)
            console.log(dataa);

    const data = [
      {
        "amount": 34375,
        "type": "xp",
        "createdAt": "2024-01-21T16:48:57.464043+00:00",
        "path": "/bahrain/bh-module/lem-in"
      },
      {
        "amount": 76250,
        "type": "xp",
        "createdAt": "2024-04-21T20:02:52.592343+00:00",
        "path": "/bahrain/bh-module/forum"
      },
      {
        "amount": 19100,
        "type": "xp",
        "createdAt": "2024-04-30T07:35:48.704432+00:00",
        "path": "/bahrain/bh-module/image-upload"
      },
      {
        "amount": 10000,
        "type": "xp",
        "createdAt": "2024-06-04T09:11:22.838281+00:00",
        "path": "/bahrain/bh-module/math-skills"
      },
      {
        "amount": 147000,
        "type": "xp",
        "createdAt": "2024-06-10T14:13:07.327948+00:00",
        "path": "/bahrain/bh-module/make-your-game"
      },
      {
        "amount": 19100,
        "type": "xp",
        "createdAt": "2024-06-15T07:43:56.520606+00:00",
        "path": "/bahrain/bh-module/authentication"
      },
      {
        "amount": 19100,
        "type": "xp",
        "createdAt": "2024-06-22T13:39:42.462209+00:00",
        "path": "/bahrain/bh-module/advanced-features"
      }
    ];
      console.log("timeline");
// Set up the dimensions of the chart
var width = 300;
var height = 400;
var padding = { top: 100, right: 20, bottom: 50, left: 50 };

// Create the SVG container
var svg = d3.select(".chart2")
  .attr("width", width + padding.left + padding.right)
  .attr("height", height + padding.top + padding.bottom);

// Create the chart area within the SVG container
var chartArea = svg.append("g")
  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

// Create the scales for the x and y axes
var x = d3.scaleTime()
  .range([0, width]);
var y = d3.scaleLinear()
  .range([height, 0]);

// Set the domains for the scales
x.domain(d3.extent(data, function(d) { return new Date(d.createdAt); }));
y.domain([0, d3.max(data, function(d) { return d.amount; })]);

// Create the line generator
var line = d3.line()
  .x(function(d) { return x(new Date(d.createdAt)); })
  .y(function(d) { return y(d.amount); });

// Add the line to the chart
chartArea.append("path")
  .data([data])
  .attr("class", "line")
  .attr("d", line);

// Add the data points to the chart
var dots = chartArea.selectAll(".dot")
  .data(data)
  .enter().append("g")
  .attr("class", "dot")
  .attr("transform", function(d) {
    return "translate(" + x(new Date(d.createdAt)) + "," + y(d.amount) + ")";
  });

dots.append("circle")
  .attr("r", 5);

dots.append("text")
  .attr("class", "label")
  .attr("x", 10)
  .attr("y", 0)
  .attr("dy", ".35em")
  .text(function(d) { return d.path.split("/")[3]; });

// Add the x-axis
chartArea.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")));

// Add the y-axis
chartArea.append("g")
  .attr("class", "y-axis")
  .call(d3.axisLeft(y).tickFormat(d3.format(",.0f")));

// Add the y-axis label
chartArea.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Amount");

// Add the chart title
chartArea.append("text")
  .attr("x", width / 2)
  .attr("y", -40)
  .attr("text-anchor", "middle")
  .text("XP Over Time");
}
      PieChart();
}, []);
    }


    // timeline
    const query = `query {
  user {
    login
    timeline: transactions(
where: {type: {_eq: "xp"}, _and:[
{path: {
  _nlike: "%/bh-piscine/%"},
  _or: [
    {
      path:{_nlike: "%/piscine-js/%"
      }}
  ],_and:[{
      path:{_nlike: "%/checkpoint/%"
  }}]
    
  

}]}
) {

      amount
type
      createdAt
      path
    }
  }
}`;
