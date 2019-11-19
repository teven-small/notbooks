<template>
    <div style="height:100%">
        <div class="head">
            <div class="zone_sel" @click="ZoneSE()">
                <img src="../../assets/images/local.png" alt="" class="zone_det">
            </div>
            <p class="title">{{groupname}}</p>
            <div>
                <ul class="tab-menu">
                    <li v-for="(item,index) in navlist"
                        :key="index" class="tab-nav"
                        @click="navChange(index)"
                    >
                        <p class="nav-name" :class="{'active' :index == navListindex}">{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <!-- 右上角菜单 -->
            <div class="showtype-select" @click="Showselect()">
                <i class="pic-sanjiao"></i>
                <span class="iconfont icon-liebiao" style="display:block" v-if="showtype == 0"></span>
                <i class="pic-map" v-if="showtype == 1"></i>
                <i class="pic-img" v-if="showtype == 2"></i>
            </div>
            <!-- 左上角分区选择 -->
            <div class="group_selet" @click="Grouslect()"  v-show="groupshow">
                <ul class="all_group" :style="{height:Groupheight()}">
                    <li style="border-bottom: 0.02rem solid #ddd;"
                        @click="ZoneUp()"
                    >全部</li>
                    <li v-for="(zone, index) in groupdata"
                        :key = "index"
                        style="border-bottom: 0.02rem solid #ddd;"
                        @click="ZoneUp(zone)"
                    >
                        <p>{{zone.GroupName}}</p>
                    </li>
                </ul>
            </div>
            <div class="popup" v-if="typelist" @click="Showpopup()">
                <div class="all-type">
                    <ul>
                        <li class="type-list" @click="Allshow(0)">
                            <i class="menu-list"></i>
                            列表
                        </li>
                        <li class="type-list" @click="Allshow(1)">
                            <i class="menu-map"></i>
                            地图
                        </li>
                        <li class="type-list" @click="Allshow(2)">
                            <i class="menu-pic"></i>
                            图形
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content" :style="{height:high+'px'}" >
            <!-- 表格 -->
            <Tabel-View
                v-if="showtype == 0"
            >
            </Tabel-View>
            <!-- 地图 -->
            <Map-view
                v-if="showtype == 1"
            >
            </Map-view>
            <!-- 列表 -->
            <List-View
                v-if="showtype == 2"
            >
            </List-View>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { AREA } from '../../axios/axios'
import tabel from './tabel'
import list from './list'
import map from './map'
export default {
    data() {
        return {
            navlist:[
                {
                    name:'全部'
                },
                {
                    name:'离线'
                },
                {
                    name:'超标'
                },
                {
                    name:'断电'
                }
            ],                      //导航菜单
            navListindex:0,        //初始默认菜单选择
            groupname:'监测',
            value:null,
            basedata:[],            //存放数据
            high:0,                 //内容区高度
            typelist:false,         //类型选择显示
            showtype:0,             //显示类型
            groupdata:[],           //分区数据
            groupshow:false,        //分区显示
        }
    },
    components:{
        'Tabel-View':tabel,          //表格显示
        'List-View':list,            //列表显示
        'Map-view':map               //地图显示
    },
    mounted(){
        this.navListindex = this.$store.state.all.meumIndex;        //菜单选择
        this.showtype = this.$store.state.all.displayType;         //展示类型
        this.Tabheight();
        this.Getusergroup();
    },
    methods:{
        // 打开遮罩层
        Showselect(){
            this.typelist = true
        },
        // 关闭遮罩层
        Showpopup(){
            this.typelist = !this.typelist;
        },
        //显示类型展示选择
        Allshow(index){
           this.$store.commit('setdisplayState',index);   //提交显示类型展示状态
           this.showtype = index;
        },
        //导航菜单切换
        navChange(index){
            this.navListindex = index;
            this.$store.commit('setmeumState',index);   //提交导航栏菜单状态
        },
        // 打开分区选择
        ZoneSE(){
            this.groupshow = true;
        },
        // 关闭分区选择
        Grouslect(){
            this.groupshow = false;
        },
        //分区选择
        ZoneUp(Group){
            console.log(Group)
            if(Group){
                this.groupname = Group.GroupName
                this.$store.commit('setbaseState',Group.GroupId);     //提交分区ID
            }else{
                this.groupname = "监测";
                this.$store.commit('setbaseState','');     //提交分区ID
            }
        },
        // 分区显示高度
        Groupheight(){
            if(this.length>=8){
                return '6.4rem'
            }else{
                return 'auto'
            }
        },
        //表格区域高度
        Tabheight(){
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var headheight = 100*(windowwidth/750)*1.6
            // var headheight = document.getElementsByClassName('head')[0].clientHeight;
            console.log(headheight)
            var mintheight = document.getElementsByClassName('mint-tabbar')[0].clientHeight;
            this.high = windowHeight-(headheight+mintheight);
        },
        // 获取用户分区
        Getusergroup(){
            var userName = sessionStorage.getItem('name')
            var DomainAddress = sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                userName:userName,
                Identitys:port,
            }
            URL.get(AREA(params)).then(res =>{
                console.log(res)
                this.groupdata=res.data.Data
                // console.log(this.groupdata)
                // this.length =  this.groupdata.length
            })
        },

    }
}
</script>

<style>
@import './base';
</style>
