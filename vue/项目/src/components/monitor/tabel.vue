<template>
    <div>
        <div class="search">
            <div class="search-data" @click="Getdata()">
                <img src="../../assets/images/search.png" class="serach-pic">
            </div>
            <input type="text" placeholder="请输入仪器名称" v-model="value" class="marchine-name">
        </div>
        <div class="tabel-content">
            <div class="lis">
                <div class="flo" style="border-top:1px solid #ddd" >
                    <div class="t_left" style="float:left;width:1.94rem;text-align:center">
                        <table class="tile">
                            <tr>
                                <th class="log-name">仪器名称</th>
                            </tr>
                        </table>
                        <div class="cl_freeze" id="cl_freeze" :style="{height:rheight+'px'}">
                            <table class="tile">
                                <tr v-for ="(item,index) in basedata" :key ="index">
                                <td :style="{height:Heiht(item.LOGS_SAMPLENUM)}" 
                                    v-if="dis(item.LOGS_SAMPLENUM)" 
                                    class="log-name" 
                                    @click="open(item.LOGGER_NAME,item.LOGGER_SN)">
                                        <p class="logname">{{item.LOGGER_NAME}}</p>
                                </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="t_r" style="float:left;width:5.56rem;">
                        <div class="t_r_t" id="t_r_t" style="width:5.56rem;overflow:hidden">
                            <table class="every-part">
                                <tr>
                                    <th class="ch-type">监测点</th>
                                    <th class="new-data">实时数据</th>
                                    <th class="max">最大值</th>
                                    <th class="min">最小值</th>
                                    <th class="avg">平均值</th>
                                    <th class="range">标准范围</th>
                                    <th class="logs-time">采集时间</th>
                                    <th class="logstate">设备状态</th>
                                </tr>
                            </table>
                        </div>
                        <div class="t_r_content" id="t_r_content" :style="{ height:rheight+'px' }" @scroll="aa()"  style="padding-bottom:0.2rem">
                            <table class="realtime-data" >
                                <tbody v-for ="(item,index) in basedata" :key ="index">
                                    <!-- 根据通道数 -->
                                    <tr v-if="item.LOGS_SAMPLENUM>=1">
                                        <td class="ch-type">{{item.CHONE_TYPE}}</td>
                                        <td class="new-data" :style="{color:level(item.CHONE_UPPERLIMIT,item.CHONE_LOWERLIMIT,item.LOGS_CHONE)}">{{item.LOGS_CHONE}}</td>
                                        <td class="max">{{item.CHONE_MAX}}</td>
                                        <td class="min">{{item.CHONE_MIN}}</td>
                                        <td class="avg">{{item.CHONE_AVG}}</td>
                                        <td class="range">{{item.CHFONE_RANGE}}</td>
                                        <td class="logs-time">{{item.LOGS_TIME}}</td>
                                        <td class="logstate" :style="{color:level(item.CHONE_UPPERLIMIT,item.CHONE_LOWERLIMIT,item.LOGS_CHONE)}">{{type(item.CHONE_UPPERLIMIT,item.CHONE_LOWERLIMIT,item.LOGS_CHONE)}}</td>
                                    </tr>
                                    <tr v-if="item.LOGS_SAMPLENUM>=2">
                                        <td class="ch-type">{{item.CHTWO_TYPE}}</td>
                                        <td class="new-data" :style="{color:level(item.CHTWO_UPPERLIMIT,item.CHTWO_LOWERLIMIT,item.LOGS_CHTWO)}">{{item.LOGS_CHTWO}}</td>
                                        <td class="max">{{item.CHTWO_MAX}}</td>
                                        <td class="min">{{item.CHTWO_MIN}}</td>
                                        <td class="avg">{{item.CHTWO_AVG}}</td>
                                        <td class="range">{{item.CHFTWO_RANGE}}</td>
                                        <td class="logs-time">{{item.LOGS_TIME}}</td>
                                        <td class="logstate" :style="{color:level(item.CHTWO_UPPERLIMIT,item.CHTWO_LOWERLIMIT,item.LOGS_CHTWO)}" >{{type(item.CHTWO_UPPERLIMIT,item.CHTWO_LOWERLIMIT,item.LOGS_CHTWO)}}</td>
                                    </tr>
                                    <tr v-if="item.LOGS_SAMPLENUM>=3">
                                        <td class="ch-type">{{item.CHTHR_TYPE}}</td>
                                        <td class="new-data" :style="{color:level(item.CHTHR_UPPERLIMIT,item.CHTHR_LOWERLIMIT,item.LOGS_CHTHR)}">{{item.LOGS_CHTHR}}</td>
                                        <td class="max">{{item.CHTHR_MAX}}</td>
                                        <td class="min">{{item.CHTHR_MIN}}</td>
                                        <td class="avg">{{item.CHTHR_AVG}}</td>
                                        <td class="range">{{item.CHFTHR_RANGE}}</td>
                                        <td class="logs-time">{{item.LOGS_TIME}}</td>
                                        <td class="logstate" :style="{color:level(item.CHTHR_UPPERLIMIT,item.CHTHR_LOWERLIMIT,item.LOGS_CHTHR)}">{{type(item.CHTHR_UPPERLIMIT,item.CHTHR_LOWERLIMIT,item.LOGS_CHTHR)}}</td>
                                    </tr>
                                    <tr v-if="item.LOGS_SAMPLENUM>=4">
                                        <td class="ch-type">{{item.CHFOUR_TYPE}}</td>
                                        <td class="new-data" :style="{color:level(item.CHFOUR_UPPERLIMIT,item.CHFOUR_LOWERLIMIT,item.LOGS_CHFONE)}">{{item.LOGS_CHFONE}}</td>
                                        <td class="max">{{item.CHFOUR_MAX}}</td>
                                        <td class="min">{{item.CHFOUR_MIN}}</td>
                                        <td class="avg">{{item.CHFOUR_AVG}}</td>
                                        <td class="range">{{item.CHFOUR_RANGE}}</td>
                                        <td class="logs-time">{{item.LOGS_TIME}}</td>
                                        <td class="logstate" :style="{color:level(item.CHFOUR_UPPERLIMIT,item.CHFOUR_LOWERLIMIT,item.LOGS_CHFONE)}">{{type(item.CHFOUR_UPPERLIMIT,item.CHFOUR_LOWERLIMIT,item.LOGS_CHFONE)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>  
                </div>  
            </div>
            <div class="no_list" v-if="have">
                <img src="../../assets/images/none.png">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { MONITOR } from '../../axios/axios'
export default {
    data(){
        return {
            value:this.$store.state.all.searchText,               //搜索内容
            rheight:0,
            basedata:[],            //存放数据
            alarmgive:this.$store.state.all.meumIndex,            //菜单栏切换
            have:false,             //没数据时
            basestion:this.$store.state.all.baseStation,           //基站
        }
    },
    computed:{
        //菜单选择
        nowdata:function(){
            return this.$store.state.all.meumIndex              
        },
        //基站获取
        baseStation:function(){
            return this.$store.state.all.baseStation           
        },
        //搜索内容获取
        sechText:function(){
            return this.$store.state.all.searchText     
        }
    },
    watch:{
        nowdata(newVal,oldVal){
            this.alarmgive = newVal;
            this.Getdata();
        },
        baseStation(newVal,oldVal){
            console.log(newVal,oldVal);
            this.basestion = newVal;
            this.Getdata();
        },
        sechText(newVal,oldVal){
            this.value = newVal;
            this.Getdata();
        }
    },
    mounted(){
        this.Taheight();        //获取高度
        this.Getdata();         //获取数据
    },
    methods:{
        // 表格页面滚动适配
        aa(){
            var a=document.getElementById("t_r_content").scrollTop; 
            var b=document.getElementById("t_r_content").scrollLeft; 
            document.getElementById("cl_freeze").scrollTop=a; 
            document.getElementById("t_r_t").scrollLeft=b; 

        },
        //表格区域高度
        Taheight(){
            console.log(this.nowdata)
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var headheight = 100*(windowwidth/750)*1.6
            var mintheight = document.getElementsByClassName('mint-tabbar')[0].clientHeight;
            this.rheight = windowHeight-(100*(windowwidth/750)*1.9)-headheight-mintheight;
           
        },
        // 获取数据
        Getdata(){
            //提交显示类型展示状态
            this.$store.commit('setsearchState',this.value);   
            var userName = sessionStorage.getItem('name')
            var DomainAddress = sessionStorage.getItem('address')
            var port = sessionStorage.getItem('port')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                userName:userName,
                Identitys:port,
                groupId:this.basestion,
                giveAnAlarm:this.alarmgive,
                loggerName:this.value,
            };
            URL.get(MONITOR(params)).then(res =>{
                if(res.data.State==200){
                    this.have=false
                    this.basedata = res.data.Data
                }else{
                    this.have=true
                    this.basedata=[]
                }
            })
        },
        //跳转至详情页
        open(mac,macname){
            this.$router.replace({
                name:'/detail',
                params:{
                    inst:mac,
                    mach:macname,
                }
            })
        },
        dis(x){
            if(x==0){
                return false
            }else{
                return true
            }
        },
        //表格对齐
        Heiht(s){
            switch(s){
                case"1":return(0.65+'rem');break;
                case"2":return(1.3+'rem');break;
                case"3":return(1.95+'rem');break;
                case"4":return(2.6+'rem');break;
                default:'';  
            }
        },
        // 判断仪器状况
        type(a,b,c){
            if(Number(c)>Number(a)||Number(c)<Number(b)){
                return '超标'
            }else{
                return '正常'
            }
        },
        level(u,v,w){
            if(Number(w)>Number(u)||Number(w)<Number(v)){
                return "red"
            }
        }
    }
}
</script>

<style>
.no_list{
    position: absolute;
    top: 4rem;
    left: 50%;
    margin-left: -99px;
}
</style>
