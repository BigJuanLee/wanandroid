<template>
  <div class="myCollection">
    <Header>
      <template #back>
        <img class="back" @click="back()" src="@/assets/back.png" alt />
      </template>
      <template #title>
        <h4 class="title">我的收藏</h4>
      </template>
    </Header>
    <div class="scrollWrapper">
      <ArticleList v-for="(item, index) in collectList"
      :key="index"
      :list="item"
      ></ArticleList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import ArticleList from "@/components/ArticleList/ArticleList";
export default {
  data() {
    return {
      collectList: []
    };
  },
  components: {
    Header,
    ArticleList
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getCollectList() {
      this.axios
        .get(`/api/lg/collect/list/0/json`)
        .then(res => {
          this.collectList = res.data.data.datas;
          this.collectList.map(item => {
            item.collect = true
          })
        })
        .catch(error => error);
    },
    cancleCollect(id, oId) {
      this.axios.post(`/api/lg/uncollect/${id}/json?orginId=${oId}`).then(() => {
        console.log(1);
      }).catch(error => error)
    }
  },
  created() {
    this.getCollectList();
  }
};
</script>

<style lang="scss">
.myCollection {
  height: 100vh;
  .scrollWrapper {
    height: 87vh;
    overflow: scroll;
  }
}
</style>
