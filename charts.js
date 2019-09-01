const barChart = (dataSouce) => {
  const data = buildDataFormat(dataSouce);
  const margin = {
    top: 15,
    right: 60,
    bottom: 15,
    left: 104
  };

  const width = 480 - margin.left - margin.right,
    height = 200;

  const heightBar = 8;
  const svg = d3.select('#bar-chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'bar-chart')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const x_scale = d3.scaleLinear()
    .range([0, width - margin.right])
    .domain([0, d3.max(data.info, (d) => d.value)]);

  const y_scale = d3.scaleBand()
    .rangeRound([height, 0], 0)
    .domain(data.info.map((d) => d.description));

  const g = svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(y_scale))

  const areaBars = svg.append('g')
    .attr('class', 'bars')

  const bars = areaBars.selectAll('.bar')
    .data(data.info)
    .enter()

  const calcMiddleBar = (d) => {
    const mrg = (height / data.info.length) / 2 - (heightBar / 2);
    return y_scale(d.description) + mrg;
  };

  bars.append('rect')
    .attr('class', 'bar')
    .attr('y', (d) => calcMiddleBar(d))
    .attr('height', heightBar)
    .attr('x', 0)
    .attr('width', (d) => x_scale(d.value));

  bars.append('text')
    .attr('class', 'label-percent')
    .attr('y', (d) => calcMiddleBar(d) + 8)
    .attr('x', (d) => x_scale(d.value) + 8)
    .text((d) => d.percent + '%');

  bars.append('text')
    .attr('class', 'label')
    .attr('y', (d) => calcMiddleBar(d) + 8)
    .attr('x', (d) => x_scale(d.value) + 56)
    .text((d) => d.value);
};