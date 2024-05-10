<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    // genero props series per il componente apexchart
    generateSeries() {
      const arrayRates = [];
      for (const key in store.ratesLastMonth) {
        arrayRates.push(store.ratesLastMonth[key]);
      }
      return [
        {
          data: arrayRates,
        },
      ];
    },
    // genero props options per il componente apexchart
    generateOptions() {
      return {
        // colore grafico
        colors: ["#198754"],
        // dati asse x
        xaxis: {
          categories: Object.keys(store.ratesLastMonth),
          type: "datetime",
          labels: {
            format: "dd MMM",
          },
        },
        // toglie i valori delle y sul grafico
        dataLabels: {
          enabled: false,
        },
        // titolo del grafico
        title: {
          text: `Rates from ${store.currency1} to ${store.currency2} in the last 30 days`,
          align: "left",
        },
      };
    },
  },
};
</script>

<template>
  <div>
    <apexchart
      type="area"
      height="250px"
      :series="generateSeries()"
      :options="generateOptions()"
    ></apexchart>
  </div>
</template>
