<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    draw: function() {
      let canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        clientWidth = document.documentElement.clientWidth,
        clientHeight = document.documentElement.clientHeight;

      canvas.width = clientWidth;
      canvas.height = clientHeight;
        //绘制黄色五边形
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(clientWidth, 0);
      context.lineTo(clientWidth, clientHeight * 0.8);
      context.lineTo(clientWidth * 0.3, clientHeight);
      context.lineTo(0, clientHeight);
      context.lineTo(0, 0);
      context.fillStyle = "#ffeb3b";
      context.fill();
        //绘制紫色三角形
      context.beginPath();
      context.moveTo(clientWidth, clientHeight);
      context.lineTo(clientWidth * 0.3, clientHeight);
      context.lineTo(clientWidth, clientHeight * 0.8);
      context.lineTo(clientWidth, clientHeight);
      context.fillStyle = "#9C27B0";
      context.fill();
    }
  },
  mounted: function() {
    this.draw();
  }
};
</script>

<style lang="scss">
</style>
