<template>
  <div class="me">
    <Header>
      <template #title>
        <h4 class="title">Wanandroid</h4>
      </template>
    </Header>
    <div class="content-wrapper">
      <div class="loginWrapper">
        <div class="toLogin" @click="toLogin()"></div>
        <span class="tips" v-if="!this.getNickname()">点击上方登录</span>
        <span class="tips" v-else>{{nickname}}</span>
      </div>
      <ul class="list-wrapper">
        <li class="list-item" @click="toMyCollection()">
          <img class="star" src="@/assets/star.png" alt />
          <span>我的收藏</span>
        </li>
        <li class="close" @click="quit()">退出登录</li>
      </ul>
    </div>
    <!-- <Tabs></Tabs> -->
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  inject: ["reload"],
  data() {
    return {
      nickname: this.getNickname()
    };
  },
  components: {
    Header
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    toMyCollection() {
      this.$router.push({
        name: "myCollection"
      });
    },
    quit() {
      if (document.cookie.includes("loginUserName")) {
        this.axios.get("/user/logout/json");
        window.localStorage.removeItem("nickname");
        alert("退出成功");
        this.reload();
      } else {
        alert("还没登录");
        return false;
      }
    },
    // isLogin() {
    //   if (document.cookie.includes("loginUserName")) {
    //     return true;
    //   }
    //   return false;
    // },
    getNickname() {
      let result = window.localStorage.getItem("nickname");
      return result;
    }
  }
};
</script>

<style lang="scss">
.me {
  .content-wrapper {
    height: 86vh;
    .loginWrapper {
      height: 30vh;
      background-color: #03a9f4;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      // pointer-events: none;
      .toLogin {
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 50%;
      }
      .tips {
        color: white;
        position: absolute;
        bottom: 20px;
      }
      // &::before {
      //   position: absolute;
      //   width: 60px;
      //   height: 60px;
      //   content: "";
      //   background-color: white;
      //   border-radius: 50%;
      //   top: 5vh;
      //   left: 40vw;
      //   pointer-events: auto;
      // }
      // &::after {
      //   position: absolute;
      //   content: "点击上方登录";
      //   color: white;
      //   top: 17vh;
      //   left: 36vw;
      // }
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
          content: ">";
          right: 2vw;
        }
        .star {
          height: 80%;
          margin-right: 2vw;
        }
      }
      .close {
        text-align: center;
        margin-top: 1px;
        height: 8vh;
        line-height: 8vh;
        color: #03a9f4;
        border-bottom: 1px solid #b2bec3;
      }
    }
  }
}
</style>
