//Data
const data= d3.csv('popular_names.csv').then(data=> {
    data.forEach(d=>{
        d.name = d.Name
        d.count = d.Count 
    })

//Dimension (Setting up SVG and the group element)

let dimensions = {
    width: 1000,
    height: 800,
    margin: {
      top: 100,
      bottom: 200,
      left: 150,
      right: 50
    }
  }

const svg=d3.select("#chart")
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)
        
const container = svg.append('g')
                     .attr('transform',`translate(${dimensions.margin.left},${dimensions.margin.top})`)


//Scales
containerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
containerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

const xScale = d3.scaleBand()
                 .domain(data.map(d=>d.name))
                 .range([0,containerWidth])
                 .paddingInner(0.3)
                 .paddingOuter(0.2)


const yScale = d3.scaleLinear()
    .domain([0, 18000])
    .rangeRound([containerHeight,0])
    

// X Axis and Label
    const xAxis = d3.axisBottom(xScale)
                    

    const xAxisGroup = container.append('g')
                          .attr("transform", `translate(0, ${containerHeight})`)
                          .call(xAxis)
                          .selectAll("text")
                          .attr("y", "10")
                          .attr("x", "-5")
                          .attr("text-anchor", "end")
                          .attr("font-family", "Khula")
                          .attr("transform", "rotate(-40)")
                          .attr('font-size','15px')

container.append('text')
         .attr('x',containerWidth/2)
         .attr('y',containerHeight+120)
         .attr('font-size','20px')
         .attr('text-anchor','middle')
         .attr("font-family", "Khula")
         .text('Name')

 
//Y Axis and Label
    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(d => d )

    const yAxisGroup = container.append('g')
                                .call(yAxis)
                                .selectAll("text")
                                .attr("font-family", "Khula")
                                .attr('font-size','15px')


// Y Label
container.append('text')
         .attr('x',-containerHeight/2)
         .attr('y',-60)
         .attr('font-size','20px')
         .attr('text-anchor','middle')
         .attr('transform','rotate(-90)')
         .attr("font-family", "Khula")
         .text('Count')

//Add data

container.selectAll('rect')
         .data(data)
         .join('rect')
         .attr('x', (d)=>xScale(d.name))
         .attr('width', xScale.bandwidth)
         .attr('fill', "#d16363")
         .attr("width", xScale.bandwidth)
            .attr("y",  d => yScale(d.count))
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay(function (d, i) {
                    return i * 150;
                })
        .attr("y",  d => yScale(d.count))
        .attr("height", d => containerHeight - yScale(d.count));

//Title
container.append('text')
         .attr('x',containerWidth/2)
         .attr('y',10)
         .attr('font-size','30px')
         .attr('font-weight','bold')
         .attr('text-anchor','middle')
         .attr("font-family", "Khula")
         .text('Top Baby Girl Names in 2020')
})