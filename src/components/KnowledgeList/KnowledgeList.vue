<template>
  <div class="knowledge-list">
    <h4 class="name">{{list.name}}</h4>
    <div class="wrapper">
      <span class="children-name" v-for="(item, index) in list.children" :key="index">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  components: {},
  props: {
    list: Object
  }
};
</script>

<style lang="scss">
.knowledge-list {
  width: 99vw;
  min-height: 14vh;
  padding: 2vh 0 1vh 4vw;
  position: relative;
  background-color: white;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0 auto 0.3vh;
  
  &::after {
    content: ">";
    font-size: 23px;
    position: absolute;
    top: 5vh;
    right: 3vw;
  }
  .name {
    margin: 0; //清楚h4自带margin
  }
  .wrapper {
    margin-top: 1vh;
    line-height: normal;
    width: 90%;
    .children-name {
      font-size: 12px;
      display: inline-block;
      margin-right: 3vw;
    }
  }
}
</style>
