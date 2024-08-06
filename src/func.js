import * as d3 from 'd3';
import  { useEffect } from 'react';
import {fetchUserData} from './query'
import {formatXP} from './Skill'

export function AuditRatio() {
  useEffect(() => {
    const Auditratio = async () => {
    
const data =   await fetchUserData(query1)
console.log(data);
const usernameElement = document.querySelector('.username');

// Set the text content of the <h1> element
usernameElement.textContent = `${data.user[0].firstName} ${data.user[0].lastName} Profile`;


const userData = {
totalUp: parseFloat(data.user[0].totalUp),
totalDown: parseFloat(data.user[0].totalDown),
auditRatio: parseFloat(data.user[0].auditRatio)
};

const totalWidth = 300;

const chartContainer = d3.select('.hbar1');

  const upWidth = (userData.totalUp / (userData.totalUp + userData.totalDown)) * totalWidth;
  const downWidth = (userData.totalDown / (userData.totalUp + userData.totalDown)) * totalWidth;

  // Create the SVG elements
  chartContainer.append('rect')
    .attr('class', 'bar-down')
    .attr('width', downWidth)

  chartContainer.append('rect')
    .attr('class', 'bar-up')
    .attr('x', downWidth)
    .attr('width', upWidth)
    // Display the audit ratio

d3.select('.audit-ratio')
  .text(`Audit Ratio: ${userData.auditRatio.toFixed(2)}`)
  .style('left', `${downWidth - 50}px`);

  const Up1 = document.querySelector('.Done');

// Set the text content of the <h1> element
Up1.textContent = `Done: ${formatXP(userData.totalUp)} px`;

const Down1 = document.querySelector('.Received');

// Set the text content of the <h5> element
Down1.textContent = `Received: ${formatXP(userData.totalDown)} px`;



const data2 =   await fetchUserData(query2)
console.log(data2);

const totalDown2= parseFloat(data2.audit_aggregate.aggregate.count);

const data3 =   await fetchUserData(query3)
console.log(data3);

const totalUp2 = parseFloat(data3.audit_aggregate.aggregate.count);

const auditRatio2 = totalUp2/totalDown2;


const chartContainer2 = d3.select('.hbar2');

  const upWidth2 = (totalUp2 / (totalUp2 + totalDown2)) * totalWidth;
  const downWidth2 = (totalDown2 / (totalUp2 + totalDown2)) * totalWidth;

  // Create the SVG elements
  chartContainer2.append('rect')
    .attr('class', 'bar-down')
    .attr('width', downWidth2)
    .attr('height', '50%')

  chartContainer2.append('rect')
    .attr('class', 'bar-up')
    .attr('x', downWidth2)
    .attr('width', upWidth2)
    .attr('height', '50%')
    // Display the audit ratio

d3.select('.audit-ratio2')
  .text(`Projects PASS and FAIL ratio: ${auditRatio2.toFixed(2)}`)
  .style('left', `${downWidth2 - 50}px`);

  const Up2 = document.querySelector('.Done2');

  // Set the text content of the <h1> element
  Up2.textContent = `Pass: ${formatXP(totalUp2)}`;
  
  const Down2 = document.querySelector('.Received2');
  
  // Set the text content of the <h5> element
  Down2.textContent = `Fail: ${formatXP(totalDown2)}`;

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


const query2 = `
query  {
  audit_aggregate(where: { grade: { _lte: "1" } }) {
      aggregate {
          count
      }
  }
}`;

const query3 = `  query  {
  audit_aggregate(where: { grade: { _gte: "1" } }) {
      aggregate {
          count
      }
  }
} `;





  