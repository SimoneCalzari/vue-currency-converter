<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
  props: {
    currencies: Object,
    field: Number,
  },
};
</script>

<template>
  <div class="input-group mb-3 w-50 mx-auto">
    <input
      v-if="field === 1"
      type="number"
      class="form-control text-center"
      v-model="store.value1"
    />
    <input
      v-else
      type="number"
      class="form-control text-center"
      v-model="store.value2"
    />
    <select
      v-if="field === 1"
      class="form-select text-center"
      v-model="store.currency1"
    >
      <option v-for="(value, key) in currencies" :value="key">
        {{ value }}
      </option>
    </select>
    <select v-else class="form-select text-center" v-model="store.currency2">
      <option v-for="(value, key) in currencies" :value="key">
        {{ value }}
      </option>
    </select>
  </div>
</template>
