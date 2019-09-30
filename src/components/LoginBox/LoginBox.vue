<template>
  <div class="login-box">
    <h3 class="title">Login</h3>
    <input class="input" type="text" autocomplete="off" id="username" ref="username" placeholder="username" />
    <input class="input" type="password" id="password" ref="password" placeholder="password" />
    <button class="submit" type="submit" id="submit" @click="login()">GO</button>
    <span class="tips">forgot_your_password</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    login() {
      this.axios
        .post(
          `/api/user/login?username=${this.$refs.username.value}&password=${this.$refs.password.value}`
        )
        .then(res => {
          if (res.data.errorMsg) {
            alert(res.data.errorMsg);
          } else {
            alert("登录成功");
            this.$router.go(-1);
          }
        })
        .catch(error => error);
    }
  }
};
</script>

<style lang="scss">
.login-box {
  width: 70vw;
  height: 50vh;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: -1px 3px 3px #ffc107;
  .title {
    color: #ffeb3b;
  }
  .input {
    border: 0; //清楚边框
    outline: none; //清楚input点击时的轮廓
    border-bottom: rgba(127, 255, 170, 0.4) 1px solid;
    width: 50vw;
    height: 5vh;
    caret-color: rgba(127, 255, 170, 0.7); //input光标颜色
    color: rgba(127, 255, 170, 0.7);
    margin-bottom: 4vh;
    &::-webkit-input-placeholder {
      color: rgba(127, 255, 170, 0.4);
    }
    &:focus {
      border-bottom: rgba(127, 255, 170, 0.9) 1px solid;
      &::-webkit-input-placeholder {
        color: rgba(127, 255, 170, 0.9);
        transform: scale(0.9, 0.9) translateY(-10px);
        transition: 0.5s ease;
      }
    }
  }
  .submit {
    width: 40vw;
    height: 9vh;
    background-color: white;
    border: rgba(127, 255, 170, 0.5) 1px solid;
    color: rgba(127, 255, 170, 0.5);
    border-radius: 5px;
    margin-bottom: 4vh;
  }
  .tips {
    color: #757575;
    font-size: 12px;
  }
  &::before {
    content: "";
    background-color: rgba(127, 255, 170, 0.9);
    width: 2vw;
    height: 7vh;
    position: absolute;
    top: 2vh;
    left: 0;
  }
}
</style>
