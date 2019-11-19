<template>
    <div style="height: 100%;position:relative">
        <div class="search">
            <div class="search-data" @click="Getpicdata()">
                <img src="../../assets/images/search.png" class="serach-pic">
            </div>
            <input type="text" placeholder="请输入仪器名称" v-model="value" class="marchine-name">
        </div>
        <div class="list-content" :style="{ height:lisheight+'px' }">
            <div class="device"  @click="open(item.LOGGER_NAME,item.LOGGER_SN)" v-for="(item,index) in devicelist" :key="index">
                <p class="devicename">
                    {{item.LOGGER_NAME}}
                </p>
                <!-- 根据通道数显示 -->
                <ul>
                    <li class="device-content"  v-if="item.LOGGER_CHNUM>=1">
                        <p class="left-content"
                            :class="device(item.LOGGER_CHNUM)"
                            :style="{color:Color(item.LOGS_CHONE,item.CHONE_LOW,item.CHONE_HIGH)}"
                        >{{item.LOGS_CHONE}}<span class="machin-ty">{{item.CHONE_TYPE}}</span></p>
                        <p class="right-content" :class="scope(item.LOGGER_CHNUM)">{{item.CHONE_LOW}}-{{item.CHONE_HIGH}}</p>
                    </li>
                    <li class="device-content" v-if="item.LOGGER_CHNUM>=2">
                        <p class="left-content"
                            :class="device(item.LOGGER_CHNUM)" 
                            :style="{color:Color(item.LOGS_CHTWO,item.CHTWO_LOW,item.CHTWO_HIGH)}"
                        >{{item.LOGS_CHTWO}}<span class="machin-ty">{{item.CHTWO_TYPE}}</span></p>
                        <p class="right-content" :class="scope(item.LOGGER_CHNUM)">{{item.CHTWO_LOW}}-{{item.CHTWO_HIGH}}</p>
                    </li>
                    <li class="device-content"  v-if="item.LOGGER_CHNUM>=3">
                        <p class="left-content"
                            :class="device(item.LOGGER_CHNUM)"
                            :style="{color:Color(item.LOGS_CHTHREE,item.CHTHR_LOW,item.CHTHR_HIGH)}"
                        >{{item.LOGS_CHTHREE}}<span class="machin-ty">{{item.CHTHR_TYPE}}</span></p>
                        <p class="right-content" :class="scope(item.LOGGER_CHNUM)">{{item.CHTHR_LOW}}-{{item.CHTHR_HIGH}}</p>
                    </li>
                    <li class="device-content" v-if="item.LOGGER_CHNUM>=4">
                        <p class="left-content"
                            :class="device(item.LOGGER_CHNUM)" 
                            :style="{color:Color(item.LOGS_CHFOUR,item.CHFOU_LOW,item.CHFOU_HIGH)}"
                        >{{item.LOGS_CHFOUR}}<span class="machin-ty">{{item.CHFOU_TYPE}}</span></p>
                        <p class="right-content" :class="scope(item.LOGGER_CHNUM)">{{item.CHFOU_LOW}}-{{item.CHFOU_HIGH}}</p>
                    </li>
                </ul>
                <div class="time_buttery">
                    <span class="base-buttery" :class="butterytype(item.BAT_DC_STATE)"></span>
                    <span class="base-plug" :class="plugtype(item.BAT_DC_STATE)"></span>
                    <span class="up-time float_right">{{(item.LOGS_TIME).substr(5,11)}}</span>
                </div>
            </div>    
        </div>
        <div class="nodat" v-if="have">
            <img src="../../assets/images/none.png" class="im">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { GRAPH } from '../../axios/axios'
