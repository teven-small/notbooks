<template>
    <div id="dc_main">
        <div class="main">
            <!-- 软件下载区域 -->
            <div class="software clear radius_fff">
                <div :class="['software_list','lt',item.type]" v-for="(item,index) in software_data" :key=index>
                    <div class="software_item top_icon_model">
                        <div v-for="(item1, index1) in item.arr" :key=index1>
                            <img :src="item1.url" alt="">
                            <p>{{item1.title}}</p>
                        </div>
                    </div>
                </div>
                <!-- <div class="software_list two lt">
                    <div class="software_item top_icon_model">
                       
                        <div class="">
                            <img src="../assets/images/尝鲜.png" alt="">
                            <p>QQ音乐</p>
                        </div>
                    </div>
                </div>
                <div class="software_list three lt">
                    <div class="software_item top_icon_model">
                        <div class="">
                            <img src="../assets/images/尝鲜.png" alt="">
                            <p>QQ音乐</p>
                        </div>
                    </div>
                </div> -->
            </div>
    
            <!-- 广告轮播图 -->
            <div class="content">
                <div class="lt lt_box">
                <div class="slideshow">
                        <!-- <ul>
                            <li></li>
                        </ul> -->
                        <el-carousel :interval="5000" arrow="always" height="300px" indicator-position="right">
                            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                                <img :src="item.src" alt="" class="banner_img">
                            </el-carousel-item>
                        </el-carousel>
                        <!-- <div class="slide prev">  </div>
                        <div class="slide next">  </div> -->
                        <div class="notice">逆水寒：所有江湖偶遇，都是宿命的缘分</div>
                        <div class="dots">
                            <ul>
                                <li class="active"></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                </div>
    
                    <!-- 软件分类 -->
                    <div class="software_classify lt radius_fff">
                        <div class="sub_title">
                            <div class="lt">软件分类：</div>
                            <div class="rt">更多</div>
                        </div>
                        <div class="software_classify_item" v-for="(item,index) in software_type" :key=index>
                            <p>{{item.title}}</p>
                            <div>
                                <span v-for="(item1,index1) in item.list" :key=index1>{{item1.name}}</span>
                                <span class="more_btn">更多</span>
                            </div>
                        </div>
                    </div>
    
                    <div class="center_content rt">
    
                        <!-- 热门头条 -->
                        <div class="hot_notice radius_fff">
                            <div class="software_notice top_icon_model">
                                <div v-for="(item,index) in hot_data" :key=index>
                                    <img :src="item.url" alt="">
                                    <p :class="item.isActive==true?'active':''">{{item.title}}</p>
                                </div>
                            </div>
        
                            <!-- 头条 -->
                            <div class="headlines">
                                <div class="headlines_title">
                                    <img src="" alt="">
                                    <span>夺宝头条官方正版</span>
                                    <i></i>
                                </div>
        
                                <div class="headlines_content">
                                    <div v-for="(item,index) in headlines" :key=index>
                                        <span class="discribe">{{item.way}}</span>
                                        <span class="software_name">{{item.name}}</span>
                                        <span class="software_time rt">{{item.time}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <!-- 热门游戏 -->
                        <div class="hot_game top_icon_model radius_fff padding_20">
                            <p class="notice_title">热门手游</p>
                            <div v-for="(item, index) in hot_game" :key=index>
                                <img :src="item.url" alt="">
                                <p>{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="rt rt_box">
                    <!-- 今日推荐 -->
                    <div class="toDay_news radius_fff padding_20">
                        <p class="recommendation">今日推荐</p>
                        <div class="content_right_item" v-for="(item, index) in today_recommendation" :key=index>
                            <img class="lt" src="" alt="">
                            <div class="lt explain_box">
                                <p>{{item.name}}</p>
                                <p class="explain">{{item.explain}}</p>
                            </div>
                            <div class="down_load rt">立即下载</div>
                        </div>
                    </div>
    
                    <!-- 最近更新 -->
                    <div class="recent_updates radius_fff">
                        <p class="notice_title">最近更新</p>
                        
                         <div class="recent_updates_item"> 
                            <img src="../assets/images/攻略.png" alt="">
                            <div class="software_evaluate">
                                <p>QQ浏览器2019官方最新版</p>
                                <p>三星</p>
                            </div>
                        </div>
                        <div :class="['recent_updates_item',item.isActive==true?'active':'']" v-for="(item,index) in recent_updates" :key="index"> 
                            <img :src="item.url" alt="">
                            <div class="software_down" v-if="item.isActive">
                                <p class="software_detail">QQ浏览器2019官方最新版</p>
                                <div class="details_box">
                                    <div class="lt">
                                        <p class="software_size">大小： {{item.size}}</p>
                                        <p>类型： {{item.type}}</p>
                                    </div>
                                    <div class="rt now_down">立即下载</div>
                                </div>
                            </div>
                            <div class="software_evaluate" v-else>
                                <p>{{item.name}}</p>
                                <p>{{item.appraise}}</p>
                            </div>
                        </div>

                    </div>
    
                    <!-- 本周下载排行榜 -->
                    <div class="download_ranking radius_fff padding_20">
                        <div class="sub_title">
                            <div class="lt">本周下载排行</div>
                            <div class="rt">更多</div>
                        </div>
                        <div class="download_item">
                            <img src="../assets/images/1.png" alt="" class="ranking">
                            <img src="../assets/images/攻略.png" alt="" class="soft_icon">
                            <span>王者荣耀2019最新版</span>
                        </div>
                        <div class="download_item">
                            <img src="../assets/images/2.png" alt="" class="ranking">
                            <img src="../assets/images/攻略.png" alt="" class="soft_icon">
                            <span>王者荣耀2019最新版</span>
                        </div>
                        <div class="download_item">
                            <img src="../assets/images/3.png" alt="" class="ranking">
                            <img src="../assets/images/攻略.png" alt="" class="soft_icon">
                            <span>王者荣耀2019最新版</span>
                        </div>
                        <div class="download_item">
                            <img src="../assets/images/4.png" alt="" class="ranking">
                            <img src="../assets/images/攻略.png" alt="" class="soft_icon">
                            <span>王者荣耀2019最新版</span>
                        </div>
                    </div>
                </div>
            </div>
        
            <!-- 推荐下载 -->
            <div class="margin_top_20 radius_fff margin_bottom_20">
                <div class="recommend_down padding_20">
                    <ul class="lt">
                        <li class="active">电脑必备</li>
                        <li>手机必备</li>
                    </ul>
                    <span class="rt">更多</span>
                </div>
    
                <div class="recommend_down_icon">
                    <ul>
                        <li v-for="(item,index) in recommend_down" :key="index">
                            <img :src="item.url" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
    
                <div class="software_box margin_top_20">
                    <ul>
                        <li>
                            <div class="category_name">安全软件</div>
                            <dl>
                                <dd>
                                    <img src="" alt="">
                                    <span>电脑管家</span>
                                </dd>
                                <dd>
                                    <img src="" alt="">
                                    <span>电脑管家</span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <div class="category_name">系统工具</div>
                            <dl>
                                <dd>
                                    <img src="" alt="">
                                    <span>电脑管家</span>
                                </dd>
                                <dd>
                                    <img src="" alt="">
                                    <span>电脑管家</span>
                                </dd>
                            </dl>
                        </li>
                        <li><div class="category_name">网页浏览</div></li>
                        <li><div class="category_name">聊天社交</div></li>
                        <li><div class="category_name">图文处理</div></li>
                        <li>
                            <div class="category_name">文字处理</div>
                            <dl class="last_dl">
                                <dd>
                                    <img src="" alt="">
                                    <span>电脑管家</span>
                                </dd>
                                <dd>
                                    <img src="" alt="">
                                    <span>电脑管家</span>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>


export default {
    data(){
        return{
            //轮播图
            bannerList: [
                { src: require('../assets/images/banner1.jpg'), href: "" },
                { src: require('../assets/images/banner2.jpg'), href: "" },
                { src: require('../assets/images/banner3.jpg'), href: "" },
                { src: require('../assets/images/banner4.jpg'), href: "" },
                { src: require('../assets/images/banner5.jpg'), href: "" },
            ],

            software_data:[
                { type: 'one', arr:[
                    {url: require('../assets/images/尝鲜.png'), title:'QQ音乐'}
                ]},
                { type: 'two', arr:[
                    {url: require('../assets/images/尝鲜.png'), title:'QQ音乐'}
                ]},
                { type: 'three', arr:[
                    {url: require('../assets/images/尝鲜.png'), title:'QQ音乐'}
                ]},
            ],

            // 软件分类
            software_type:[
                { title:'视频软件', list:[
                    {name:'网路视频'},
                    {name:'本地播放'},
                    {name:'格式转换'},
                    {name:'音乐处理'},
                ]},
                { title:'聊天软件', list:[
                    {name:'网路视频'},
                    {name:'本地播放'},
                    {name:'格式转换'},
                    {name:'音乐处理'},
                ]}
            ],

            // 热门数据
            hot_data:[
                {title:'精品', url: require('../assets/images/精品.png'), isActive:true},
                {title:'精品', url: require('../assets/images/精品.png'), isActive:false},
            ],

            // 头条数据
            headlines:[
                {name:'360极速浏览器绿色版', way:'网路浏览', time:'2019-05'},
                {name:'360极速浏览器绿色版', way:'网路浏览', time:'2019-05'},
                {name:'360极速浏览器绿色版', way:'网路浏览', time:'2019-05'}
            ],

            //热门游戏数据
            hot_game:[
                {name:'消愁者联盟', url: require('../assets/images/手游.png')},
                {name:'消愁者联盟', url: require('../assets/images/手游.png')},
                {name:'消愁者联盟', url: require('../assets/images/手游.png')}
            ],

            //今日推荐
            today_recommendation:[
                {name:'支付宝', explain:'支付就用支付宝'},
                {name:'支付宝', explain:'支付就用支付宝'},
                {name:'支付宝', explain:'支付就用支付宝'},
                {name:'支付宝', explain:'支付就用支付宝'}
            ],

            //最近更新
            recent_updates:[
                {url:require('../assets/images/攻略.png'), isActive:true, name:'QQ浏览器2019官方最新版', appraise:'三星',size:'850M',type:'杀毒软件'},
                {url:require('../assets/images/攻略.png'), isActive:false, name:'QQ浏览器2019官方最新版', appraise:'三星'}
            ],

            // 推荐下载
            recommend_down:[
                { name:'精品', url:require('../assets/images/精品.png')},
                { name:'精品', url:require('../assets/images/精品.png')}
            ]
        }
    },

    mounted(){
        console.log(this.$store.state.nav.isActive)
    }
}
</script>


<style scoped>

@import '../assets/css/default.css';
@import '../assets/css/common.css';
.banner_img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>
