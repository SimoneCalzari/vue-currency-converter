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
  emits: ["changeVal", "changeCurrency"],
};
</script>

<template>
  <div class="input-group mb-3">
    <input
      v-if="field === 1"
      type="number"
      class="form-control text-center shadow-none border-success border-2 fw-bold fs-4"
      v-model="store.value1"
      @keyup="$emit('changeVal', 2)"
      @change="$emit('changeVal', 2)"
    />
    <input
      v-else
      type="number"
      class="form-control text-center shadow-none border-success border-2 fw-bold fs-4"
      v-model="store.value2"
      @keyup="$emit('changeVal', 1)"
      @change="$emit('changeVal', 1)"
    />
    <select
      v-if="field === 1"
      class="form-select text-center shadow-none border-success border-2 fw-bold fs-5"
      v-model="store.currency1"
      @change="$emit('changeCurrency')"
    >
      <option
        v-for="(value, key) in currencies"
        :value="key"
        :disabled="key === store.currency2"
      >
        {{ value }}
      </option>
    </select>
    <select
      v-else
      class="form-select text-center shadow-none border-success border-2 fw-bold fs-5"
      v-model="store.currency2"
      @change="$emit('changeCurrency')"
    >
      <option
        v-for="(value, key) in currencies"
        :value="key"
        :disabled="key === store.currency1"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>
