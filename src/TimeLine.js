import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'




export function Timeline() {

    useEffect(() => {
        const PieChart = async () => {
            const dataa =   await fetchUserData(query)
            console.log(dataa);
            const data= dataa.user[0].timeline;
            data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      console.log("timeline");
// Set up the dimensions of the chart
var width = 1100;
var height = 340;
var padding = { top: 100, right: 100, bottom: 50, left: 50 };

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
      path:{_nlike: "%/piscine-js%"
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
