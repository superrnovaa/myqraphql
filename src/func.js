import * as d3 from 'd3';


export function auditRatio(){
    // Assuming you have the data from the GraphQL query
    console.log("kkkk");
    const userData = {
      totalUp: 100,
      totalDown: 50,
      auditRatio: 0.75
    };
  
    // Get the chart container
    const chartContainer = d3.select('.chart');
  
    // Calculate the widths of the bars
    const totalWidth = 400; // Total width of the chart
    const upWidth = (userData.totalUp / (userData.totalUp + userData.totalDown)) * totalWidth;
    const downWidth = (userData.totalDown / (userData.totalUp + userData.totalDown)) * totalWidth;
  
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
      .text(`Audit Ratio: ${userData.auditRatio.toFixed(2)}`)
      .style('left', `${downWidth - 50}px`);
  }
  
  export async function fetchUserData() {
      console.log("pppp");
      try {
        const query = `
       
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
  
        const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({ query }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.data.user[0].id);
      
        } else {
          const errorData = await response.json();
          console.error('Error fetching user data:', errorData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    export function createSkillBarChart(data) {
       // console.log("wwww");
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
          .append('svg')
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
  

     export function timeline(data) {
        console.log("ppp");
        // Set up the SVG container
        const width = 600;
        const height = 400;
        const padding = 40;
      
        const svg = d3.select(".chart2")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
      
        // Calculate the total amount
        const totalAmount = d3.sum(data, d => d.amount);
      
        // Create the pie chart
        const pie = d3.pie()
          .value(d => d.amount);
      
        const arc = d3.arc()
          .outerRadius(Math.min(width, height) / 2 - padding)
          .innerRadius(0);
      
        const g = svg.selectAll(".arc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "arc")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);
      
        g.append("path")
          .attr("d", arc)
          .attr("fill", (d, i) => d3.schemeCategory10[i]);
      
        // Add labels
        g.append("text")
          .attr("transform", d => `translate(${arc.centroid(d)})`)
          .attr("dy", ".35em")
          .text(d => {
            const pathParts = d.data.path.split('/');
            return `${pathParts[pathParts.length - 1]}: ${((d.data.amount / totalAmount) * 100).toFixed(2)}%`;
          });
        // Add chart title
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", padding / 2)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .text("Path and Amount");
      }
      const data2 = [
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
      timeline(data2);