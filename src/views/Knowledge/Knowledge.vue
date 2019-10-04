<template>
  <div class="knowledge">
    <Header>
      <template #title>
        <h4 class="title">Wanandroid</h4>
      </template>
    </Header>
    <div class="scrollWrapper">
      <!-- .native在父组件给子组件绑定原生事件 不然无法触发click -->
      <KnowledgeList
        v-for="(list, index) in knowledgeList"
        :key="index"
        :list="list"
        @click.native="toKnowledgeArtcile(list)"
      ></KnowledgeList>
    </div>
    <!-- <Tabs></Tabs> -->
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import KnowledgeList from "@/components/KnowledgeList/KnowledgeList";

export default {
  data() {
    return {
      knowledgeList: []
    };
  },
  components: {
    Header,
    KnowledgeList
  },
  methods: {
    //获取体系数据
    getSystemList() {
      this.axios
        .get("/tree/json")
        .then(res => {
          this.knowledgeList = res.data.data;
        })
        .catch(error => error);
    },
    toKnowledgeArtcile(list) {
      sessionStorage.setItem('list', JSON.stringify(list));
      this.$router.push({
        name: "knowledgeArticle",
        // params: list
      });
    }
  },
  created() {
    this.getSystemList();
  }
};
</script>

<style lang="scss">
.knowledge {
  width: 100vw;
  .scrollWrapper {
    width: 100%;
    height: 86vh;
    overflow: scroll;
    background-color: #b2bec3;
  }
}
</style>
