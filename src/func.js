import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'

export function AuditRatio() {
  useEffect(() => {
    const Auditratio = async () => {
    const data =   await fetchUserData(query1)
    console.log(data);

const userData = {
totalUp: parseFloat(data.user[0].totalUp),
totalDown: parseFloat(data.user[0].totalDown),
auditRatio: parseFloat(data.user[0].auditRatio)
};

const chartContainer = d3.select('.chart');
const totalWidth = 400;

  const upWidth = (userData.totalUp / (userData.totalUp + userData.totalDown)) * totalWidth;
  const downWidth = (userData.totalDown / (userData.totalUp + userData.totalDown)) * totalWidth;

  // console.log('Total width:', totalWidth);
  // console.log('Up width:', upWidth);
  // console.log('Down width:', downWidth);

  // Create the SVG elements
  chartContainer.append('rect')
    .attr('class', 'bar-down')
    .attr('width', downWidth)
    .attr('height', '50%')
    .attr('fill', 'red');

  chartContainer.append('rect')
    .attr('class', 'bar-up')
    .attr('x', downWidth)
    .attr('width', upWidth)
    .attr('height', '50%')
    .attr('fill', 'green');
    // Display the audit ratio

d3.select('.audit-ratio')
  .text(`Audit Ratio: ${userData.auditRatio.toFixed(5)}`)
  .style('left', `${downWidth - 50}px`);

    }

    Auditratio();
  }, []);

}
const query1 = `
       
query {
  user {
    id
    login
    auditRatio
    totalDown
    totalUp
    lastName
    firstName
  }
}
`;





  