export default {
    data(){
        return {
            devicelist:[],                  //数据集合
            font:0.18,                         //字体大小
            buttery:'buttery1',             
            plug:'plug0',
            lisheight:0,
            value:this.$store.state.all.searchText,               //搜索内容
            have:false,                     //无数据时
            alarmgive:this.$store.state.all.meumIndex,        //菜单栏切换
            basestion:this.$store.state.all.baseStation,      //基站
        }
    },
    computed:{
        nowdata:function(){
            return this.$store.state.all.meumIndex
        },
        baseStation:function(){
            return this.$store.state.all.baseStation           //基站获取
        },
        //搜索内容获取
        sechText:function(){
            return this.$store.state.all.searchText     
        }
    },
    watch:{
        nowdata(newVal,oldVal){
            this.alarmgive = newVal;
            this.Getpicdata();
            console.log(newVal,oldVal)
        },
        baseStation(newVal,oldVal){
            this.basestion = newVal;
            this.Getpicdata();
        },
        sechText(newVal,oldVal){
            this.value = newVal;
            this.Getpicdata();
        }
    },
    mounted(){
        this.Getpicdata();
        this.ListHeight();
    },
    methods:{
        //高度计算
        ListHeight(){
            var windowwidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var headheight = 100*(windowwidth/750)*1.6
            var mintheight = document.getElementsByClassName('mint-tabbar')[0].clientHeight;
            this.lisheight = windowHeight-(100*(windowwidth/750)*1.02)-headheight-mintheight;
        },
        //获取数据
        Getpicdata(){
            //提交显示类型展示状态
            this.$store.commit('setsearchState',this.value);
            var port = sessionStorage.getItem('port')
            var userName = sessionStorage.getItem('name')
            var DomainAddress = sessionStorage.getItem('address')
            var URL= axios.create({
               baseURL:'http://'+DomainAddress
            })
            let params = {
                userName:userName,
                Identitys:port,
                loggerName:this.value,
                giveAnAlarm:this.alarmgive,
                groupId:this.basestion,
            }
            console.log(params)
            URL.get(GRAPH(params)).then(res =>{
                console.log(res)
                this.devicelist = res.data.Data
                if(res.data.State==200){
                    this.have=false
                }else{
                    this.have=true
                }
            })
            
        },
        // 判断通道
        device(i){
            switch(i){
                case 1:return"device1";break;
                case 2:return"device2";break;
                case 3:return"device3";break;
                case 4:return"device4";break;
                default:'';
            }
        },
        // 超标时字体颜色
        Color(x,y,z){
            if(Number(x)<Number(y)||Number(x)>Number(z)){
                return "#E65959"
            }else{
                return "#008CE5"
            }
        },
        // 各范围字体大小
        scope(n){
            switch(n){
                case 1:return"scope3";break;
                case 2:return"scope2";break;
                case 3:return"scope1";break;
                case 4:return"scope0";break;
                default:'';
            }
        },
        // 电池状态显示
        butterytype(x){
            switch(x){
                case 0 :return'style="display:none"';break;
                case 1:return 'buttery4' ;break;  
                case 2 :return "buttery4" ;break;
                case 3 :return "buttery1";break;
                case 4 :return"buttery1";break;   //电池0格电
                case 5 :return"buttery2";break;   //电池1格电
                case 6 :return"buttery3";break;   //电池2格电
                case 7 :return"buttery4";break;   //电池3格电
                case 8 :return"buttery1";break;
                case 9 :return"buttery2";break;
                case 10 :return"buttery3";break;
                case 11 :return"buttery4";break;
                case 17 :return"buttery4";break;
                default:'';
            }
        },
        // 插头状态显示
        plugtype(y){
            switch(y){
                case 0 :return 'style="display:none"' ;break;
                case 1 :return "plug0" ;break;  //灰色插头
                case 2 :return "plug1" ;break;  //绿色差头
                case 3 :return "plug1" ;break;
                case 4 :return "plug0" ;break;
                case 5 :return "plug0" ;break;
                case 6 :return "plug0" ;break;
                case 7 :return "plug0" ;break;
                case 8 :return "plug0" ;break;
                case 9 :return "plug1" ;break;
                case 10 :return "plug1" ;break;
                case 11 :return "plug1" ;break;
                case 17 :return "plug0" ;break;
                default:'';
            }
        },
        //跳转至详情页
        open(mac,macname){
            console.log(mac,macname)
            this.$router.replace({
                name:'/detail',
                params:{
                    inst:mac,
                    mach:macname,
                }
            })

        },
    }
}
</script>

<style>
.left-content{
    display: inline-block;
    vertical-align: top
}
.right-content{
    float: right;
}
.list-content{
    overflow: scroll;
}
.list-content:after{
    content: '';
    display: block;
    clear: both;
}
.machin-ty{
    font-size: 0.18rem;
}
.device-content{
    padding: 0 0.25rem;
    border-bottom: 0.02rem solid #F2F2F2;
    box-sizing: border-box;
}
.time_buttery{
    height: 0.64rem;
    line-height: 0.64rem;
    padding: 0 0.25rem;
    border-top: 0.02rem solid #F2F2F2;
}
.device{
    width: 3.43rem;
    height: 2.8rem;
    margin-bottom: 0.2rem;
    margin-left: 0.2rem;
    background: #FFFFFF;
    border: 1px solid #D7D7D7;
    float: left;
    box-shadow:0px 2px 8px 0px rgba(0,140,229,0.15);
}
.device-scope{
    display: inline-block;
    position: absolute;
    top: 0rem;
    color: #666666;
    right: 0.24rem;
}
.device1{
    height: 1.55rem;
    line-height: 1.55rem;
    font-size: 0.6rem;
}
.device2{
    font-size: 0.38rem;
    height: 0.77rem;
    line-height: 0.77rem;
}
.device3{
    height: 0.51rem;
    line-height: 0.51rem;
    font-size: 0.3rem;
}
.device4{
    line-height: 0.38rem;
    height: 0.38rem;
    font-size: 0.26rem;
}
.devicename{
    width:100% ;
    height: 0.6rem;
    display: block;
    line-height: 0.6rem;
    background: #f7f9fb;
    text-align: center;
    font-size: 0.26rem;
    color: #008CE5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}
.base-buttery{
    display: inline-block;
    width: 0.41rem;
    height: 0.24rem;
    background-size: 100% 100%;
}
.buttery1{
    background-image: url('../../assets/images/battery1.png');
}
.buttery2{
    background-image: url('../../assets/images/battery2.png');
}
.buttery3{
    background-image: url('../../assets/images/battery3.png');
}
.buttery4{
    background-image: url('../../assets/images/battery4.png');
}
.base-plug{
    display: inline-block;
    width: 0.41rem;
    height: 0.24rem;
    background-size: 100% 100%;
    margin-left: 0.24rem;
}
.plug0{
    background-image: url('../../assets/images/chatou.png');
}
.plug1{
    background-image: url('../../assets/images/chatou1.png');
}
.up-time{
    font-size: 0.22rem;
    color: #b2b2b2;
}
.scope0{
    line-height: 0.38rem;
    height: 0.38rem;
    font-size: 0.2rem;
}
.scope1{
    height: 0.51rem;
    line-height: 0.51rem;
    font-size: 0.24rem;
}
.scope2{
    height: 0.77rem;
    line-height: 0.77rem;
    font-size: 0.32rem;
}
.scope3{
    font-size: 0.38rem;
    height: 1.55rem;
    line-height: 1.55rem;
}
.nodat{
    position: absolute;
    top: 2rem;
    left: 50%;
    margin-left: -99px;
}
</style>
