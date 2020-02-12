<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <myTabs></myTabs>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
#app {
  height: 100vh;
  /* overflow: hidden; */
}
</style>
