<template>
  <div class="login">
    <transition name="component-fade" mode="out-in">
      <component :is="which"></component>
    </transition>
    <Background></Background>
    <button class="toggle-button" @click="toggle">{{value}}</button>
  </div>
</template>

<script>
import LoginBox from "@/components/LoginBox/LoginBox";
import Background from "@/components/Background/Background";
import RegisterBox from "@/components/RegisterBox/RegisterBox";
export default {
  data() {
    return {
      which: LoginBox,
      value: "+"
    };
  },
  components: {
    LoginBox,
    Background,
    RegisterBox
  },
  methods: {
    toggle() {
      if (this.which == LoginBox) {
        this.which = RegisterBox;
        this.value = "x";
      } else {
        this.which = LoginBox;
        this.value = "+";
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }
  canvas {
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .toggle-button,
  .toggle-button-x {
    position: absolute;
    top: 28vh;
    right: 8vw;
    width: 16vw;
    height: 9vh;
    background-color: rgb(127, 255, 170);
    border-radius: 50%;
    text-align: center;
    line-height: 9vh;
    color: white;
    font-size: 20px;
    outline: none;
    border: 0;
  }
}
</style>
