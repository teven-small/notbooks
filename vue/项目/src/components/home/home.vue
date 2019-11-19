<template>
    <div style="height:100%">
        <div class="head">
            <p class="title">首页</p>
        </div>
        <div class="content">
            <!-- 圆环区域 -->
            <div class="pic">
                <div class="circle">
                    <div class="circle-content">
                        <div id="echart" style="width:2.52rem; height:2.52rem;padding:0.21rem;">
                        </div>
                        <p class="rate">{{rate}}<i style="font-size: 0.28rem;">%</i></p>
                        <p class="level">{{level}}</p>
                    </div>
                </div>            
            </div>
            <!-- 设备各种情况 -->
            <div class="total">
                <ul class="NUM">
                    <li class="sum">
                        <span class="iconfont icon-zongshu"></span>
                        <p class="num">{{sum}}</p>
                        <p class="clasif">总数</p>
                    </li>
                    <li class="normal">
                        <span class="iconfont icon-zhengchang"></span>
                        <p class="num">{{normal}}</p>
                        <p class="clasif">正常</p>
                    </li>
                    <li class="overproof"> 
                        <span class="iconfont icon-chaobiao"></span>
                        <p class="num">{{overstandard}}</p>
                        <p class="clasif">超标</p>
                    </li>
                    <li class="off-line"> 
                        <span class="iconfont icon-lixian"></span>
                        <p class="num">{{offline}}</p>
                        <p class="clasif">离线</p>
                    </li>
                    <li class="outage"> 
                        <span class="iconfont icon-duandian"></span>
                        <p class="num">{{poweroff}}</p>
                        <p class="clasif">断电</p>
                    </li>
                    <li class="low-energy"> 
                        <span class="iconfont icon-didianliang"></span>
                        <p class="num">{{lowpower}}</p>
                        <p class="clasif">低电量</p>
                    </li>
                </ul>
            </div>
            <div class="classify" :style="{height:Scroheight+'px'}">
                <ul style="background:#FFFFFF;padding:0 0.3rem">
                    <li class="changwen" v-for="(item1,index1) in homedataList" :key = index1>
                        <div class="biaoshi"></div>
                        <p class="type">{{item1.ClassificationName}}</p>
                        <div class="data-content">
                            <p class="totaldata">总数 {{item1.ClassificationSum}}</p>
                            <p class="totaldata">超标 {{item1.ClassificationOverStandard}}</p>
                            <p class="totaldata">离线 {{item1.ClassificationOffline}}</p>
                            <p class="totaldata">断电 {{item1.ClassificationPowerOff}}</p>
                            <p class="totaldata">低电量 {{item1.ClassificationLowPower}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {HOME} from '../../axios/axios';
import axios from 'axios';
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
export default {
    data() {
        return {
            rate:null,      //比率
            sum:null,       //总数
            normal:null,    //正常
            offline:null,   //离线
            overstandard:null,  //超标
            poweroff:null,      //断电
            lowpower:null,      //低电量
            level:'',           //级别
            homedataList:null,  //具体数据
            Scroheight:0,       //滚动区域高度
        }
    },
    mounted() {
        this.HomeData();
        this.ScrolHeight()
    },
    methods: {
        //滚动区域高度
        ScrolHeight(){
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var headheight = 100*(windowwidth/750)*8.84;
            console.log(headheight);
            var mintheight = document.getElementsByClassName('mint-tabbar')[0].clientHeight;
            console.log(mintheight)
            this.Scroheight = windowHeight-(headheight+mintheight);
        },
        //请求数据
        HomeData(){
            var userName = sessionStorage.getItem('name')
            var port = sessionStorage.getItem('port')
            var DomainAddress = sessionStorage.getItem('address')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                userName:userName,
                Identitys:port
            }
            console.log(params)
            URL.get(HOME(params)).then(res =>{
                console.log(res)
                var homedata = res.data.Data 
                this.sum = homedata.Sum
                this.normal = homedata.Normal
                this.offline = homedata.Offline
                this.overstandard = homedata.OverStandard
                this.poweroff = homedata.PowerOff
                this.lowpower = homedata.LowPower
                this.homedataList = homedata.ListHomeClassificationModel
                this.rate = (homedata.Percentage).replace(/%/,"");
                if(this.rate>=80){
                    this.level = '优'
                }else if(this.rate<60){
                    this.level = '差'
                }else{
                    this.lecel = '良'
                }
                //画图
                this.circle()
            })
        },
        //画图
        circle(){
            console.log(this.rate)
            var myChart = echarts.init(document.getElementById('echart'));
            myChart.setOption ({
                color:['#2FA5F3','#ECECEC'],
                series:[
                    {
                        type:'pie',
                        silent:true, 
                        radius:['87%','100%'],      //调整圆环大小
                        itemStyle:{
                            normal:{
                                label:{
                                    show:false
                                },
                                labelLine:{
                                    show:false
                                }
                            },
                        },
                        data:[
                            {
                                value:this.rate,
                            },
                            {
                                value:100-(this.rate),
                            }
                        ]
                    }
                ]
            })
        },
    },
}
</script>

<style>
@import './home';
</style>
