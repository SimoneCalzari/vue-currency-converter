<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppMain,
  },
};
</script>

<template>
  <div class="vh-100 d-flex flex-column bg-dark">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
  </div>
</template>
