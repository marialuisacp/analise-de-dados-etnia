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
      percent: percent(item.amarela, item.total)
    },
    {
      description: 'branca',
      value: parseInt(item.branca),
      percent: percent(item.branca, item.total)
    },
    {
      description: 'indigena',
      value: parseInt(item.indigena),
      percent: percent(item.indigena, item.total)

    },
    {
      description: 'parda',
      value: parseInt(item.parda),
      percent: percent(item.parda, item.total)
    },
    {
      description: 'preta',
      value: parseInt(item.preta),
      percent: percent(item.preta, item.total)
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