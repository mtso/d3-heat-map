import {
  dataUrl,
  width,
  height
} from '../config'

const d3 = require('d3')

d3.select('body')
  .append('svg')

const display = function() {
  let data = JSON.parse(this.responseText)
  console.log(data)
}

let request = new XMLHttpRequest()
request.addEventListener('load', display)
request.open('GET', dataUrl)
request.send()