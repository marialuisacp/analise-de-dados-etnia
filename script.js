const height = 800, width = 760,
  margin = { left: 50, top: 50, bottom: 50, right: 50 };
const color = d3.scaleLinear().domain([0, 1])
  .range(['#F6C4A3', '#5E2C0B'])
const svg = d3.select('#area-chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
const g = svg.append('g')
const proj_br = d3.geoMercator()
  .scale(800)
  .center([-50, -10])
  .translate([width / 2, height / 2])

const path = d3.geoPath()
  .projection(proj_br)

const colorByData = (item_map, data) => {
  let color_default = '#ffffff';
  data.map((state) => {
    if (state.id === item_map.id) {
      const negros = parseInt(state.preta) + parseInt(state.parda);
      const coef_color = proportion(negros, parseInt(state.total));
      color_default = color(coef_color);
    }
  });
  return color_default;
};

const showDetails = (item, data) => {
  const currentState = data.find((state) => state.id === item.id);
};

const hideDetails = (data) => {

};

d3.json('data/br-states-info.json').then((data_map) => {
  d3.csv('data/etnia_brasil.csv').then((data_br_etnia) => {
    g.selectAll('.state')
      .data(topojson.feature(data_map, data_map.objects.estados).features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => colorByData(d, data_br_etnia))
    // .on('mouseover', (d) => showDetails(d, data_br_etnia))
    // .on('mouseout', (d) => hideDetails(d))

    barChart(data_br_etnia[0]);
  });
});