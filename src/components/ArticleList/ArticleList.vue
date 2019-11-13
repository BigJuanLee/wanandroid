<template>
  <div class="ArticleList" ref="ArticleList" @click="toArticle(list.link)">
    <div class="author-pubdate">
      <span class="author" v-if="list.author">{{list.author}}</span>
      <span class="author" v-else>佚名</span>
      <span class="pubdate">{{list.niceDate}}</span>
    </div>
    <!-- list内容有些自带标签或者转义字符 不能直接用{{list.title}}显示 -->
    <p class="title" v-html="list.title"></p>
    <div class="chapterName-collect">
      <span>{{list.chapterName}}</span>
      <i @click.stop="collection(list, list.id, list.originId)">
        <img
          :src="list.collect ? require('@/assets/collected.png') : require('@/assets/not-collected.png')"
          alt
        />
      </i>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {};
  },
  props: {
    list: Object,
    id: Number
  },
  components: {},
  methods: {
    collection(list, id, oId) {
      if (localStorage.getItem("token") === "0") {
        if (this.$route.path == "/myCollection") {
          this.axios
            .post(`/lg/uncollect/${id}/json?originId=${oId}`)
            .then(() => {
              this.reload();
            })
            .catch(error => error);
        } else {
          if (list.collect) {
            this.axios
              .post(`/lg/uncollect_originId/${id}/json`)
              .then(() => {
                this.reload();
              })
              .catch(error => error);
          } else {
            this.axios
              .post(`/lg/collect/${this.id}/json`)
              .then(() => {
                this.reload();
              })
              .catch(error => error);
          }
        }
      } else {
        alert("先登录才能收藏");
        this.$router.push({
          path: "/login"
        });
      }
    },
    toArticle(link) {
      window.location.href = link; //跳到外链
    },
  }
};
</script>

<style lang="scss">
.ArticleList {
  width: 99vw;
  height: 14vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto 0.6vh;
  background-color: white;
  border-radius: 3px;
  position: relative;
  .author-pubdate {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 2vw;
    .author,
    .pubdate {
      font-size: 12px;
      color: #7f8c8d;
    }
  }
  .title {
    font-size: 12px;
    font-weight: 550;
    line-height: normal;
    padding: 0 2vw;
  }
  .chapterName-collect {
    font-size: 14px;
    color: #3498db;
    padding: 0 2vw;
    i {
      width: 20px;
      height: 20px;
      position: absolute;
      bottom: 0.1vh;
      right: 3vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
