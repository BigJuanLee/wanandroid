<template>
  <!-- <div class="carousel">
    <transition-group name="list" tag="ul" class="container">
      <li v-for="(item, index) in banner" :key="'li' + index" v-show="index == currentIndex">
        <img :src="item.imagePath" alt />
        <div class="desc">{{item.title}}</div>
      </li>
    </transition-group>
    <ol class="points">
      <li v-for="(item, index) in banner" :key="index"></li>
    </ol>
  </div>-->
  <div class="carousel">
    <el-carousel height="20vh">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imagePath" alt srcset />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      currentIndex: 0,
      length: ""
    };
  },
  components: {},
  methods: {
    getBannerMsg() {
      this.axios
        .get("/banner/json")
        .then(res => {
          this.banner = res.data.data;
          this.length = res.data.data.length;
        })
        .catch(error => {
          return error;
        });
    }
    // move() {
    //   setInterval(() => {
    //     this.currentIndex++;
    //     if (this.currentIndex > this.length - 1) {
    //       this.currentIndex = 0;
    //     }
    //   }, 2000);
    // }
  },
  mounted() {
    this.getBannerMsg();
    // this.move();
  }
};
</script>

<style lang="scss">
.carousel {
  height: 20vh;
  img {
    width: 100%;
  }
}
// .carousel {
//   position: relative;
//   width: 100%;
//   height: 20vh;
//   overflow: hidden;
//   li {
//     list-style: none;
//   }
//   .container {
//     height: 100%;
//     margin: 0; //ul自带margin会把div挤下去
//     padding: 0; //padding让左边缺了一部分
//     position: relative;
//     display: flex;
//     overflow: hidden;
//     & li {
//       position: absolute;
//       top: 0;
//       width: 100%;
//       height: 100%;
//       & img {
//         width: 100%;
//         height: 100%;
//       }
//       & .desc {
//         position: absolute;
//         bottom: 0;
//         background-color: rgba(216, 190, 190, 0.8);
//         color: white;
//         font-size: 14px;
//         width: 100%;
//         height: 5vh;
//         line-height: 5vh;
//       }
//     }
//   }
//   .points {
//     position: absolute;
//     display: flex;
//     justify-content: space-around;
//     left: 50%;
//     bottom: 5vh;
//     transform: translateX(-50%);
//     padding: 0; //清除默认padding
//     width: 20vw;
//     & li {
//       width: 6px;
//       height: 6px;
//       border-radius: 50%;
//       background-color: rgb(216, 190, 190);
//     }
//   }
//   .list-enter-active {
//     transform: translateX(0);
//     transition: all 1s ease-in-out;
//   }
//   .list-leave-active {
//     transform: translateX(-100%);
//     transition: all 1s ease-in-out;
//   }
//   .list-enter {
//     transform: translateX(100%);
//   }
//   .list-leave {
//     transform: translateX(0);
//   }
// }
</style>
