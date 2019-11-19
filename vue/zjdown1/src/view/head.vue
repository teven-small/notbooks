<template>
    <!-- 顶部部分 -->
    <div id="dc_head">
        <!-- 顶部提示 -->
        <div class="top_div clear">
            <div class="main">
                <div class="rt">
                    <a href="">设为首页</a>
                    <a href="">加入收藏</a>
                    <a href="">APP下载</a>
                </div>
                <div class="lt">
                    <b>官网公告：</b>
                    <marquee>查询查询查询查询查询查询查询</marquee>
                </div>
            </div>
        </div>

    <!-- logo、搜索框 -->
    <div class="dc_head_search clear">
        <div class="main">
            <div class="rt">
                <div>
                    <input type="text">
                    <span class="search_btn">搜索</span>
                </div>
                <div class="link_box">
                    <a href="">955计划</a>
                    <a href="">QQ</a>
                    <a href="">微信</a>
                    <a href="">955娱乐</a>
                    <a href="">万能浏览器</a>
                    <a href="">绝地求生</a>
                    <a href="">多换西游</a>
                </div>
            </div>
            <div class="lt">
                <div class="logo_img"></div>
                <div class="logo_title">
                    <div>中金下载</div>
                    <div>
                        <span>安全便捷</span>&nbsp;&nbsp;&nbsp;<span>极速下载</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 导航栏 -->
    <div class="nav_box">
        <div class="main">
            <ul id="sub_nav">
                <li :class="item.active==true?'active':''" v-for="(item,index) in nav_data" :key="index" 
                    @click="jump(index)">{{item.title}}
                    <div></div></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            nav_data:[
                {title:'首页', url:'home', active: true},
                {title:'软件下载', url:'software', active: false},
                {title:'安卓下载', url:'', active: false},
                {title:'苹果下载', url:'', active: false},
                {title:'游戏专区', url:'game', active: false},
                {title:'装机必备', url:'necessary', active: false},
                {title:'排行榜', url:'ranking', active: false},
            ]
        }
    },
    methods:{
        jump(index){
            
            this.nav_data.forEach(item => {
                item.active = false;
            })
            this.nav_data[index].active = true;
            this.$router.replace({name:this.nav_data[index].url})
        }
    }
}
</script>

<style scoped>

@import '../assets/css/default.css';
@import '../assets/css/common.css';

</style>

