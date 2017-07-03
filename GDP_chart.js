const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
$.ajax({url: url})
.done(function(res){	
	const info = JSON.parse(res);
	const arr = info.data;
	const h = 700;
	const w = 1500;
	const padding = 45;
	const xScale = d3.scaleTime()
                     .domain([new Date(arr[arr.length-1][0]), new Date(arr[0][0])])//
                     .range([w-padding, padding]);
	const yScale = d3.scaleLinear()
                     .domain([0, d3.max(arr, (d) => d[1])])
                     .range([h-padding, padding]);
	const svg = d3.select('div.chart')
				  .append('svg')
				  .attr('width', w)
				  .attr('height', h);
	
	svg.selectAll('rect')
	.data(arr)
	.enter()
	.append('rect')
	.attr('class', 'bar')
	.attr('fill', '#344F63')
	.attr('width', '4')
	.attr('x', (d, i) => xScale(new Date(d[0])))
	.attr('y', (d) => yScale(d[1]))
	.attr('height', (d) => h - yScale(d[1])-padding)
	.append('title')
	.text((d) => d3.timeFormat('%B, %Y')(new Date(d[0].slice(0,4), (d[0].slice(6,7) -1))) + '\n$' + d[1].toFixed(2) + ' Billion');
	
	const xAxis = d3.axisBottom(xScale);
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
	 
	const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform", "translate("+ (padding) +" ,0 )")
       .call(yAxis);

});