<template>
  <v-card rounded="xl" elevation="0" border="sm black" class="py-4 px-2">
    <div id="chart-container" style="width: 100%; height: 400px"></div>
  </v-card>
</template>

<script setup>
import Highcharts from "highcharts";

const { t } = useI18n();

const chartOptions = {
  chart: {
    type: "pie",
    custom: {},
    events: {
      render() {
        const chart = this,
          series = chart.series[0];
        let customLabel = chart.options.chart.custom.label;

        if (!customLabel) {
          customLabel = chart.options.chart.custom.label = chart.renderer
            .label(
              `
              <strong> 212 </strong>
              <br />
              <span style="font-size: 12px;"> طلب </span>
              `
            )
            .css({
              color: "#000",
              textAnchor: "middle",
            })
            .add();
        }

        const x = series.center[0] + chart.plotLeft,
          y = series.center[1] + chart.plotTop - customLabel.attr("height") / 2;

        customLabel.attr({
          x,
          y,
        });
        customLabel.css({
          fontSize: `${series.center[2] / 12}px`,
        });
      },
    },
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  title: {
    text: t("technical.end_requests"),
    align: "right",
  },
  tooltip: {
    pointFormat: "<b>{point.percentage:.0f}%</b>",
  },
  legend: {
    // enabled: false,
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      borderRadius: 8,
      dataLabels: [
        {
          enabled: true,
          distance: 20,
          format: "{point.name}",
        },
        {
          enabled: true,
          distance: -15,
          format: "{point.percentage:.0f}%",
          style: {
            fontSize: "0.9em",
          },
        },
      ],
      showInLegend: true,
    },
  },
  series: [
    {
      name: "الطلبات",
      colorByPoint: true,
      innerSize: "50%",
      data: [
        {
          name: "ناجحة ",
          y: 23.9,
          color: "#33cc33",
        },
        {
          name: "فاشلة",
          y: 12.6,
          color: "#ff0000",
        },
      ],
    },
  ],
};

onMounted(() => {
  Highcharts.chart("chart-container", chartOptions);
});
</script>
