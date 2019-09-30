<template>
  <div class="home">
    <Header>
      <template #title>
        <h4 class="title">Wanandroid</h4>
      </template>
      <template #search></template>
    </Header>
    <div class="scrollWrapper" ref="wrapper">
      <Carousel></Carousel>
      <ArticleList v-for="(list, index) in lastestList" :key="index" :list="list" :id="list.id"></ArticleList>
      <ArticleList
        v-for="(list, index) in beforeList"
        :key="'before'+index"
        :list="list"
        :id="list.id"
      ></ArticleList>
    </div>
    <!-- <Tabs></Tabs> -->
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Carousel from "@/components/Carousel/Carousel";
import ArticleList from "@/components/ArticleList/ArticleList";
export default {
  data() {
    return {
      lastestList: [],
      beforeList: [],
      listNum: 1
    };
  },
  components: {
    Header,
    Carousel,
    ArticleList,
  },
  methods: {
    getLatestList() {
      this.axios
        .get("/api/article/list/0/json")
        .then(res => {
          this.lastestList = res.data.data.datas;
        })
        .catch(error => error);
    },
    getBeforeList() {
      this.axios
        .get(`/api/article/list/${this.listNum}/json`)
        .then(res => {
          this.beforeList.push(...res.data.data.datas);
        })
        .catch(error => error);
      this.listNum++;
    },
    handleScroll() {
      let wrapper = this.$refs.wrapper;
      if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
        this.getBeforeList();
      }
    }
  },
  created() {
    this.getLatestList();
  },
  mounted() {
    this.$refs.wrapper.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
.home {
  width: 100vw;
  background-color: #b2bec3;
  .scrollWrapper {
    height: 86vh;
    overflow: scroll;
  }
}
</style>
