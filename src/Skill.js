import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'

export function CreateSkillBarChart() {

    useEffect(() => {
        const BarChart = async () => {
            const dataa =   await fetchUserData(query)
            const data = dataa.user[0].transactions
           // console.log(dataa.user[0].transactions);

      // Get the unique skill types
      const skillTypes = [...new Set(data.map(d => d.type))];
    
      // Get the maximum value for scaling the chart
      const maxValue = d3.max(data, d => d.amount);
    
      // Set up the chart dimensions
      const width = 245;
      const height = 400;
      const padding = 20;
      //console.log("hi");
    
      // Create the SVG container
      const svg = d3.select('.chart1')
        .attr('width', width)
        .attr('height', height);
    
      // Create the x-scale
      const x = d3.scaleBand()
        .range([padding, width - padding])
        .padding(0.1);
    
      // Create the y-scale
      const y = d3.scaleLinear()
        .range([height - padding, padding]);
    
      // Set the domains for the scales
      x.domain(skillTypes);
      y.domain([0, maxValue]);
    
      // Create the bars
      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.type))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.amount))
        .attr('y', d => y(d.amount));
    
      // Add the x-axis
      svg.append('g')
        .attr('transform', `translate(0, ${height - padding})`)
        .call(d3.axisBottom(x));
    
      // Add the y-axis
      svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .call(d3.axisLeft(y));
  
           }
           BarChart();
}, []);

}


const query = `query {
    user {
        transactions (
               where: { type: { _like: "skill_%" }}
        )
        {
            type
            amount
        }
    }
  }`;
    