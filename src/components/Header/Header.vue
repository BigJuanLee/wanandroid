<template>
  <nav class="nav">
    <slot name="back"></slot>
    <slot name="title"></slot>
    <slot name="search"><img src="@/assets/search.png" class="search" @click="toSearch()" alt=""></slot>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    toSearch() {
      this.$router.push({
        path: '/search'
      })
    }
  }
};
</script>

<style lang="scss">
.nav {
  height: 7vh;
  background-color: #03a9f4;
  display: flex;
  align-items: center;
  padding: 0 3vw;
  justify-content: space-between;
  .title {
    color: white;
    font-size: 14px;
    font-weight: 520;
  }
  .back {
    height: 60%;
  }
  .search {
    height: 60%;
  }
  .input {
    border: 0;
    outline: none;
    background-color: #03a9f4;
    color: white;
  }
}
</style>
