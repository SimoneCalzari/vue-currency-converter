import { reactive } from "vue";

export const store = reactive({
  baseUrlApi: "https://api.frankfurter.app",
  latestUri: "latest",
  uriCurrencies: "currencies",
  value1: 1,
  value2: 1.0732,
  currency1: "EUR",
  currency2: "USD",
  ratesLastMonth: {},
});
