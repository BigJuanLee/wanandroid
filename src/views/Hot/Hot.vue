<template>
  <div class="hot">
    <Header>
      <template #title>
        <h4 class="title">Wanandroid</h4>
      </template>
    </Header>
    <div class="scrollWrapper">
      <div class="hotKey">
        <h4 class="title">搜索热词</h4>
        <div class="wrapper">
          <span
            class="content"
            v-for="(item, index) in hotKey"
            :key="index"
            @click="toSearch(item)"
          >{{item.name}}</span>
        </div>
      </div>
      <div class="friendlyLink">
        <h4 class="title">常用网站</h4>
        <div class="wrapper">
          <span class="content" v-for="(item, index) in friendlyLink" :key="index" @click="toLink(item.link)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- <Tabs></Tabs> -->
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
// import Tabs from "@/components/Tabs/Tabs";
export default {
  data() {
    return {
      hotKey: [], //搜索热词
      friendlyLink: [] //常用网站
    };
  },
  components: {
    Header,
  },
  methods: {
    getHotKey() {
      this.axios
        .get(`/api/hotkey/json`)
        .then(res => {
          this.hotKey = res.data.data;
        })
        .catch(error => error);
    },
    getFriendlyLink() {
      this.axios
        .get(`/api/friend/json`)
        .then(res => {
          this.friendlyLink = res.data.data;
        })
        .catch(error => error);
    },
    //跳转传参，参数不能直接传item.name
    toSearch(item) {
      this.$router.push({
        name: "search",
        params: {
          name: item.name
        }
      });
    },
    toLink(link) {
      window.location.href = link;
    }
  },
  created() {
    this.getHotKey();
    this.getFriendlyLink();
  }
};
</script>

<style lang="scss">
.hot {
  .scrollWrapper {
    height: 86vh;
    overflow: scroll;
    .hotKey,
    .friendlyLink {
      padding: 2vh 4vw;
      .title {
        margin: 0;
      }
      .wrapper {
        margin-top: 4vh;
        padding: 0 2vw;
        .content {
          display: inline-block;
          margin: 2vh 3vw 2vh 0;
          border: 1px solid #dfe6e9;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
