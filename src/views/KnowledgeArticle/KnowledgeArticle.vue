<template>
  <div class="knowledgeArticle">
    <Header>
      <template #back>
        <img class="back" @click="back()" src="@/assets/back.png" alt />
      </template>
      <template #title>
        <h4 class="title">{{list.name}}</h4>
      </template>
    </Header>
    <NavBar :list="list" @func="getChildrenId"></NavBar>
    <div class="scrollWrapper" ref="scrollWrapper">
      <ArticleList v-for="(item, index) in articleList" :key="index" :list="item" :id="item.id"></ArticleList>
      <ArticleList v-for="(item, index) in beforeArticle" :key="'before'+index" :list="item" :id="item.id"></ArticleList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import NavBar from "@/components/NavBar/NavBar";
import ArticleList from "@/components/ArticleList/ArticleList";
export default {
  data() {
    return {
      list: null, //knowledge页面的数据
      pageNum: 1,
      articleList: [], //根据上面的list里的cid获取文章
      cid: null,
      beforeArticle: []
    };
  },
  components: {
    Header,
    NavBar,
    ArticleList
  },
  created() {
    this.setParams();
    this.getArticle(this.list.children[0].id); //默认渲染第一个id下面的文章
  },
  methods: {
    //设置传来的参数给data
    setParams() {
      // this.list = this.$route.params; 这种方式刷新页面会导致获取不到list，因此把list放在缓存里
      this.list = JSON.parse(sessionStorage.getItem('list'));//储存对象时要把对象转为字符串，获取再转回json
    },
    //根据导航条的id获取对应的文章
    getArticle(id) {
      this.axios
        .get(`/article/list/0/json?cid=${id}`)
        .then(res => {
          this.articleList = res.data.data.datas;
        })
        .catch(error => error);
    },
    //下滑加载之前的文章
    getBeforeArticle(id) {
      this.axios
        .get(`/article/list/${this.pageNum}/json?cid=${id}`)
        .then(res => {
          this.beforeArticle.push(...res.data.data.datas);
        })
        .catch(error => error);
      this.pageNum++;
    },
    //滑动事件
    handleScroll() {
      let wrapper = this.$refs.scrollWrapper;
      if (this.cid == null) {
        this.cid = this.list.children[0].id;
      }
      if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
        this.getBeforeArticle(this.cid);
      }
    },
    getChildrenId(data) {
      this.cid = data;
    },
    //每次切换清除一下旧文章和重置一下页码数
    clear() {
      this.beforeArticle.length = 0;
      this.pageNum = 1;
    },
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.scrollWrapper.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
.knowledgeArticle {
  height: 100vh;
  background-color: #b2bec3;
  .scrollWrapper {
    height: 87vh;
    overflow: scroll;
  }
}
</style>
