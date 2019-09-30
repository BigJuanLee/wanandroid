<template>
  <ul class="tabs">
    <li
      v-for="(item, index) in listArray"
      :key="index"
      :class="item.className"
      @click="toNewPage(index, item.name)"
    >
      <img :src="index === active ? item.activeUrl : item.imgUrl" alt />
      <span :class="index === active ? 'tab-name-active' : 'tab-name'">{{item.content}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      listArray: [
        {
          className: "home-page",
          imgUrl: require("@/assets/home.png"),
          activeUrl: require("@/assets/home-active.png"),
          content: "Home",
          name: "home"
        },
        {
          className: "knowledge",
          imgUrl: require("@/assets/knowledge.png"),
          activeUrl: require("@/assets/knowledge-active.png"),
          content: "Knowledge",
          name: "knowledge"
        },
        {
          className: "hot",
          imgUrl: require("@/assets/hot.png"),
          activeUrl: require("@/assets/hot-active.png"),
          content: "Hot",
          name: "hot"
        },
        {
          className: "me",
          imgUrl: require("@/assets/me.png"),
          activeUrl: require("@/assets/me-active.png"),
          content: "Me",
          name: "me"
        }
      ],
      active: 0,
      routeName: ''
    };
  },
  methods: {
    //点击添加active样式和跳转
    toNewPage(index, name) {
      this.active = index;
      this.$router.push({
        name
      });
    },

  }
};
</script>

<style lang="scss">
.tabs {
  height: 7vh;
  border: 1px solid #dfe6e9;
  background-color: #f5f6fa;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  .home-page,
  .knowledge,
  .hot,
  .me {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    .tab-name,
    .tab-name-active {
      font-size: 12px;
    }
    .tab-name-active {
      color: aqua;
    }
    img {
      width: 30px;
      height: 50%;
    }
  }
}
</style>
