<template>
  <b-container id="myChart"></b-container>
</template>

<script>
import Highcharts from 'highcharts';
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

window.onload = () => {
  Highcharts.chart('myChart', {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Fruit Consumption',
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges'],
    },
    yAxis: {
      title: {
        text: 'Fruit eaten',
      },
    },
    series: [{
      name: 'Jane',
      data: [1, 0, 4],
    }, {
      name: 'John',
      data: [5, 7, 3],
    }],
  });
};

export default {
  name: 'stockchart',
};
</script>

<style>
#container {
  width: 100%;
  height: 400px;
}
</style>
