<template>
  <div class="me">
    <Header>
      <template #title>
        <h4 class="title">Wanandroid</h4>
      </template>
    </Header>
    <div class="content-wrapper">
      <div class="toLogin" @click="toLogin()"></div>
      <ul class="list-wrapper">
        <li class="list-item" @click="toMyCollection()">
          <img class="star" src="@/assets/star.png" alt="">
          <span>我的收藏</span>
        </li>
      </ul>
    </div>
    <!-- <Tabs></Tabs> -->
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  data() {
    return {};
  },
  components: {
    Header
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    toMyCollection() {
      this.$router.push({
        name: 'myCollection'
      })
    }
  }
};
</script>

<style lang="scss">
.me {
  .content-wrapper {
    height: 86vh;
    .toLogin {
      height: 30vh;
      background-color: #03a9f4;
      position: relative;
      pointer-events: none;
      &::before {
        position: absolute;
        width: 60px;
        height: 60px;
        content: "";
        background-color: white;
        border-radius: 50%;
        top: 5vh;
        left: 40vw;
        pointer-events: auto;
      }
      &::after {
        position: absolute;
        content: '点击上方登录';
        color: white;
        top: 17vh;
        left: 36vw;
      }
    }
    .list-wrapper {
      list-style: none;
      padding: 0;
      margin: 0;
      .list-item {
        height: 6vh;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #8a8a8a;
        position: relative;
        border-bottom: 1px solid #b2bec3;
        &::after {
          position: absolute;
          content: '>';
          right: 2vw;
        }
        .star {
          height: 80%;
          margin-right: 2vw;
        }
      }
    }
  }
}
</style>
