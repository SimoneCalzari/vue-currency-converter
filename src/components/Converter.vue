<script>
import CurrencyField from "./CurrencyField.vue";
import axios from "axios";
import { store } from "../store";
import { DateTime } from "luxon";
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
    // funzione che prende tutti i tipo di valuta e li salva in un oggetto nei data di questo componente
    async getCurrencies() {
      try {
        const response = await axios.get(
          `${store.baseUrlApi}/${store.uriCurrencies}`
        );
        this.currenciesList = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    // chiamata generica per conversione dei valori, restituisce promise di axios
    apiConversion(amount, from, to) {
      return axios.get(`${store.baseUrlApi}/${store.latestUri}`, {
        params: {
          amount,
          from,
          to,
        },
      });
    },
    // funzione per conversione valori al cambio degli input numerici primo o secondo
    async conversionValues(fieldToChange) {
      // ho modificato il secondo input
      if (fieldToChange === 1) {
        // se è nullo il secondo, metto anche il primo nullo
        if (store.value2 === "") {
          store.value1 = "";
          return;
        }
        if (store.value2 === 0) {
          store.value1 = 0;
          return;
        }
        // se l input è negativo lo converto in positivo
        if (store.value2 < 0) store.value2 = -store.value2;
        try {
          // chiamata per convertire il valore del primo input
          const response = await this.apiConversion(
            store.value2,
            store.currency2,
            store.currency1
          );
          // salvo valore aggiornato del primo input
          store.value1 = response.data.rates[store.currency1];
          return;
        } catch (error) {
          console.log(error);
        }
      }
      //   se arrivo qua ho modificato il primo input
      //   se è nullo il primo, metto a nullo anche il secondo
      if (store.value1 === "") {
        store.value2 = "";
        return;
      }
      if (store.value1 === 0) {
        store.value2 = 0;
        return;
      }
      // se l input è negativo lo converto in positivo
      if (store.value1 < 0) store.value1 = -store.value1;
      try {
        // chiamata per convertire il valore del secondo input
        const response = await this.apiConversion(
          store.value1,
          store.currency1,
          store.currency2
        );
        // salvo valore aggiornato del secondo input
        store.value2 = response.data.rates[store.currency2];
      } catch (error) {
        console.log(error);
      }
    },
    // funzione che al cambio della valuta di uno qualsiasi dei due campi, converte il valore del secondo
    async conversionValuesOnCurrencyChange() {
      // se il valore del primo input è nullo, lo setto a 1 prima di procedere alla conversione
      if (!store.value1) store.value1 = 1;
      try {
        //   chiamata per convertire il secondo valore
        const response = await this.apiConversion(
          store.value1,
          store.currency1,
          store.currency2
        );
        //   salvo secondo valore aggiornato
        store.value2 = response.data.rates[store.currency2];
      } catch (error) {
        console.log(error);
      }
    },
    // funzione per avere la data di un mese fa formattata per come la vuole l'api delle currency
    oneMonthAgo() {
      const today = DateTime.now();
      const oneMonthAgo = today.minus({ days: 30 });
      const oneMonthAgoIso = today.minus({ days: 30 }).toISO().slice(0, 10);
      return oneMonthAgoIso;
    },
    // funzione che prende i ratei dell'ultimo mese e li salva in un oggetto dello store
    async changeRatesLastMonth() {
      // chiamata all'endpoint
      const response = await axios.get(
        `${store.baseUrlApi}/${this.oneMonthAgo()}..`,
        {
          params: {
            from: store.currency1,
            to: store.currency2,
          },
        }
      );
      // dati restituiti che interessano
      const data = response.data.rates;
      // salvo i dati dopo averli manipolati per semplificarli
      store.ratesLastMonth = this.handlingDatesAndRates(data);
    },
    // manipolazione dati ricevuti dall'api
    handlingDatesAndRates(obj) {
      const objCopy = { ...obj };
      for (const key in obj) {
        objCopy[key] = obj[key][store.currency2];
      }
      return objCopy;
    },
  },
  created() {
    this.getCurrencies();
    this.changeRatesLastMonth();
  },
  computed: {
    formatValue1() {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: store.currency1,
      }).format(store.value1);
    },
    formatValue2() {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: store.currency2,
      }).format(store.value2);
    },
  },
};
</script>

<template>
  <section class="h-100 d-flex align-items-center">
    <div
      class="w-50 mx-auto bg-white py-4 px-5 rounded-3 border border-3 border-success"
    >
      <p class="fs-3 text-center">
        <span class="fs-1 me-2">{{ formatValue1 }}</span> is equal to
        <span class="fs-1 ms-1">{{ formatValue2 }}</span>
      </p>
      <CurrencyField
        v-for="index in 2"
        :currencies="currenciesList"
        :field="index"
        @changeVal="conversionValues"
        @changeCurrency="conversionValuesOnCurrencyChange"
      ></CurrencyField>
    </div>
  </section>
</template>
