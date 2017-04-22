import {
  dataUrl,
  width,
  height,
  padding,
  color,
  months,
} from '../config'

const d3 = require('d3')
const d3tip = require('d3-tip')

// purple 75 57 145
// red 138 0 51

document.body.style.cssText = `
  background-color:lightgray;
  width:100%;
  text-align: center;
  margin: 0;
`

let sg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color', 'white')
  .style('margin', '2em auto')

const display = function() {
  let data = JSON.parse(this.responseText)
  console.log(data)

  // x axis: years
  // y axis: months

  let base = data.baseTemperature
  data = data.monthlyVariance
  let minYear = d3.min(data, d => d.year)
  let maxYear = d3.max(data, d => d.year)
  let minMonth = d3.min(data, d => d.month)
  let maxMonth = d3.max(data, d => d.month)

  let minVariance = d3.min(data, d => d.variance)
  let maxVariance = d3.max(data, d => d.variance)
  const deltaVariance = Math.abs(maxVariance - minVariance)

  function value(v, percent) {
    let diff = color.hot[v] - color.cold[v]
    return Math.floor(color.cold[v] + diff * percent)
  }

  function heat(variance) {
  	// let red = { r: 75, g: 57, b: 145 }
  	// let purple = { r: 138, g: 0, b: 51 }
  	let percent = (variance + Math.abs(minVariance)) / deltaVariance
  	let color = 'rgba(' + [
  	  value('r', percent),
  	  value('g', percent),
  	  value('b', percent)
  	].join(',') + ',1)'
	return color
  }

  let xScale = d3.scaleLinear()
    .domain([minYear, maxYear])
    .range([padding, width - padding])

  let yScale = d3.scaleLinear()
    .domain([minMonth, maxMonth])
    .range([padding, height - padding * 1.5])

  let xAxis = d3.axisBottom(xScale)
  let yAxis = d3.axisLeft(yScale)
    .tickFormat((_, i) => months[i])

  let tip = d3tip()
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:red'>" + d.month + "</span>";
    })

  let bounds = {
  	width: width - padding * 2,
  	height: height - padding * 2
  }

  sg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.year))
    .attr('y', d => yScale(d.month))
    .attr('width', bounds.width / (maxYear - minYear) )
    .attr('height', bounds.height / (maxMonth - minMonth) - 4)
    .attr('fill', d => heat(d.variance))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  
  sg.call(tip)

  sg.append('g')
    .attr('transform', 'translate(0,' + (height - padding) + ')')
    .call(xAxis)

  let yAxisLabel = sg
    .append('g')
    .attr('transform', 'translate(' + padding + ',' + (padding * 0.21) +')')
    .call(yAxis)
  
  yAxisLabel.selectAll('line')
    .remove()
  yAxisLabel.selectAll('path')
    .remove()
}

let request = new XMLHttpRequest()
request.addEventListener('load', display)
request.open('GET', dataUrl)
request.send()

// Use when offline and cannot access data url.
// let offlineReq = new function() {
//   this.responseText = JSON.stringify(require('../offline/global-temperature'))
//   this.display = display.bind(this)
// }()
// offlineReq.display()