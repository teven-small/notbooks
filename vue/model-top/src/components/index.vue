<template>
  <div class="box">
    <button @click="showpop">显示</button>
    <p>{{ msg }}</p>
    <pop
      v-if="show"
      :father="this"
      :confirmWay="confirmWay"
      :cancelWay="cancelWay"
      :closeWay="closeWay"
    >
      <div>{{msg1}}</div>
    </pop>
  </div>
</template>

<script>
import pop from "./pop";
export default {
  components: {
    pop
  },
  data() {
    return {
      show: true,
      msg: "点击按钮弹出弹出框",
      msg1:
        "这是一个弹出框这是一个弹出框这是一个弹框这是一个弹出框这是一个弹出框这是一个弹框"
    };
  },
  methods: {
    showpop() {
      this.show = true;
    },
    confirmWay() {
      this.msg = "你点了确定";
      console.log("点击了确认按钮");
    },
    closeWay() {
      console.log("点击了x");
    },
    cancelWay() {
      console.log("点击了取消按钮");
    }
  }
};
</script>

<style>
</style>
