<template>
  <v-card rounded="xl" elevation="0" border="sm black" class="py-4 px-2">
    <div id="requests-chart" style="width: 100%; height: 400px"></div>
  </v-card>
</template>

<script setup lang="ts">
import Highcharts from "highcharts";
import { useTechnicianStore } from "~/stores/useTechnician";

const { t } = useI18n();
const { chartDataAllRequests } = storeToRefs(useTechnicianStore());
const chart: any = ref(null);

const chartOptions = {
  chart: {
    type: "pie",
    custom: {
      label: null,
    },
    events: {
      render() {
        const chart: any = this,
          series = chart.series[0];
        let customLabel = chart.options.chart.custom.label;

        if (!customLabel) {
          customLabel = chart.options.chart.custom.label = chart.renderer
            .label(
              `
              <strong> ${chartDataAllRequests.value.allRequests} </strong>
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
    text: null,
  },
  tooltip: {
    pointFormat: "<b>{point.percentage:.0f}%</b>",
  },
  legend: {
    labelFormatter(): string {
      return `${this.name} <strong>${this.y}</strong>`;
    },
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      borderRadius: 0,
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
      innerSize: "90%",
      data: chartDataAllRequests.value.typeOfRequests?.map((item) => ({
        name: item.type,
        y: item.count,
      })),
    },
  ],
};

onMounted(() => {
  chart.value = Highcharts.chart("requests-chart", chartOptions);
});

watch(chartDataAllRequests, (newValue) => {
  if (chart.value) {
    chart.value.series[0].setData(
      newValue.typeOfRequests.map((item) => ({
        name: t("operations." + item.type),
        y: item.count,
      }))
    );
  }
  const customLabel = chart.value.options.chart.custom.label;
  if (customLabel) {
    customLabel.attr({
      text: `
        <strong> ${newValue.allRequests} </strong>
        <br />
        <span style="font-size: 12px;"> طلب </span>
      `,
    });
  }
});
</script>
