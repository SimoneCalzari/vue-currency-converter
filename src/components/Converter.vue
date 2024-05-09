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
        .get(`${this.store.baseUrlApi}/${this.store.uriCurrencies}`)
        .then((response) => {
          this.currenciesList = response.data;
        });
    },
  },
  created() {
    this.getCurrencies();
  },
};
</script>

<template>
  <section>
    <CurrencyField :currencies="currenciesList" :field="1"></CurrencyField>
    <CurrencyField :currencies="currenciesList" :filed="2"></CurrencyField>
  </section>
</template>
