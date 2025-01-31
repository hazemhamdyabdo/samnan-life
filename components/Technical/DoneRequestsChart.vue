<template>
  <v-card rounded="xl" elevation="0" border="sm black" class="py-4 px-2">
    <div id="chart-container" style="width: 100%; height: 400px"></div>
  </v-card>
</template>

<script setup lang="ts">
import Highcharts from "highcharts";
import { useTechnicianStore } from "~/stores/useTechnician";

const { chartDataCompletedRequests } = storeToRefs(useTechnicianStore());
const { t } = useI18n();
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
              <strong> ${chartDataCompletedRequests.value.allRequests} </strong>
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
  plotOptions: {
    series: {
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
          y: chartDataCompletedRequests.value.completedRequests,
          color: "#33cc33",
        },
        {
          name: "الغير مكتملة",
          y: chartDataCompletedRequests.value.ongoingRequests,
          color: "#ff0000",
        },
      ],
    },
  ],
};

onMounted(() => {
  // @ts-ignore
  chart.value = Highcharts.chart("chart-container", chartOptions);
});

watch(
  chartDataCompletedRequests,
  (newValue) => {
    if (chart.value) {
      chart.value.series[0].setData([
        {
          name: "ناجحة ",
          y: newValue.completedRequests,
          color: "#33cc33",
        },
        {
          name: "الغير مكتملة",
          y: newValue.ongoingRequests,
          color: "#ff0000",
        },
      ]);

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
    }
  },
  { deep: true }
);
</script>
