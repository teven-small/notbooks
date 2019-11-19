<template>
  <div id="app" :style="{height:Screenheight+'px'}">
    
    <transition :name="transitionName">
      <router-view/>
    </transition>
    
    <mt-tabbar v-model="selected" fixed :class="{ 'leave': leaf }" style="transition: transform .4s cubic-bezier(.55,0,.1,1), -webkit-transform .4s cubic-bezier(.55,0,.1,1);">
      <mt-tab-item id="首页">
        <p class="iconfont icon-shouye"></p>
        首页
      </mt-tab-item>
      <mt-tab-item id="监测">
        <p class="iconfont icon-jiance"></p>
        监测
      </mt-tab-item>
      <mt-tab-item id="报警">
        <p class="iconfont icon-baojing"></p>
        报警
      </mt-tab-item>
      <mt-tab-item id="我的">
        <p class="iconfont icon-wode"></p>
        我的
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
import Rem from '@/assets/commJS/common'
new Rem();

export default {
  name: 'App',
  data() {
    return {
      selected:'首页',//默认选择页
      leaf:true,    //是否显示底部导航
      transitionName:'slide-go', //动画效果
      nowURL:0,       //路由
      high:'100%',
      Screenheight:0,
    }
  },
  watch: {
    //监测路由变化
    $route(to,from){
      console.log(this.$route.path,this.nowURL)
      var base =['/home','/monitor','/warning','/mine'];
      for(var i = 0;i<base.length;i++){
        if(this.$route.path == base[i]){
          this.leaf =false;
          console.log(i)
          // 判断路由添加动画
          if(this.nowURL <= i){
            this.transitionName = 'slide-go'
            this.nowURL = i
          }else{
            this.transitionName = 'slide-back'
            this.nowURL = i
          }
          break
        }else{
          this.leaf =true;
        }
      }
    },
    //路由跳转
    //这里不用this.$router.push()是因为在IOS端，微信底部有前进后退按钮，挡住了屏幕内容区域
    selected:function (val, oldVal) {
        switch(val){
            case '首页':
                this.$router.replace('/home');
            break;
            case '监测':
                this.$router.replace('/monitor');
            break;
            case '报警':
                this.$router.replace('/warning');
            break;
            case '我的':
                this.$router.replace('/mine');
            break;
        }
    },
  },
  created(){
    console.log(window.innerHeight)
    this.Screenheight = window.innerHeight
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
@import "./assets/commCSS/common";
@import "./assets/iconfont/iconfont";
</style>
