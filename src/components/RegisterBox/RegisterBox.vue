<template>
  <div class="register-box">
    <h3 class="title">Register</h3>
    <!-- autocomplete="off" 清除input自动提示 选择自动提示的内容 input样式不正确 -->
    <input
      class="input"
      type="text"
      id="username"
      autocomplete="off"
      ref="username"
      placeholder="username"
    />
    <input class="input" type="password" id="password" ref="password" placeholder="password" />
    <input class="input" type="password" id="repeat" ref="repeat" placeholder="repeat password" />
    <button class="submit" type="submit" id="submit" @click="register()">NEXT</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    register() {
      this.axios
        .post(
          `/user/register?username=${this.$refs.username.value}&password=${this.$refs.password.value}&repassword=${this.$refs.repeat.value}`
        )
        .then(res => {
          if (res.data.errorMsg) {
            alert(res.data.errorMsg);
          } else {
            alert("注册成功");
            this.$parent.toggle();
          }
        })
        .catch(error => error);
    }
  }
};
</script>

<style lang="scss">
.register-box {
  width: 70vw;
  height: 50vh;
  background-color: rgba(127, 255, 170, 0.9);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: -1px 3px 3px #ffc107;
  .title {
    color: white;
    margin-bottom: 0;
  }
  .input {
    border: 0;
    outline: none;
    border-bottom: white 1px solid;
    width: 50vw;
    height: 5vh;
    background-color: rgba(127, 255, 170, 0.9);
    caret-color: #ffeb3b;
    color: white;
    margin-bottom: 4vh;
    &::-webkit-input-placeholder {
      color: white;
    }
    &:focus {
      border-bottom: #ffeb3b 1px solid;
      &::-webkit-input-placeholder {
        color: #ffeb3b;
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
    color: rgba(127, 255, 170, 0.9);
    border-radius: 5px;
  }
}
</style>
