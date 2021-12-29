const scatter_data = d3.csv('name_len.csv').then(scatter_data=> {
  
    //Dimension (Setting up SVG and the group element)
    
    let dimensions = {
        width: 800,
        height: 600,
        margin: {
          top: 100,
          bottom: 100,
          left: 170,
          right: 50
        }
      }
    
    const svg=d3.select("#scatter")
                .append('svg')
                .attr('width', dimensions.width)
                .attr('height', dimensions.height)
            
    const container = svg.append('g')
                         .attr('transform',`translate(${dimensions.margin.left},${dimensions.margin.top})`)
    
    
    //Scales
    containerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    containerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
    
    const xScale = d3.scaleLinear()
                     .domain([1, 15])
                     .rangeRound([0,containerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 10000])
        .rangeRound([containerHeight,0])
    
    
    // X Axis and Label
    const xAxis = d3.axisBottom(xScale)
                        
    
    const xAxisGroup = container.append('g')
                          .attr("transform", `translate(0, ${containerHeight})`)
                          .call(xAxis)
    
    container.append('text')
         .attr('x',containerWidth/2)
         .attr('y',containerHeight+50)
         .attr('font-size','20px')
         .attr('text-anchor','middle')
         .attr("font-family", "Khula")
         .text("Number of Characters")
    
    
    //Y Axis and Label
    const yAxis = d3.axisLeft(yScale)
    
    const yAxisGroup = container.append('g')
                                .call(yAxis)
                                .selectAll("text")
                                .attr("font-family", "Khula")
                                .attr('font-size','15px')
    
    
    
    container.append('text')
         .attr('x',-containerHeight/2)
         .attr('y',-80)
         .attr('font-size','20px')
         .attr('text-anchor','middle')
         .attr('transform','rotate(-90)')
         .attr("font-family", "Khula")
         .text('Number of Names')
    
    
    
    //Title
    svg.append('text')
             .attr('x',450)
             .attr('y',50)
             .attr('font-size','30px')
             .attr('font-weight','bold')
             .attr('text-anchor','middle')
             .attr("font-family", "Khula")
             .text("What is the Average Length of a Name?")

    // create a tooltip
    var Tooltip = d3.select("#scatter")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
    
    
    //Data         
    container.selectAll('circle')
             .data(scatter_data)
             .join('circle')
             .attr('cy', d => yScale(d.count))
             .attr('cx', d=> xScale(d.length))
             .attr('r', 6)
             .attr('fill','#8cc74e')
             .on("mouseenter", function(d) {
              d3.select(this)
                .attr("fill", "#64bdb1")
                .style("stroke", "#992a5b")
                .style("stroke-width", 1)  
              d3.select("svg")
                .append("text")
                .attr('x', xScale(d.length))
                .attr('y', yScale(d.count))
                .attr("id", "barLabels")
                .attr("font-size", "12px")
                .text("Count: " + d.Count)
            })
            .on("mouseleave", function(d) {
              d3.select(this)
                .attr("fill", '#8cc74e')
                .style("stroke-width", 0)  
              d3.select("svg")
                .select("#barLabels")
                .remove()
            })
            
    
    
    })