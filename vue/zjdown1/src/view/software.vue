<template>
    <!-- 软件下载区域 -->
    <div id="dc_software">
        <div class="main">
            <div class="down_box_ top_icon_model radius_fff padding_20">
                <div class="hot_icon"></div>
                <div v-for="(item,index) in software_list" :key=index>
                    <img :src="item.url" alt="">
                    <p>{{item.name}}</p>
                </div>
            </div>
    
            <div class="content1 margin_top_20">
                <div class="lt">
                    <div class="radius_fff">
                        <p class="_title">热门手游</p>
                        <div class="list_soft padding_bottom_20">
                            <div><span>视频媒体</span><span>(1234456)</span></div>
                            <div><span>视频媒体</span><span>(1234456)</span></div>
                            <div><span>视频媒体</span><span>(1234456)</span></div>
                        </div>
                    </div>
                    <div class="margin_top_20 radius_fff">
                        <p class="_title">热门手游</p>
                        <div class="top_icon_model hot_software">
                            <div>
                                <img src="../assets/images/精品.png" alt="">
                                <p>精品</p>
                            </div>
                            <div>
                                <img src="../assets/images/精品.png" alt="">
                                <p>精品</p>
                            </div>
                            <div>
                                <img src="../assets/images/精品.png" alt="">
                                <p>精品</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rt rt_box padding_20 radius_fff">
                    <ul class="section_title">
                        <li>网络视频</li>
                        <li>网络视频</li>
                        <li>网络视频</li>
                        <li>网络视频</li>
                        <li>网络视频</li>
                    </ul>
                    <ul class="section_list margin_top_20">
                        <li>
                            <div class="lt_img_model">
                                <div class="model_icon inline_div"></div>
                                <div class="inline_div">
                                    <div>
                                        <b>王国TV</b>
                                        <span class="color_D4">更新时间：2019-21-5</span>
                                    </div>
                                    <div class="color_B2">万能数据恢复大师软件具备文件恢复、支持多种设备、常见文件预览、分区格式化后恢复功能。该软件支持从</div>
                                </div>
                                <div class="down_btn inline_div rt" @click="jumpDown">立即下载</div>
                            </div>
                        </li>
                        <li>
                            <div class="lt_img_model">
                                <div class="model_icon inline_div"></div>
                                <div class="inline_div">
                                    <div>
                                        <b>王国TV</b>
                                        <span class="color_D4">更新时间：2019-21-5</span>
                                    </div>
                                    <div class="color_B2">万能数据恢复大师软件具备文件恢复、支持多种设备、常见文件预览、分区格式化后恢复功能。该软件支持从</div>
                                </div>
                                <div class="down_btn inline_div rt" @click="jumpDown">立即下载</div>
                            </div>
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
            software_list:[
                {name:'QQ音乐', url:require('../assets/images/尝鲜.png')},
                {name:'QQ音乐', url:require('../assets/images/尝鲜.png')},
                {name:'QQ音乐', url:require('../assets/images/尝鲜.png')},
                {name:'QQ音乐', url:require('../assets/images/尝鲜.png')},
                {name:'QQ音乐', url:require('../assets/images/尝鲜.png')},
            ]
        }
    },
    methods:{
        jumpDown(){
            this.$router.replace({name:'details'})
        }
    }
}
</script>




<style scoped>

@import '../assets/css/default.css';
@import '../assets/css/common.css';

</style>