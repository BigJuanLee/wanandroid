<template>
  <ul class="navBar">
    <li
      :class="index === active ? 'name-active' : 'name'"
      v-for="(item, index) in list.children"
      :key="index"
      @click="addActive(index);toggleArticle(item.id)"
    >{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  props: {
    list: Object
  },
  components: {},
  methods: {
    //点击添加active样式
    addActive(index) {
      this.active = index;
    },
    //根据不同id切换文章
    toggleArticle(id) {
      this.$parent.getArticle(id);
      this.$parent.clear();
      this.$emit('func', id);
    }
  }
};
</script>

<style lang="scss">
.navBar {
  height: 6vh;
  width: 100vw;
  overflow-x: scroll;
  background-color: #03a9f4;
  margin: 0;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none; //清除滚动条
  }
  .name,
  .name-active {
    list-style: none;
    padding: 0;
    width: auto;
    height: auto;
    padding: 0 2vw;
    color: white;
    font-size: 14px;
    line-height: 6vh;
    white-space: nowrap; //不加这个有些汉字会自动换行
  }
  .name-active {
    border-bottom: 3px solid white;
  }
}
</style>
