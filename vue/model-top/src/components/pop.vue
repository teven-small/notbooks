<template>
  <div class="cover">
    <div class="content" ref="content" :style="contentSize">
      <div class="close-it" @click="baseClose">X</div>
      <div>
        <slot>
          <p>当父组件调用我时，没有传自定义内容时，我就会显示了，如果传了自定义内容，我就不显示了。</p>
        </slot>
      </div>
      <div class="button-group">
        <button @click="baseConfirm">确定</button>
        <button @click="baseCancel">取消</button>
        <button @click="change">改变</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["father", "confirmWay", "cancelWay", "closeWay"],
  data() {
    return {
      contentSize: {}
    };
  },
  mounted() {
    this.contentSize = {
      marginTop: -this.$refs.content.clientHeight / 2 + "px",
      marginLeft: -this.$refs.content.clientWidth / 2 + "px"
    };
  },
  methods: {
    baseClose() {
      this.baseHidden("closeWay");
    },
    baseConfirm() {
      this.baseHidden("confirmWay");
    },
    baseCancel() {
      this.baseHidden("cancelWay");
    },
    // baseFn() {
    //   this.baseHidden();
    // },
    baseHidden(type) {
      var _FN = this[type]; // || function() {};
      _FN.call(this.father);
      this.father.show = false;
    },
    change() {
      this.father.msg1 = "内容已经改变";
    }
  }
};
</script>

<style scoped>
.close-it {
  padding-bottom: 10px;
  text-align: right;
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
.content {
  max-width: 400px;
  max-height: 200px;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 10px;
  border: 1px solid;
  background: #fff;
}
</style>