import * as d3 from 'd3';
import { useState, useEffect } from 'react';
import {fetchUserData} from './query'

export function CreateSkillBarChart() {

    useEffect(() => {
        const BarChart = async () => {
            const dataa =   await fetchUserData(query)
            const idata = dataa.user[0].transactions
           // console.log(dataa.user[0].transactions);
           const data = idata.reduce((acc, item) => {
            const type = item.type.replace("skill_", "");
            if (["algo", "go", "front-end", "back-end", "js", "prog"].includes(type)) {
              const existingItem = acc.find(i => i.type === type);
              if (existingItem) {
                existingItem.amount += item.amount;
              } else {
                acc.push({ type, amount: item.amount });
              }
            }
            return acc;
          }, []);



      // Get the unique skill types
      const skillTypes = [...new Set(data.map(d => d.type))];
    
      // Get the maximum value for scaling the chart
      const maxValue = d3.max(data, d => d.amount);
    
      // Set up the chart dimensions
const width = 355;
const height = 400;
const paddingLeft = 40;
const paddingBottom = 100;

// Create the SVG container
const svg = d3.select('.chart1')
  .attr('width', width + paddingLeft)
  .attr('height', height + paddingBottom);

// Create the x-scale
const x = d3.scaleBand()
  .range([paddingLeft, width - paddingLeft])
  .padding(0.1);

// Create the y-scale
const y = d3.scaleLinear()
  .range([height - paddingBottom, paddingLeft]);

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
  .attr('height', d => height - paddingBottom - y(d.amount))
  .attr('y', d => y(d.amount));

// Add the x-axis
svg.append('g')
  .attr('transform', `translate(0, ${height - paddingBottom})`)
  .call(d3.axisBottom(x));

// Add the y-axis
svg.append('g')
  .attr('transform', `translate(${paddingLeft}, 0)`)
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

  export function Matrices() {
  
    const [XPS, setXPS] = useState(0);
    const [Level, setLevel] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const XPdata = await fetchUserData(query1);
            setXPS(parseInt(XPdata.transaction_aggregate.aggregate.sum.amount));
    
            const Leveldata = await fetchUserData(query2);
            setLevel(parseInt(Leveldata.level[0].amount));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      let LevelTitle;
    if (Level < 12) {
LevelTitle = 'Aspiring developer'
    } else if (Level >= 12 && Level < 20) {
        LevelTitle = 'Beginner developer'   
    } else if (Level >= 20 && Level < 33) {
        LevelTitle = 'Apprentice developer'   
    } else if (Level >= 33 && Level < 42) {
        LevelTitle = 'Assistant developer'   
    } else if (Level >= 42 && Level < 50) {
        LevelTitle = 'Basic developer'   
    } else if (Level >= 50) {
        LevelTitle = 'Junior developer'   
    }
      return (
        <>
        <div className="circle-container">
          <h3 className='title'>{LevelTitle}</h3>
          <div className="circle">
            <span className="level-text">Level</span>
            <span className="level-number">{Level}</span>
          </div>
        </div>
        <div className='xps-container'>
          <div className='xps'>
            <h3 className="xps-title">Total XP</h3>
            <span className="xps-value">{formatXP(XPS)}</span>
          </div>
        </div>
      </>
      );
    };


    function formatXP(xp) {
        if (xp >= 1000000) {
          return `${(xp / 1000000).toFixed(1)}M`;
        } else if (xp >= 1000) {
          return `${(xp / 1000).toFixed(1)}k`;
        } else {
          return xp.toString();
        }
      }



//xps
const query1 = `query {
  transaction_aggregate(
    where: {
      event: { path: { _eq: "/bahrain/bh-module" } }
      type: { _eq: "xp" }
    }
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}`;

//level

const query2 = `query {
  level: transaction(
                             limit: 1
                             order_by: { amount: desc }
                             where: {
                                 userId: { _eq: 773 }
                                 type: { _eq: "level" }
                                 }
                             
                             ) { amount }
                         }
                         `;