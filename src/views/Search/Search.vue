<template>
  <div class="search">
    <Header>
      <template #back>
        <img src="@/assets/back.png" @click="back()" class="back" alt />
      </template>
      <template #title>
        <input type="text" class="input" placeholder="搜索.."  ref="input"/>
      </template>
      <template #search>
          <img src="@/assets/search.png" class="search" alt="">
      </template>
    </Header>
    <div class="scrollWrapper" ref="scrollWrapper">
      <ArticleList v-for="(item, index) in list" :key="index" :list="item" :id="item.id"></ArticleList>
      <ArticleList v-for="(item, index) in beforeArticle" :key="'before'+index" :list="item" :id="item.id"></ArticleList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import ArticleList from "@/components/ArticleList/ArticleList";
export default {
  data() {
    return {
      name: null,
      list: null,
      beforeArticle: [],
      pageNum: 1
    };
  },
  components: {
    Header,
    ArticleList
  },
  created() {
    this.setParams();
    if (this.name) {
      this.search();
    }
  },
  methods: {
    setParams() {
      this.name = this.$route.params.name;
    },
    search() {
      this.axios
        .post(`/article/query/0/json/?k=${this.name}`)
        .then(res => {
          this.list = res.data.data.datas;
        })
        .catch(error => error);
    },
    getBeforeArticle() {
      this.axios
        .post(`/article/query/${this.pageNum}/json/?k=${this.name}`)
        .then(res => {
          this.beforeArticle.push(...res.data.data.datas);
        })
        .catch(error => error);
      this.pageNum++;
    },
    handleScroll() {
      let wrapper = this.$refs.scrollWrapper;
      if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
        this.getBeforeArticle();
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.scrollWrapper.addEventListener("scroll", this.handleScroll);
    this.$refs.input.addEventListener('keydown', (e) => {
        if(e.keyCode == 13 && this.$refs.input.value) {
            this.name = this.$refs.input.value;
            this.search();
        }
        
    })
  }
};
</script>

<style lang="scss">
.search {
  height: 100vh;
  .scrollWrapper {
    height: 93vh;
    overflow: scroll;
    background-color: #b2bec3;
  }
}
</style>
