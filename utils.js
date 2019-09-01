const proportion = (value, total) =>
  (value / total);

const percent = (value, total) =>
  parseFloat((proportion(value, total) * 100).toFixed(1));

const buildSchemaData = (item) => ({
  id: item.id,
  region: item.uf,
  total: parseInt(item.total),
  info: [
    {
      description: 'aramrela',
      value: parseInt(item.amarela),
      percent: percent(item.amarela, item.total),
      color: '#FFCF4B'
    },
    {
      description: 'branca',
      value: parseInt(item.branca),
      percent: percent(item.branca, item.total),
      color: '#FFB28B'
    },
    {
      description: 'indigena',
      value: parseInt(item.indigena),
      percent: percent(item.indigena, item.total),
      color: '#E3724B'
    },
    {
      description: 'parda',
      value: parseInt(item.parda),
      percent: percent(item.parda, item.total),
      color: '#9E6C4B'
    },
    {
      description: 'preta',
      value: parseInt(item.preta),
      percent: percent(item.preta, item.total),
      color: '#5E2C0B'
    }
  ]
});

const normalizeData = (item) => {
  const itemNormalized = item;
  const sumPercents = d3.sum(itemNormalized.info, (d) => d.percent);
  if (sumPercents !== 100) {
    let maxValue = d3.max(itemNormalized.info, (d) => d.percent);
    itemNormalized.info.forEach((d) => {
      if (d.percent === maxValue) {
        const difference = (100 - sumPercents);
        d.percent += difference;
      }
    });
  }
  return itemNormalized;
};

const buildDataFormat = (data) => {
  const dataSchema = buildSchemaData(data);
  return normalizeData(dataSchema);
};