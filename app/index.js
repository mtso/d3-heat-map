import {
  dataUrl,
  width,
  height,
  padding
} from '../config'

const d3 = require('d3')

document.body.style.cssText = `
  background-color:lightgray;
  width:100%;
  text-align: center;
  margin: 0;
  font-family: monospace;
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

  let xScale = d3.scaleLinear()
    .domain([minYear, maxYear])
    .range([padding, width - padding])

  sg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', gray)
}

// let request = new XMLHttpRequest()
// request.addEventListener('load', display)
// request.open('GET', dataUrl)
// request.send()

let fakeReq = new function() {
  this.responseText = JSON.stringify(require('../global-temperature'))
  this.display = display.bind(this)
}()
fakeReq.display()