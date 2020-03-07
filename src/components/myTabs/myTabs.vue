<template>
  <!-- <ul class="tabs">
    <li
      v-for="(item, index) in listArray"
      :key="index"
      :class="item.className"
      @click="toNewPage(index, item.name)"
    >
      <img :src="index === active ? item.activeUrl : item.imgUrl" alt />
      <span :class="index === active ? 'tab-name-active' : 'tab-name'">{{item.content}}</span>
    </li>
  </ul>-->
  <el-tabs v-model="activeName" stretch tab-position="bottom" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in listArray" :key="index" :name="item.content">
      <div slot="label" class="content">
        <i :class="item.className"></i>
        <span>{{item.content}}</span>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      listArray: [
        {
          className: "el-icon-s-platform",
          // imgUrl: require("@/assets/home.png"),
          // activeUrl: require("@/assets/home-active.png"),
          content: "home",
          name: "home"
        },
        {
          className: "el-icon-s-order",
          // imgUrl: require("@/assets/knowledge.png"),
          // activeUrl: require("@/assets/knowledge-active.png"),
          content: "knowledge",
          name: "knowledge"
        },
        {
          className: "el-icon-sunny",
          // imgUrl: require("@/assets/hot.png"),
          // activeUrl: require("@/assets/hot-active.png"),
          content: "hot",
          name: "hot"
        },
        {
          className: "el-icon-user",
          // imgUrl: require("@/assets/me.png"),
          // activeUrl: require("@/assets/me-active.png"),
          content: "me",
          name: "me"
        }
      ],
      // active: 0,
      // routeName: "",
      activeName: this.$route.name
    };
  },
  methods: {
    //点击添加active样式和跳转
    // toNewPage(name) {
    //   this.$router.push({
    //     name
    //   });
    // },
    handleClick(tab) {
      let name = tab.paneName;
      this.$router.push({
        name
      });
    }
  }
};
</script>

<style lang="scss">
.content {
  padding-left: 5px;
}
// .tabs {
//   height: 7vh;
//   border: 1px solid #dfe6e9;
//   background-color: #f5f6fa;
//   display: flex;
//   justify-content: space-around;
//   margin: 0;
//   padding: 0;
//   .home-page,
//   .knowledge,
//   .hot,
//   .me {
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     flex: 1;
//     .tab-name,
//     .tab-name-active {
//       font-size: 12px;
//     }
//     .tab-name-active {
//       color: aqua;
//     }
//     img {
//       width: 30px;
//       height: 50%;
//     }
//   }
// }
</style>
