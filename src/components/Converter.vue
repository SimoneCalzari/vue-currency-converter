<script>
import CurrencyField from "./CurrencyField.vue";
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      currenciesList: null,
      store,
    };
  },
  components: {
    CurrencyField,
  },
  methods: {
    getCurrencies() {
      axios
        .get(`${store.baseUrlApi}/${store.uriCurrencies}`)
        .then((response) => {
          this.currenciesList = response.data;
        });
    },
    async apiConversion(amount, from, to) {
      return await axios.get(`${store.baseUrlApi}/${store.latestUri}`, {
        params: {
          amount,
          from,
          to,
        },
      });
    },
    conversionValues(fieldToChange) {
      // ho modificato input 2, voglio cambi il valore dell input 1
      if (fieldToChange === 1) {
        if (!store.value2) {
          store.value1 = "";
          return;
        }
        this.apiConversion(store.value2, store.currency2, store.currency1).then(
          (response) => {
            store.value1 = response.data.rates[store.currency1];
          }
        );
        return;
      }
      // ho modificato input 1, voglio cambi il valore dell input 2
      if (!store.value1) {
        store.value2 = "";
        return;
      }
      this.apiConversion(store.value1, store.currency1, store.currency2).then(
        (response) => {
          store.value2 = response.data.rates[store.currency2];
        }
      );
    },
    conversionValuesOnCurrencyChange() {
      if (!store.value1) store.value1 = 1;
      this.apiConversion(store.value1, store.currency1, store.currency2).then(
        (response) => {
          store.value2 = response.data.rates[store.currency2];
        }
      );
    },
  },
  created() {
    this.getCurrencies();
  },
};
</script>

<template>
  <section>
    <CurrencyField
      v-for="index in 2"
      :currencies="currenciesList"
      :field="index"
      @changeVal="conversionValues"
      @changeCurrency="conversionValuesOnCurrencyChange"
    ></CurrencyField>
  </section>
</template>
